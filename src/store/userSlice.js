import { createSlice } from "@reduxjs/toolkit"

// const initialState = [];
// let name,password;
// reducers are pure fn
const userSlice = createSlice({
    name:'login',
    initialState:{
        admin:false,
        status:false,
        name:''
    },
    reducers:{
        // add(state,action){
        //     console.log("action.payload",action.payload);
        //     // old redux
        //     // return [...state,action.payload]
        //     state.name = action.payload.name
        //     state.password = action.payload.password
        // },
       
        login(state,action){
            console.log("set login lofginslice");
            state.name = action.payload.name;
            if(action.payload.name==='admin' && action.payload.password==='admin')
            {
                state.status = true;
                state.admin = true;
            }
            else
            state.status = true;
        },
        logout(state){
            console.log("logout in loginslice");
            state.status = false;
            state.admin = false;
        }

        // remove(state,action){
        //     return state.filter(item=>item.title!==action.payload)
        // }
    }
})

export const{login,logout} = userSlice.actions;
export default userSlice.reducer; 