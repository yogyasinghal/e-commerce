import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import data from "../Data/data";
import data from '../Data/data2';


// import axios from 'axios';
// export const fetchUser = createAsyncThunk('/store/fetchUser', async () => {
//     try {
//         const res = await axios.get('http://localhost:3001/data');
//         console.log("data from axios",res);
//         return res.data;
//     }
//     catch(err) {
//         console.log(err);
//     }
// })
console.log("data=",data);
// let loading = true;
// let data2 = []
const dataSlice = createSlice({
    name:'data',
    // initialState:{
    //     data,
    //     data2,
    //     loading
    // },
    initialState:{
        data,
        total:0
    },
    reducers:{
        addMovie(state,action){
            
            state.data.push(action.payload);
            
            // state.data2.push(action.payload);
        },
        removeMovie(state,action){
            console.log("remove movie");
            // state.data2 = state.data2.filter(item=>item.title!==action.payload.title)
            let temp2 = state.data.findIndex(item=>item.id===action.payload.id);
            state.total -= state.data[temp2].qty; 
            state.data = state.data.filter(item=>item.id!==action.payload.id)
        },
        setMovie(state,action){
            // state.data2 = action.payload
            state.data = action.payload
        },
        addUser: (state, action) => {
            // state.data2.push(action.payload)
            state.data.push(action.payload)
        },
        
        addQty(state,action){
            console.log("addqty payload",action.payload);
           
            console.log("statae.data",state);
            // return [...state.data,'qty':'10']
            console.log(state.data);
            let temp2 = state.data.findIndex(item=>item.id===action.payload.id);
            console.log("temp2",temp2);
            state.data[temp2].qty += 1; 
            state.total += 1 


            // let temp = state.data.filter(item=>item.id===action.payload.id);
            // state.data = state.data.filter(item=>item.id!==action.payload.id);
           
            // temp[0].qty += 1;
            // state.data.push(temp[0]);
           
            // console.log("temp qty=",temp.qty);
            
        },
        deleteQty(state,action){
            let temp2 = state.data.findIndex(item=>item.id===action.payload.id);
            if(temp2===-1)
            {
                state.data[temp2].qty = 0 ; 
            }
            // console.log("temp2",temp2);
            

            if(state.data[temp2].qty > 1){
                state.total -= 1 ;
                state.data[temp2].qty -= 1; 
            }
            else{
                state.data[temp2].qty = 0 ; 
                state.total -= 1 ;
            }
               
        }
    },
    // extraReducers: {
    //     [fetchUser.pending]: (state, action) => {
    //         console.log("pending promise");
    //         state.loading = true;
    //     },
    //     [fetchUser.rejected]: (state, action) => {
    //         console.log("rejected promise");
    //         state.loading = false;
    //     },
    //     [fetchUser.fulfilled]: (state, action) => {
    //         console.log("user fetch success");
    //         state.loading = false;
    //         state.data2 = [...state.data2, ...action.payload];
    //     }
    // }
})

export const{addMovie,removeMovie,setMovie,addUser,addQty,deleteQty} = dataSlice.actions;
export default dataSlice.reducer; 