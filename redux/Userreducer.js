import { createSlice } from '@reduxjs/toolkit';

export const UserSlice=createSlice({
    name:"user",
    initialState:{
        id:null,
        email: '',
        name :'koti galam'
    },
    reducers:{
        addUser:(state,action)=>{
            state.id=action.payload.chefId;
            state.email=action.payload.chefEmail;
        },
        removeUser:(state)=>{
            state.id=null;
            state.email='';
            console.log('user made null');
        }
    }
});

export const {addUser,removeUser}=UserSlice.actions;

export default UserSlice.reducer;