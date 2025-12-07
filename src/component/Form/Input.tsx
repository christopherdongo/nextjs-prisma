import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

type PropsInput<T extends FieldValues> = {
  label: string;
  title: Path<T>;
  placeholder: string;
  type: string;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
};

export default function Input<T extends FieldValues>({
  label,
  title,
  placeholder,
  type,
  errors,
  register,
}: PropsInput<T>) {
  return (
    <div>
      <label
        htmlFor={title as string}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={title as string}
        {...register(title, { required: `${title} is required` })}
        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-50"
      />
      {errors[title] && (
        <p className="text-sm text-red-500 mt-1">
          {errors[title]?.message?.toString()}
        </p>
      )}
    </div>
  );
}
