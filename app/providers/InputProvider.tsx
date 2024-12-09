import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useCallback,
} from "react";
import { uuid } from "uuidv4";

export interface Option {
	id: string;
	value: string;
}

export interface Input {
	id: string;
	type: string;
	question: string;
	description: string;
	options: Option[];
	value?: string | number;
}

interface InputsContextType {
	inputs: Input[];
	setInputs: React.Dispatch<React.SetStateAction<Input[]>>;
	addInput: (type: string) => void;
	updateInput: (id: string, updatedInput: Partial<Input>) => void;
	removeInput: (id: string) => void;
}

const InputsContext = createContext<InputsContextType | undefined>(undefined);

export const InputsProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [inputs, setInputs] = useState<Input[]>([]);

	const addInput = useCallback((type: string) => {
		const newInput = {
			id: uuid(),
			type: type,
			question: "",
			description: "",
			options: [{ id: uuid(), value: "" }],
			value: "",
		};
		setInputs((prevInputs) => [...prevInputs, newInput]);
	}, []);

	const updateInput = useCallback(
		(id: string, updatedInput: Partial<Input>) => {
			setInputs((prevInputs) =>
				prevInputs.map((input) =>
					input.id === id ? { ...input, ...updatedInput } : input
				)
			);
		},
		[]
	);

	const removeInput = useCallback((id: string) => {
		setInputs((prevInputs) => prevInputs.filter((input) => input.id !== id));
	}, []);

	return (
		<InputsContext.Provider
			value={{ inputs, setInputs, addInput, updateInput, removeInput }}
		>
			{children}
		</InputsContext.Provider>
	);
};

export const useInputs = (): InputsContextType => {
	const context = useContext(InputsContext);
	if (!context) {
		throw new Error("useInputs must be used within an InputsProvider");
	}
	return context;
};
