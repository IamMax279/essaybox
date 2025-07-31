import { configureStore } from "@reduxjs/toolkit"
import { subscribedReducer } from "./Slices"

export const store = configureStore({
    reducer: {
        subscribedReducer
    }
})

//typeof store.getState would yield () => "type"; ReturnType<...> will yield "type"
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch