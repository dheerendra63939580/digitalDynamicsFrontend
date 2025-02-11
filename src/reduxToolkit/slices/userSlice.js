import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        name: "",
        email: "",
        mobile: "",
        id: ""
    },
    reducers: {
        setProfile: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.mobile = action.payload.mobile;
            state.id = action.payload._id;
        },
        logout: (state) => {
            state.name = "";
            state.email = ""
            state.mobile = ""
            state.id = ""
            localStorage.removeItem("token")
        }
    }
})
const auth = (state) => state.authSlice;
export const { setProfile, logout } = authSlice.actions;
export default authSlice.reducer;