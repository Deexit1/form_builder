import React from "react";

const LongAnswer = React.memo(function LongAnswer({
	value,
	onChange,
	placeholder,
	disabled,
	...props
}: {
	value: string | number;
	disabled: boolean;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	placeholder: string;
	props?: React.InputHTMLAttributes<HTMLTextAreaElement>;
}) {
	return (
		<textarea
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			disabled={disabled}
			className="w-full outline-none text-normal text-textBlack border border-borderGray p-2 rounded-sm resize-none hover:shadow-md focus-within:shadow-md transition duration-150 ease-linear"
			rows={3}
			{...props}
		/>
	);
});

export default LongAnswer;
