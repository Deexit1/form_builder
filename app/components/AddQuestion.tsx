"use client";
import { PlusIcon } from "lucide-react";
import Button from "./Button";
import React, {
	useEffect,
	useRef,
	useState,
	useCallback,
	useMemo,
} from "react";
import ShortAnswer from "../icons/ShortAnswer";
import LongAnswer from "../icons/LongAnswer";
import SingleSelect from "../icons/SingleSelect";
import LinkURL from "../icons/Calendar";
import Calendar from "../icons/LinkURL";
import { useInputs } from "../providers/InputProvider";

const inputTypes = useMemo(
	() => [
		{
			name: "Short Answer",
			type: "text",
			icon: ShortAnswer,
		},
		{
			name: "Long Answer",
			type: "textarea",
			icon: LongAnswer,
		},
		{
			name: "Single Select",
			type: "select",
			icon: SingleSelect,
		},
		{
			name: "Link",
			type: "url",
			icon: Calendar,
		},
		{
			name: "Date",
			type: "date",
			icon: LinkURL,
		},
	],
	[]
);

export default function AddQuestion() {
	const { addInput } = useInputs();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = useCallback((event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	}, []);

	const handleEscape = useCallback((event: KeyboardEvent) => {
		if (event.key === "Escape") {
			setIsOpen(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [handleClickOutside, handleEscape]);

	return (
		<div className="relative" ref={dropdownRef}>
			<Button
				variant="outline"
				prefixIcon={<PlusIcon className="w-4 h-4" />}
				onClick={() => setIsOpen((prevState) => !prevState)}
			>
				Add Question
			</Button>
			{isOpen ? (
				<div className="z-10 absolute top-10 bg-white border border-borderGray rounded-lg p-2 w-60 shadow-dropdown">
					<p className="text-small font-bold text-textGray pl-2">INPUT TYPES</p>
					{inputTypes.map((inputType) => (
						<div
							className="flex gap-2 items-center text-normal font-bold p-2 cursor-pointer hover:bg-backgroundGray rounded-sm"
							onClick={() => {
								addInput(inputType.type);
								setIsOpen(false);
							}}
							key={`${inputType.name}-${inputType.type}`}
						>
							<inputType.icon width={20} height={20} />
							<p>{inputType.name}</p>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}
