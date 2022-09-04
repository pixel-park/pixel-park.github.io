import { configureStore } from "@reduxjs/toolkit";
import modeReducer from './modeSlice.js'; //modeSlice.reducer

export default configureStore({
    reducer : {
        toggle : modeReducer
    }
})