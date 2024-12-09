import Calendar from "@/app/icons/Calendar";
import React from "react";

export default function Date({
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
			{/* <div className="absolute right-2 top-2.5">
				<Calendar width={20} height={20} />
			</div> */}
		</div>
	);
}
