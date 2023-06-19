import {createSlice} from "@reduxjs/toolkit"

const UserAuth = createSlice({
    name:"user",
    initialState:{
        userToken:null,
        userName:null
    },
    reducers:{
        userAddDetails(state,actions){
            // console.log('auth.....',actions.payload);
            const newItem = actions.payload;
            state.userName =newItem.name
            state.userToken = newItem.token 
        },
        userLogout(state,actions){
          
            state.userName=""
            state.userToken=""
        }
    }
})

export const UserActions = UserAuth.actions
export default UserAuth