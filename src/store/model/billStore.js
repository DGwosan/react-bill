import axios from "axios";
import { data } from "react-router-dom";

const { createSlice } = require("@reduxjs/toolkit");

const billStore = createSlice({
    name:'billS',
    initialState:{
      billList:[]
    },
    reducers:{
       setBillList(state,action){
          state.billList = action.payload
       },

       //添加账单
       addBill(state, action) {
          state.billList.push(action.payload)
       }
    }
})

const {setBillList,addBill} =  billStore.actions
const billreducer = billStore.reducer

const fetchBill = ()=>{
  return async (dispatch)=>{
     const response = await axios.get("http://localhost:8888/ka")
     dispatch(setBillList(response.data))
  }
}

const addBillList = (data) => {
   return async (dispatch) => {
      const res = await axios.post('http://localhost:8888/ka', data)
      dispatch(addBill(res.data))
   }
}




export {fetchBill,addBillList}
export default billreducer






