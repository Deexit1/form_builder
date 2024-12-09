import React from "react";

const ShortAnswer = React.memo(function ShortAnswer({
	value,
	onChange,
	placeholder,
	disabled,
	...props
}: {
	disabled: boolean;
	value: string | number;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	placeholder: string;
	props?: React.InputHTMLAttributes<HTMLInputElement>;
}) {
	return (
		<input
			type="text"
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			disabled={disabled}
			className="w-full outline-none text-normal text-textBlack border border-borderGray p-2 rounded-sm shadow-sm focus-within:shadow-md hover:shadow-md transition duration-150 ease-linear"
			{...props}
		/>
	);
});

export default ShortAnswer;
