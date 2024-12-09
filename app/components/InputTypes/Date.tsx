import React from "react";

const Date = React.memo(function Date({
	value,
	onChange,
	placeholder,
	disabled,
	...props
}: {
	value: string;
	disabled: boolean;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	placeholder: string;
	props?: React.InputHTMLAttributes<HTMLInputElement>;
}) {
	return (
		<div className="relative">
			<input
				type="date"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				disabled={disabled}
				className="w-full outline-none text-normal text-textBlack border border-borderGray p-2 rounded-sm shadow-sm bg-gray"
				{...props}
			/>
		</div>
	);
});

export default Date;
