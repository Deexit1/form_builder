"use client";
import { GripVertical, Trash } from "lucide-react";
import ShortAnswer from "./InputTypes/ShortAnswer";
import LongAnswer from "./InputTypes/LongAnswer";
import Select from "./InputTypes/Select";
import Url from "./InputTypes/Url";
import Date from "./InputTypes/Date";
import EditInput from "./EditInput";
import { Input, useInputs } from "../providers/InputProvider";

export default function EditorInput({
	input,
	...props
}: {
	input: Input;
	props?: React.InputHTMLAttributes<HTMLInputElement>;
}) {
	const { removeInput, updateInput } = useInputs();
	const renderInput = () => {
		const inputTypes: { [key: string]: React.ElementType } = {
			text: ShortAnswer,
			textarea: LongAnswer,
			select: Select,
			url: Url,
			date: Date,
		};
		const Component = inputTypes[input.type];
		if (!Component) return null;
		return <Component disabled input={input} />;
	};

	const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newInput = { ...input };
		newInput.question = e.target.value;
		updateInput(input.id, newInput);
	};

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newInput = { ...input };
		newInput.description = e.target.value;
		updateInput(input.id, newInput);
	};

	const handleRemoveInput = () => {
		removeInput(input.id);
	};

	return (
		<div className="border border-borderGray p-4 rounded-lg focus-within:shadow-sm transition duration-150 ease-linear hover:bg-backgroundGray w-full">
			<div className="flex justify-between gap-2 mb-2">
				<div className="flex flex-col w-full gap-1">
					<label className="text-normal text-textBlack font-bold">
						<input
							type="text"
							placeholder="Write a question here"
							className="w-full outline-none text-normal text-textBlack bg-transparent"
							value={input.question}
							onChange={(e) => handleQuestionChange(e)}
							{...props}
						/>
					</label>
					<input
						type="text"
						placeholder="Write a description here"
						className="w-full outline-none text-small text-textBlack bg-transparent"
						value={input.description}
						onChange={(e) => handleDescriptionChange(e)}
						{...props}
					/>
				</div>
				<div className="flex gap-2 text-textGray">
					<Trash
						className="w-5 h-5 cursor-pointer hover:text-textBlack transition-all ease-linear duration-150"
						onClick={handleRemoveInput}
					/>
					<div className="flex cursor-pointer">
						<EditInput input={input} id={input.id} />
					</div>
					<GripVertical className="w-5 h-5 cursor-grab hover:text-textBlack transition-all ease-linear duration-150" />
				</div>
			</div>
			{renderInput()}
		</div>
	);
}
