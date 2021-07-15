import { forwardRef } from "react";

const Input = forwardRef ((props, ref) => {
  return (
    <div>
      <input ref={ref}
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        className="border rounded-md px-3 py-2 w-64 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
      />
    </div>
  );
});

export default Input;
