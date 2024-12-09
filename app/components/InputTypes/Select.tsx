import { Input, Option, useInputs } from "@/app/providers/InputProvider";
import { Circle, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { uuid } from "uuidv4";

import { useCallback, useMemo } from "react";

export default function Select({ input }: { input: Input }) {
	const { setInputs, inputs } = useInputs();

	// find the correct input from inputs array
	const inputIndex = inputs.findIndex((i) => i.id === input.id);
	const input_info = useMemo(() => inputs[inputIndex], [inputs, inputIndex]);

	const handleUpdateInputs = useCallback(
		(newOptions: Option[]) => {
			const newInput = { ...input_info };
			newInput.options = newOptions;
			setInputs((prevInputs) =>
				prevInputs.map((i) => (i.id === input_info.id ? newInput : i))
			);
		},
		[input_info, setInputs]
	);

	useEffect(() => {
		handleUpdateInputs(input_info.options);
	}, [input_info.options]);

	const removeOption = useCallback(
		(option: Option) => {
			const newOptions = [...input_info.options];
			const index = newOptions.findIndex((o) => o.id === option.id);
			if (index > -1) {
				newOptions.splice(index, 1);
			}
			if (newOptions.length === 0) {
				newOptions.push({ id: uuid(), value: "" });
			}
			handleUpdateInputs(newOptions);
		},
		[input_info.options, handleUpdateInputs]
	);

	return (
		<div className="flex flex-col gap-2">
			{input_info.options.map((option, index) => (
				<OptionComponent
					option={option}
					key={index}
					setOptions={handleUpdateInputs}
					options={input_info.options}
					isLast={index === input_info.options.length - 1}
					removeOption={() => removeOption(option)}
				/>
			))}
		</div>
	);
}

function OptionComponent({
	option,
	isLast,
	setOptions,
	options,
}: {
	option: Option;
	isLast?: boolean;
	setOptions: (options: Option[]) => void;
	options: Option[];
	removeOption: () => void;
}) {
	const [input, setInput] = useState(option);
	const addOption = () => {
		if (input.value.trim().length === 0) return;
		const newOptions = [...options];
		newOptions[options.length - 1] = input;
		setOptions([...newOptions, { id: uuid(), value: "" }]);
	};

	const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setInput((prev) => ({ ...prev, value: newValue }));
		const newOptions = [...options];
		const index = newOptions.findIndex((o) => o.id === option.id);
		if (index > -1) {
			newOptions[index] = { ...option, value: newValue };
		}
		setOptions(newOptions);
	};

	return (
		<div className="flex gap-2 items-center">
			<Circle className="text-textBlack" size={20} />
			<input
				value={input.value}
				onChange={handleChangeOption}
				placeholder="Option"
				className="w-full outline-none text-normal text-textBlack border border-borderGray p-2 rounded-sm shadow-sm focus-within:shadow-md hover:shadow-md transition duration-150 ease-linear"
			/>
			{/* <Minus
				className="text-textBlack cursor-pointer"
				size={20}
				onClick={removeOption}
			/> */}
			{isLast && (
				<Plus
					className="text-textBlack cursor-pointer"
					size={20}
					onClick={addOption}
				/>
			)}
		</div>
	);
}
