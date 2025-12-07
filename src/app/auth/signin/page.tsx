"use client"
import { login } from "@/lib/auth";
import Image from "next/image";

export default function SingInPage () {

    return (
        <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center">
            <div className="max-w-md w-full space-y-0-8 bg-white p-8 rounded-xl shadow-lg mx-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to the JobBoard</h2>
                    <p className="text-gray-600">Sign in to post or apply for opportunities</p>
                </div>

                <div className="mt-8">
                    <button className="w-full cursor-pointer flex justify-center items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white"
                    onClick={login}
                    >
                        <Image src="/github.svg"  alt="image_github" width={20} height={20} loading="lazy"
                        className="w-6 h-6"
                        aria-hidden={true}
                        />
                        <span className="text-base font-medium">Continue with Github</span>
                    </button>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    By signing in, you agree to our {""}
                    <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms of Service </a>{""}
                     and
                     <a href="#" className="text-indigo-600 hover:text-indigo-500"> Privacy Policy</a>
                </div>
            </div>
        </div>
    )
}