import React, { useRef, useState } from 'react'
import CusTomDate from './CustomDateModal'

type CustomDateRef = {
  firstDateMs?: number;
  lastDateMs?: number; 
  singleDate?: number;
  open: () => void;
  close: () => void;
  getSelectedRange: () => { firstDateMs: number; lastDateMs: number } | null;
  clearSelection: () => void;
  setDateRange: (startDate: string, endDate: string) => void;
}

export default function CustomCalendar() {
  const dateModalRef = useRef<CustomDateRef>(null);
  const [selectedRange, setSelectedRange] = useState<{ firstDateMs: number; lastDateMs: number } | null>(null);

  const openCalendar = () => {
    dateModalRef.current?.open();
  };

  const handleDateSelect = (dates: { firstDateMs: number; lastDateMs: number } | null) => {
    setSelectedRange(dates);
  };

  const clearSelection = () => {
    dateModalRef.current?.clearSelection();
    setSelectedRange(null);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4 px-2 md:px-0">
      <h2 className="text-base md:text-lg font-bold mb-3 md:mb-4">Custom Calendar</h2>
      
      {/* Calendar Trigger Button */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
        <button
          onClick={openCalendar}
          className="w-full md:w-auto px-4 py-2.5 md:py-2 bg-[var(--logo-blue)] text-white rounded-lg hover:bg-[var(--dark-blue)] transition-all text-sm md:text-base"
        >
          Select Date Range
        </button>
        
        {selectedRange && (
          <button
            onClick={clearSelection}
            className="w-full md:w-auto px-3 py-2.5 md:py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
          >
            Clear Selection
          </button>
        )}
      </div>

      {/* Selected Range Display */}
      {selectedRange && (
        <div className="p-4 bg-gray-50 rounded-lg border">
          <h3 className="font-semibold text-gray-800 mb-2">Selected Date Range:</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-medium">From:</span> {formatDate(selectedRange.firstDateMs)}</p>
            <p><span className="font-medium">To:</span> {formatDate(selectedRange.lastDateMs)}</p>
            <p className="text-xs mt-2">
              <span className="font-medium">Milliseconds:</span> {selectedRange.firstDateMs} - {selectedRange.lastDateMs}
            </p>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      <CusTomDate 
        ref={dateModalRef}
        singleUse={false}
        onDateSelect={handleDateSelect}
        className=''
      />
    </div>
  )
}
