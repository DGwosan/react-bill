import axios from "axios";

const { createSlice } = require("@reduxjs/toolkit");

const billStore = createSlice({
    name:'billS',
    initialState:{
      billList:[]
    },
    reducers:{
       setBillList(state,action){
          state.billList = action.payload
       }
    }
})

const {setBillList} =  billStore.actions
const billreducer = billStore.reducer

const fetchBill = ()=>{
  return async (dispatch)=>{
     const response = await axios.get("http://localhost:8888/ka")
     dispatch(setBillList(response.data))
  }
}



export {fetchBill}
export default billreducer






