import {FieldErrors, FieldValues, Path, UseFormRegister} from "react-hook-form";

type PropsInput<T extends FieldValues> = {
  label: string;
  title: Path<T>;
  type: string;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
};

export default function Select<T extends FieldValues>({
  label,
  title,
  type,
  errors,
  register,
}: PropsInput<T>) {
  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id={type}
        {...register(title, {required: `Job ${title} is required`})}
        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-50"
      >
        <option value="">Select a type</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
        <option value="Internship">Internship</option>
      </select>
      {errors[type] && (
        <p className="text-sm text-red-500 mt-0">
          {errors[type]?.message?.toString()}
        </p>
      )}
    </div>
  );
}
