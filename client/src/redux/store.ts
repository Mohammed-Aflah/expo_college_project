import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import allUsers from './slices/allUsers'
import expos from './slices/expos'



const store=configureStore({
    reducer:{
        user:userReducer,
        allUsers:allUsers,
        expos:expos
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch