import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import allUsers from './slices/allUsers'
import chatSlice from './slices/chatSlice'



const store=configureStore({
    reducer:{
        user:userReducer,
        allUsers:allUsers,
        chat:chatSlice
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch