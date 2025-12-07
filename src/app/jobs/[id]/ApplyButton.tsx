"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ApplyButton({jobId}: {jobId: string}) {

    const [errorMessage, setErrorMessage] = useState<string>("")
    const [applicationStatus, setApplicationStatus] = useState<"idle" | "success" | "error">("idle")

    const {data: session, status} = useSession()

    const router = useRouter()

    const handleApply = async () => {

        console.log('apply button')

        if(!session) {
            router.push("/auth/sign")
            return
        }

        setErrorMessage("")

        try {

            const response = await fetch(`/api/jobs/${jobId}/apply`, {
                method: "POST"
            })

            setApplicationStatus("success")

            if(response) {

                console.log('response', response)

            }



        }catch(err){
            if(err instanceof Error) {
             setErrorMessage(err.message)
            } else {
                setErrorMessage("Failed to apply for the job")
            }

            setApplicationStatus("error")
          
        }

    }


    if(status === "loading") {
        return <button disabled>
      Loading...
    </button>
    }

    if(applicationStatus === "success") {
        return <div>{""}
        <p>Application submitted successfull</p>
        <Link
        href={"/dashboard"}
        >
            View your applications
        </Link>
        </div>
    }

    return (
        <>
        <button
        onClick={handleApply}
        className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 font-medium disabled:opacity-50 cursor-pointer"
        >
            Apply for this position
        </button>

        {
            applicationStatus === "error" && (
                <p className="mt-2 text-red-600 text-center">{errorMessage}</p>
            )
        }
        </>
    )

}