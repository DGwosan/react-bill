import { configureStore } from "@reduxjs/toolkit";
import billreducer from "./model/billStore";


const store = configureStore({
    reducer:{
        bills:billreducer
    }
})


export default store;

