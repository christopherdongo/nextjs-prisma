import {prisma} from "@/lib/prisma";
import JobsList from "../../component/Jobs/JobsList";

type postedByPage = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string;
};

export type PageJobs = {
  title: string;
  type: string;
  description: string;
  location: string;
  salary?: string | null;
  company: string;
  postedById: string;
  postedBy?: postedByPage;
  id: string;
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const {q, type, location} = await searchParams;

  const query = q as string | undefined
  const searchType = type as string | undefined
  const locationSearch = location as string  | undefined

  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        query
          ? {
              OR: [
                {title: {contains: query, mode: "insensitive"}},
                {company: {contains:query, mode: "insensitive"}},
                {description: {contains: query, mode: "insensitive"}},
              ],
            }
          : {},
        searchType ? {type: searchType} : {},
        locationSearch ? {location: {contains: locationSearch, mode: "insensitive"}} : {},
      ],
    },
    orderBy: {
      postedAt: "desc",
    },
    include: {
      postedBy: true,
    },
  });

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Find Jobs</h1>
        <form className="grid gap-4 md:grid-cols-3" action="/jobs" method="get">
          <input
            type="text"
            placeholder="Search jobs..."
            name="p"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />

          <select
            name="type"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />

          <button
            type="submit"
            className="md:col-span-3 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Search
          </button>
        </form>

        <div className="grid gap-6 pt-10">

          {jobs.length > 0 &&
            jobs.map((job: PageJobs) => {
              return (
                <JobsList
                  key={job.id}
                  title={job.title}
                  type={job.type}
                  description={job.description}
                  location={job.location}
                  salary={job.salary}
                  company={job.company}
                  postedBy={job.postedBy}
                  postedById={job.postedById}
                  id={job.id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
