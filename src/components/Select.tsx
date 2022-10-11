import React from "react";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: any; label: string }[];
  value?: any;
}

function Select({ options, className, ...props }: Props) {
  return (
    <select
      className={
        "w-full rounded-md h-[40px] border-[2px] focus:border-[#F87171] active:border-[#F87171] px-2 mt-2 block" +
        className
      }
      {...props}
    >
      {options.map((option) => (
        <option
          value={option.value}
          className="active:bg-[#ff9292] hover:bg-[#ff9292]"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
