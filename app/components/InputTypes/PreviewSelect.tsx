import { Option } from "@/app/providers/InputProvider";
import React from "react";

export default function PreviewSelect({
	value,
	onChange,
	options,
	...props
}: {
	value: string | number;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	options?: Option[];
	props?: React.InputHTMLAttributes<HTMLInputElement>;
}) {
	return (
		<div className="flex flex-col gap-1">
			{options?.map((option, index) => (
				<div key={index} className="">
					<label
						htmlFor={`option${index}`}
						className="flex items-center gap-2 cursor-pointer"
					>
						<input
							type="radio"
							id={`option${index}`}
							name="options"
							value={option.value}
							onChange={onChange}
							className="relative w-5 h-5 rounded-full appearance-none cursor-pointer border-2 border-borderGray checked:border-primary peer"
							checked={value === option.value}
						/>
						<div className="absolute ml-1.5 w-2 h-2 flex items-center justify-center border-2 border-transparent peer-checked:border-primary rounded-full bg-transparent peer-checked:bg-primary">
							{/* Inner circle */}
						</div>
						<span className="text-normal text-textBlack">{option.value}</span>
					</label>
				</div>
			))}
		</div>
	);
}
