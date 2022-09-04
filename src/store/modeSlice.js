import { createSlice } from '@reduxjs/toolkit';

const modeSlice = createSlice({
    name: 'mode',
    initialState : {mode: false},
    reducers : {
        togleMethod(state, action){
            state.mode = true        
            console.log(state)
            console.log(action)
        }
    }
});

export const {togleMethod} = modeSlice.actions;

export default modeSlice.reducer; //we can name it as we want in the import because we import it as a default