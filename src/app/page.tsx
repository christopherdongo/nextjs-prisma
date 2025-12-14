import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const recentJobs = await prisma.job.findMany({
    take: 3,
    orderBy: {
      postedAt: "desc"
    },
    include: {
      postedBy: {
        select: {
          name: true
        }
      }
    }
  })

  return (
    <div
    className="
    space-y-12"
    >
      <section
      className="text-center py-20 bg-white rounded-lg shadow-sm"
      >
        <h1
        className="text-4xl font-bold text-gray-900 mb-4"
        >Find Your DreamJob</h1>

        <p
        className="text-xl text-gray-600 mb-8"
        >
          Discover thousands of job opportunities with top companies
        </p>

        <Link
        href="/jobs"
        className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700"
        >
         Browse Jobs
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Jobs</h2>

        <div>
          
        </div>
      </section>
    </div>
  );
}
