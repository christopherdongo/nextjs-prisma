import {FieldErrors, FieldValues, Path, UseFormRegister} from "react-hook-form";

type PropsInput<T extends FieldValues> = {
  label: string;
  title: Path<T>;
  placeholder: string;
  rows: number;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
};

export default function Input<T extends FieldValues>({
  label,
  title,
  placeholder,
  errors,
  register,
  rows
}: PropsInput<T>) {
  return (
    <div>
      <label
        htmlFor="description"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        rows={rows}
        id={title}
        {...register(title, {required: `${title} name is required`})}
        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-50"
      />
      {errors[title] && (
        <p className="text-sm text-red-500 mt-0">
          {errors[title]?.message?.toString()}
        </p>
      )}
    </div>
  );
}
