import { createSlice } from "@reduxjs/toolkit"
// import data from "../Data/data";
// console.log("data=",data);
const initialState = [];
// reducers are pure fn
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        add(state,action){
            // old redux
            // return [...state,action.payload]
            // console.log(state);
            // console.log("action payload",action.payload);

            // state.push(action.payload);
            let temp2 = state.findIndex(item=>item.id===action.payload.id);
            console.log("temp2",temp2);
            if(temp2===-1){
                // action.payload.qty=1;
                // console.log("action",action.payload);
                // console.log("action qty",action.payload.qty);
                state.push(action.payload);
                // state.push(action.payload);
                // let temp = state.findIndex(item=>item.id===action.payload.id);
                // state[temp].qty = 1; 
            }
            
            else
            state[temp2].qty += 1; 
            
        },
        remove(state,action){
            return state.filter(item=>item.id!==action.payload.id)
        },
        emptyCart(state){
            console.log("state from empty",state);
            state = [];
            console.log("state after empty",state);
            return state
        }
    }
})

export const{add,remove,emptyCart} = cartSlice.actions;
export default cartSlice.reducer; 