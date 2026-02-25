import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory cache to avoid repeated requests
const cache = new Map<string, { lat: number; lng: number; timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json(
        { error: 'Address parameter is required' },
        { status: 400 }
      );
    }

    // Check cache first
    const cached = cache.get(address);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('Returning cached result for:', address);
      return NextResponse.json({
        lat: cached.lat,
        lng: cached.lng,
        cached: true
      });
    }

    // Clean and try multiple address format variations
    const cleanAddress = (addr: string) => {
      // Remove trailing letters from house numbers (e.g., "79h" -> "79")
      return addr.replace(/(\d+)[a-zA-Z]+\b/g, '$1');
    };
    
    const addressVariations = [
      cleanAddress(address),
      cleanAddress(address).replace(/,\s*/g, ' '),
      cleanAddress(address).split(',').map(s => s.trim()).filter(Boolean).join(', '),
      // Try with just street and postal code
      cleanAddress(address).split(',').slice(0, 3).join(', '),
      // Try postal code + city
      cleanAddress(address).split(',').slice(1, 3).join(', '),
    ];

    for (const addressQuery of addressVariations) {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        addressQuery
      )}&format=json&limit=1&countrycodes=nl`;

      console.log('Geocoding with Nominatim:', addressQuery);

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'PlanlessAdminDashboard/1.0',
        },
      });

      if (!response.ok) {
        console.error('Nominatim API error:', response.status);
        continue;
      }

      const data = await response.json();

      if (data && data.length > 0) {
        const result = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };

        // Cache the result
        cache.set(address, { ...result, timestamp: Date.now() });

        console.log('✓ Geocoding success:', result);
        return NextResponse.json(result);
      }
    }

    // No results found
    return NextResponse.json(
      { error: 'Location not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Geocoding error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
