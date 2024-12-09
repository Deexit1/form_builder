import { ChevronDown } from "lucide-react";
import Calendar from "../icons/Calendar";
import LinkURL from "../icons/LinkURL";
import LongAnswer from "../icons/LongAnswer";
import ShortAnswer from "../icons/ShortAnswer";
import SingleSelect from "../icons/SingleSelect";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input, useInputs } from "../providers/InputProvider";

const icons: { [key: string]: React.ElementType } = {
	text: ShortAnswer,
	textarea: LongAnswer,
	select: SingleSelect,
	url: LinkURL,
	date: Calendar,
};
const renderIcon = (type: string) => {
	const Icon = icons[type];
	if (!Icon) return null;
	return <Icon width={20} height={20} />;
};

function EditInput({ id, input }: { id: string; input: Input }) {
	const { updateInput } = useInputs();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const editInput = useCallback(
		(type: string) => {
			const newInput = { ...input };
			newInput.type = type;
			updateInput(id, newInput);
		},
		[id, input, updateInput]
	);

	const handleClickOutside = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	const handleEsacpe = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEsacpe);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEsacpe);
		};
	}, []);

	return (
		<div className="relative" ref={dropdownRef}>
			<div
				className="flex gap-1"
				onClick={() => setIsOpen((prevState) => !prevState)}
			>
				{renderIcon(input.type)}
				<ChevronDown className="w-5 h-5" />
			</div>
			{isOpen ? (
				<div className="z-10 absolute top-10 bg-white border border-borderGray rounded-lg p-2 shadow-dropdown">
					{Object.keys(icons).map((key) => (
						<div
							key={key}
							className="flex items-center gap-2 p-2 cursor-pointer hover:bg-backgroundGray rounded-sm"
							onClick={() => {
								editInput(key);
								setIsOpen(false);
							}}
						>
							{renderIcon(key)}
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}

export default EditInput;
