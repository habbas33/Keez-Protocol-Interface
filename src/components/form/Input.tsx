const Input = (props: {
  placeholder?: string;
  value?: string;
  name: string;
  type: string;
  handleChange: any;
  size?: string;
  min?: string;
  max?: string;
  maxLength?: number;
  className?: string;
}) => {
  const {
    placeholder,
    name,
    type,
    handleChange,
    size,
    min,
    max,
    maxLength,
    value,
    className,
  } = props;
  // const half =true;
  return (
    <input
      placeholder={placeholder}
      value={value}
      type={type}
      step="0.1"
      min={min}
      max={max}
      maxLength={maxLength}
      onChange={(e) => handleChange(e, name)}
      className={`my-1 ${
        size ? size : "w-full"
      } block rounded-lg p-2 outline-none  text-white border-2 border-[#999999] focus:border-red-400 text-sm text-gray-700 leading-tight ${className}`}
    />
  );
};
export default Input;
