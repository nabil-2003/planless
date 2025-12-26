import { fetchStatistics } from '@/store/DashBoardSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { use } from 'react'
import { useDispatch } from 'react-redux';

export default function useDashBoard() {
       const selector = useAppSelector((state) => state.dashboard);
        const dispatch = useAppDispatch();
 const  fetchStats = async (days : number = 20) => {
      try {
         dispatch(fetchStatistics(days));
      }
      catch(error : any) {
        console.log(error)
      }
  }
  return {
    fetchStats ,
    statistics : selector.statistics,
    charts : selector.charts,
    loading : selector.loading ,
    error : selector.error
  }
}
