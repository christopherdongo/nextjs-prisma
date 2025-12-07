import Link from "next/link";

type postedByProps = {
 id: string;
 name: string | null;
 email: string | null;
 emailVerified: Date | null;
 image: string | null
}

export type PropsJobs = {
    title: string;
    type?: string | null;
    description: string;
    location: string;
    salary?: string | null;
    company: string;
    postedBy?: postedByProps;
    postedById?:string 
    id: string
}


export default function JobsList ({title, type, description, location, salary, company, postedBy, id} : PropsJobs) {
console.log('type', type)
    return (
        <div
        className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
        <div
        className="flex justify-between items-start"
        >
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {title}
                </h2>
                <p className="text-gray-600">{company}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="mr-4">{location}</span>
                    <span>{type}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

            </div>
            {
                salary && (
                    <span className="text-lg font-semibold text-gray-900">
                        {salary}
                    </span>
                )
            }

        </div>

        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Posted by { postedBy && postedBy?.name}
            </span>
            <Link
            href={`/jobs/${id}`}
            >
            View Details
            </Link>
        </div>

        </div>
    )
}