"use client"
import { signIn, signOut } from "next-auth/react"

export const login = async () => {
  console.log('log login')
  await signIn("github", { redirectTo: "/" }); // ✅ usa redirectTo, no callbackUrl
};

export const logout = async () => {
  await signOut({ redirectTo: "/auth/signin" }); // ✅ redirectTo
};