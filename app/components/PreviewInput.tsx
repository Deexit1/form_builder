import React, { useCallback, memo, useMemo } from "react";
import ShortAnswer from "./InputTypes/ShortAnswer";
import LongAnswer from "./InputTypes/LongAnswer";
import Url from "./InputTypes/Url";
import Date from "./InputTypes/Date";
import PreviewSelect from "./InputTypes/PreviewSelect";
import { Input, useInputs } from "../providers/InputProvider";

const PreviewInput: React.FC<{
	input: Input;
	errors: { id: string; message: string }[];
	setErrors: (errors: { id: string; message: string }[]) => void;
}> = ({ input, errors, setErrors }) => {
	const { updateInput } = useInputs();

	const handleValueChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newInput = { ...input, value: e.target.value };
			updateInput(input.id, newInput);
		},
		[input, updateInput]
	);

	if (input.type === "url") {
		if (input.value) {
			const url = new URL(input.value.toString());
			if (url.protocol !== "http:" && url.protocol !== "https:") {
				setErrors([...errors, { id: input.id, message: "Invalid URL" }]);
			} else {
				setErrors(errors.filter((error) => error.id !== input.id));
			}
		}
	}

	const error = useMemo(
		() => errors.find((err) => err.id === input.id),
		[errors, input.id]
	);

	const renderInput = useCallback(() => {
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
	}, [input, handleValueChange]);

	return (
		<div className="flex flex-col justify-between gap-1 w-full">
			<label
				className={`text-normal text-textBlack font-bold ${
					error ? "text-red-500" : "text-textBlack"
				}`}
			>
				{input.question}
			</label>
			<p className="text-small text-textBlack">{input.description}</p>
			{renderInput()}
		</div>
	);
};

export default memo(PreviewInput);
