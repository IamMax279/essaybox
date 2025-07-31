import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface subscribed {
    isSubscribed: boolean
}

const initialSubscribed: subscribed = {
    isSubscribed: false
}

const subscribedSlice = createSlice({
    name: "subscribedSlice",
    initialState: initialSubscribed,
    reducers: {
        setIsSubscribed(state, action: PayloadAction<boolean>) {
            state.isSubscribed = action.payload
        }
    }
})

export const { setIsSubscribed } = subscribedSlice.actions
export const subscribedReducer = subscribedSlice.reducer

// useDispatch(setIsSubscribed(payload)) -> creates an action
// that action is then received by store
// store then calls the appropriate case reducer with the given payload
// the state is updated