import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define user type (Update fields as per your user structure)
interface User {
    isLogin: boolean
}
;

// Initial state
const initialState: User = {
    isLogin: false
};

// Create user slice
const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLogin: (state) => {
            state.isLogin = true;
        },
        setLogout: (state) => {
            state.isLogin = false;
        },
    },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
