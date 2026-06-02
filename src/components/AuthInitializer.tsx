"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { login } from "@/store/features/authSlice";

export default function AuthInitializer() {
    const dispatch = useDispatch();

    useEffect(() => {
        const user = localStorage.getItem("currentUser");

        if (user) {
            dispatch(login(JSON.parse(user)));
        }
    }, [dispatch]);

    return null;
    
}