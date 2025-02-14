import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        name: "",
        email: "",
        mobile: "",
        id: "",
        loading: false,
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
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
})
export const accessProfile = (state) => state.authReducer;
export const { setProfile, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;