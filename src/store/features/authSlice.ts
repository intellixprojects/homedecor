import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
  phone: string,
  dob: string,
}

interface AuthState {
  currentUser: User | null;
  users: User[];
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  currentUser:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("currentUser") || "null")
      : null,

  users:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("users") || "[]")
      : [],

  isLoggedIn:
    typeof window !== "undefined"
      ? !!localStorage.getItem("currentUser")
      : false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    signup: (state, action: PayloadAction<User>) => {
      const existingUser = state.users.find(
        (user) => user.email === action.payload.email
      );

      if (!existingUser) {
        state.users.push(action.payload);

        state.currentUser = action.payload;

        state.isLoggedIn = true;

        if (typeof window !== "undefined") {
          localStorage.setItem(
            "users",
            JSON.stringify(state.users)
          );

          localStorage.setItem(
            "currentUser",
            JSON.stringify(action.payload)
          );
        }
      }
    },

    login: (
      state,
      action: PayloadAction<{
        email: string;
        password: string;
      }>
    ) => {
      const user = state.users.find(
        (u) =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );

      if (user) {
        state.currentUser = user;

        state.isLoggedIn = true;

        if (typeof window !== "undefined") {
          localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
          );
        }
      }
    },

    logout: (state) => {
      state.currentUser = null;

      state.isLoggedIn = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("currentUser");
      }
    },
  },
});

export const {
  signup,
  login,
  logout,
} = authSlice.actions;

export default authSlice.reducer;