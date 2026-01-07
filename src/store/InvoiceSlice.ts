import { API_BASE, getToken } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    invoice : null as any,
    loading : false,
    error : null as string | null,
}

const getInvoice = createAsyncThunk('invoice/createInvoice' , 
    async (id : any , {rejectWithValue , } ) => {
                   
        try{
        // API call to fetch lessons by ID
        console.log( "invoiceid", id)
        if (getToken() == null )
            return rejectWithValue("logged first");
        const pdf = await axios.get(API_BASE+`/invoice/order/${id}` ,{
            headers : {
                Authorization : `Bearer ${getToken()}`
            },
             responseType: "blob"
           
        } )
          
       const blob = pdf.data;
      const url = URL.createObjectURL(blob);
      return url;
    }
    catch(error:any){
        console.log(error)
        return rejectWithValue(error.message);
    }



})


const invoiceSlice   = createSlice({
    name : "invoice",
    initialState : initialState ,
    reducers : {
        setLoading(state, action){
            state.loading = action.payload;
        },
         reset(state){
            state.invoice = null;
            state.loading = false;
            state.error = null;
        },
        setError(state, action){
            state.error = action.payload ?? null;
            state.loading = false;
        },
   }, extraReducers : (builder) => {
    builder.addCase(getInvoice.pending , (state) => {
        state.loading = true;
        state.error = null;
    })
    builder.addCase(getInvoice.fulfilled , (state , action) => {
        state.loading = false;
        state.invoice = action.payload;
    })
    builder.addCase(getInvoice.rejected , (state , action) => {
        state.loading = false;
        state.error = action.payload as string;
    })
   }})
   

   export default invoiceSlice.reducer;
   export  const {setError , setLoading ,reset}  = invoiceSlice.actions;
   export {getInvoice};