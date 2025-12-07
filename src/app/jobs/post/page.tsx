"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from 'react-toastify';
import Imput from '../../../component/Form/Input'
import Select from '../../../component/Form/Select'
import Area from '../../../component/Form/Area'

type Inputs = {
  title: string;
  company: string;
  type: string;
  description: string;
  salary: string;
  location: string;
};

export default function PostJobsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Inputs>({
  defaultValues: {
    title: "",
    company: "",
    type: "",
    description: "",
    salary: "",
    location: ""
  }
});

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {

      await fetch("/api/jobs",{
        method: 'POST',
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(data),
      })
      reset()
      toast.success("jobs add")
      setTimeout(() => {
  window.location.href = "/jobs";
}, 500);

    }catch(err) {
      console.error(err)
    }
  };


  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a Job</h1>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

        {/* --- Job Title --- */}
        <Imput 
        label="Job Title"
        placeholder="title"
        type="text"
        title="title"
        register={register}
        errors={errors}
        />

                {/* --- Company --- */}
        <Imput 
        label="Company"
        placeholder="company"
        type="text"
        title="company"
        register={register}
        errors={errors}
        />

        {/* --- location --- */}
        <Imput 
        label="Location"
        placeholder="location"
        type="text"
        title="location"
        register={register}
        errors={errors}
        />

        {/* --- Job Type --- */}
        <Select 
        title="type"
        type="type"
        label="Job Type"
        register={register}
        errors={errors}

        />

        {/* description */}
        <Area 
        title="description"
        label="Description"
        errors={errors}
        register={register}
        placeholder="description"
        rows={3}
        />

        {/* salary */}
        <Imput 
        label="Salary"
        placeholder="salary"
        type="text"
        title="salary"
        register={register}
        errors={errors}
        />

        {/* --- Submit Button --- */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
