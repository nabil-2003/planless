declare module 'leaflet' {
  export type LatLngExpression = [number, number] | [number, number, number]

  export interface MapOptions {
    center?: LatLngExpression
    zoom?: number
    scrollWheelZoom?: boolean | string
  }

  export interface IconOptions {
    iconUrl: string
    iconRetinaUrl?: string
    iconSize?: [number, number]
    iconAnchor?: [number, number]
    shadowUrl?: string
    shadowSize?: [number, number]
    shadowAnchor?: [number, number]
  }

  export interface MarkerOptions {
    icon?: unknown
  }

  export function icon(options: IconOptions): unknown

  export interface TileLayerOptions {
    attribution?: string
    url?: string
    [key: string]: unknown
  }

  export const Marker: {
    prototype: {
      options: MarkerOptions
    }
  }

  const L: {
    icon: typeof icon
    Marker: typeof Marker
  }

  export default L
}
