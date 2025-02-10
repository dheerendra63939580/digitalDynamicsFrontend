import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        name: "",
    },
    reducers: {
        setProfile: (state, action) => {
            state.name = action.payload.name;
        },
        logout: (state) => {
            state.name = "";
            localStorage.removeItem("token")
        }
    }
})
const auth = (state) => state.authSlice;
export const { setProfile, localStorage } = authSlice.actions;
export default authSlice.reducer;