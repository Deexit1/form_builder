import React from "react";
import ShortAnswer from "./InputTypes/ShortAnswer";
import LongAnswer from "./InputTypes/LongAnswer";
import Url from "./InputTypes/Url";
import Date from "./InputTypes/Date";
import PreviewSelect from "./InputTypes/PreviewSelect";
import { Input, useInputs } from "../providers/InputProvider";

export default function PreviewInput({ input }: { input: Input }) {
	const { updateInput } = useInputs();
	const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newInput = { ...input };
		newInput.value = e.target.value;
		updateInput(input.id, newInput);
	};
	const renderInput = () => {
		const inputTypes: { [key: string]: React.ElementType } = {
			text: ShortAnswer,
			textarea: LongAnswer,
			select: PreviewSelect,
			url: Url,
			date: Date,
		};
		const Component = inputTypes[input.type];
		if (!Component) return null;
		return (
			<Component
				value={input.value}
				onChange={handleValueChange}
				options={input.options}
			/>
		);
	};
	return (
		<div className="flex flex-col justify-between gap-1 w-full">
			<label className="text-normal text-textBlack font-bold">
				{input.question}
			</label>
			<p className="text-small text-textBlack">{input.description}</p>
			{renderInput()}
		</div>
	);
}
