import React from "react";

export default function Url({
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
	props?: React.InputHTMLAttributes<HTMLInputElement>;
}) {
	return (
		<input
			type="text"
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			disabled={disabled}
			className="w-full outline-none text-normal text-textBlack border border-borderGray p-2 rounded-sm shadow-sm bg-gray"
			{...props}
		/>
	);
}
