'use client'

// ================================
// TIME FILTER COMPONENT
// ================================
// Provides time period filtering functionality for data views
// Features: Multiple time period options, statistics display

import React from 'react'
import UpIcon from '../svgs/UpIcon'

/**
 * TimeFilter Component Props
 */
interface TimeFilterProps {
    className?: string
    content?: boolean
    changeFilter: (filter: string) => void
    currentFilter: string
}

/**
 * TimeFilter Component
 * Allows users to select different time periods for data filtering
 */
export default function TimeFilter({ 
    className, 
    changeFilter, 
    content, 
    currentFilter = "20 dagen" 
}: TimeFilterProps) {
    
    /**
     * Handle filter change when user clicks on time period option
     */
    const handleCurrentFilter = (e: React.MouseEvent<HTMLLIElement>) => {
        const filter = e.currentTarget.getAttribute('data-filter')
        if (filter) {
            changeFilter(filter)
        }
    }

    return (
        <div className={`w-full md:w-[95%] h-max p-3 md:p-4 mx-auto flex flex-col md:flex-row flex-wrap gap-3 md:gap-4 justify-between bg-white rounded-lg border-2 border-gray-200 items-start ${className}`}>
            {/* Filter Options Section */}
            <div className='w-full md:w-auto'>
                {/* Section Title */}
                <h1 className='title-section md:ml-3 text-gray-700'>
                    Selecteer periode
                </h1>
                
                {/* Time Period Options */}
                <ul className='flex flex-wrap w-full md:w-max mt-3 md:mt-4 rounded-lg overflow-hidden md:mr-3 border border-gray-200'>
                    <li 
                        onClick={handleCurrentFilter} 
                        data-filter="12 maanden" 
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer border-[1.5px] border-gray-200 btn-text transition-colors ${
                            currentFilter === '12 maanden' ? 'bg-blue-900/10 text-[var(--dark-blue)] font-semibold' : ''
                        }`}
                    >
                        12 maanden
                    </li>
                    
                    <li 
                        onClick={handleCurrentFilter} 
                        data-filter="20 dagen" 
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer border-[1.5px] border-gray-200 btn-text transition-colors ${
                            currentFilter === '20 dagen' ? 'bg-blue-900/10 text-[var(--dark-blue)] font-semibold' : ''
                        }`}
                    >
                        20 dagen
                    </li>
                    
                    <li 
                        onClick={handleCurrentFilter} 
                        data-filter="7 dagen" 
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer border-[1.5px] border-gray-200 btn-text transition-colors ${
                            currentFilter === '7 dagen' ? 'bg-blue-900/10 text-[var(--dark-blue)] font-semibold' : ''
                        }`}
                    >
                        7 dagen
                    </li>
                    
                    <li 
                        onClick={handleCurrentFilter} 
                        data-filter="24 uur" 
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer border-[1.5px] border-gray-200 btn-text transition-colors ${
                            currentFilter === '24 uur' ? 'bg-blue-900/10 text-[var(--dark-blue)] font-semibold' : ''
                        }`}
                    >
                        24 uur
                    </li>
                </ul>
            </div>
            
            {/* Statistics Content Section */}
            {content && (
                <div className='content flex flex-wrap gap-3 w-full md:w-max items-center border-2 border-gray-200 p-4 md:p-6 rounded-lg'>
                    <div className='w-max'>
                        {/* Statistics Title */}
                        <h1 className='title-card mb-4 text-black'>
                            Rijlessen in behandeling
                        </h1>
                        
                        {/* Main Statistic Number */}
                        <span className='text-4xl font-extrabold text-gray-900 block mb-4'>
                            2,450
                        </span>
                        
                        {/* Percentage Change Indicator */}
                        <span className='btn-text flex items-center justify-center w-max'>
                            <UpIcon width={20} height={20} color="var(--dark-blue)" />
                            <span className='text-[var(--dark-blue)] font-semibold py-1 rounded-lg ml-1'>
                                40%
                            </span>
                            <span className='text-gray-600 ml-2'>
                                vs afgelopen jaar
                            </span>
                        </span>
                    </div>
                    
                    {/* Chart Image */}
                    <img 
                        className='mt-auto w-28 md:w-[10vw] h-auto object-contain' 
                        src={"/chart.png"} 
                        alt='Statistics Chart' 
                    />
                </div>
            )}
        </div>
    )
}
