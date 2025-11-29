const InputForm = ({ label, name, type, placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="w-full bg-transparent border border-gray-600 rounded-full py-3 px-4 placeholder-gray-400 focus:outline-none focus:border-white"
      />
    </div>
  );
};

export default InputForm;
