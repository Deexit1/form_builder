"use client";
import React, { ChangeEvent, ChangeEventHandler } from "react";
import { ArrowUpRight } from "lucide-react";
import Button from "./Button";
import Progress from "./Progress";
import { useInputs } from "../providers/InputProvider";

export default function Header({
	header,
	isPreview,
	handleHeader,
	setPreview,
}: {
	header: string;
	isPreview: boolean;
	handleHeader: ChangeEventHandler<HTMLInputElement>;
	setPreview: (value: boolean) => void;
}) {
	const { inputs } = useInputs();
	return (
		<div className="sticky top-0 w-full p-3 border-y border-borderGray font-bold flex items-center justify-between gap-2 h-[8vh] lg:h-[6vh]">
			{isPreview ? (
				<p className="text-md w-1/2 overflow-hidden text-ellipsis">{header}</p>
			) : (
				<input
					type="text"
					placeholder="Enter form name here"
					className="w-full outline-none"
					value={header}
					onChange={handleHeader}
				/>
			)}
			<div className="flex gap-2 items-center">
				<Button
					variant={inputs.length === 0 ? "disabled" : "outline"}
					suffixIcon={<ArrowUpRight className="w-5 h-5" />}
					onClick={() => {
						setPreview(!isPreview);
					}}
				>
					{isPreview ? "Edit" : "Preview"}
				</Button>
				{isPreview ? <Progress inputs={inputs} /> : null}
			</div>
		</div>
	);
}
