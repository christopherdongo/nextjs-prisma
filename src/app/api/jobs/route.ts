import { NextResponse } from 'next/server'
import { auth } from '../../../../auth'
import { prisma } from '@/lib/prisma'

export const runtime = "nodejs";

export async function POST(request: Request) {
    const session = await auth()

    if(!session?.user || !session.user.id) {
        return NextResponse.redirect(new URL("/auth/singin", request.url))
    }

    try {

        const data = await request.json()

        const job = await prisma.job.create({data:{...data, postedById: session.user.id}})

        return NextResponse.json(job)

    }catch(err) {
   console.error("error create job:", err)
   return new NextResponse("internal server error", {status: 500})
    }

}


export async function GET(request: Request) {

    try {

        const {q, type, location} = await request.json()

       const jobs = await prisma.job.findMany({
        where: {
            AND: [
                q ? {
                    OR: [
                        {title: {contains: q, mode: "insensitive"}},
                        {company: {contains: q, mode: "insensitive"}},
                        {description: {contains: q, mode: "insensitive"}}
                    ]
                    
                } : {},
                type ? { type: type} : {},
                location ? { location: {contains : location, mode: "insensitive" }} : {},
            ]
        },
        orderBy: {
        postedAt:"desc",
       }, include:{
        postedBy: true
       }})

       return NextResponse.json(jobs)

    }catch(err) {
   console.error("error create job:", err)
   return new NextResponse("internal server error", {status: 500})
    }

}