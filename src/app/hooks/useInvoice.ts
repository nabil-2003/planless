import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getInvoice  , reset } from '@/store/InvoiceSlice';


export default function useInvoice() {
   const invoice = useAppSelector(state => state.invoice)
   const dispatch = useAppDispatch();
  const  getInvoiceById = async (id: string) => {
            await  dispatch(getInvoice(id)).unwrap();   
     }


  return (
    {
        invoice : invoice.invoice,
        loading : invoice.loading,
        error :     invoice.error,
        getInvoiceById, 
        resetInvoice : () => dispatch(reset())
    }
  )
}
