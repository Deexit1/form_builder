"use client";
import Header from "./components/Header";
import Button from "./components/Button";
import { Check } from "lucide-react";
import AddQuestion from "./components/AddQuestion";
import { ChangeEvent, useState } from "react";
import Draft from "./icons/Draft";
import EditorInput from "./components/EditorInput";
import PreviewInput from "./components/PreviewInput";
import { toast } from "sonner";
import { useInputs } from "./providers/InputProvider";

export default function Home() {
	const { inputs } = useInputs();
	const [isPreview, setPreview] = useState<boolean>(false);
	const [formName, setFormName] = useState<string>("");

	const handleHeader = (e: ChangeEvent<HTMLInputElement>) => {
		setFormName(e.target.value);
	};

	if (!isPreview)
		return (
			<>
				<Header
					header={formName}
					handleHeader={handleHeader}
					isPreview={isPreview}
					setPreview={setPreview}
				/>
				<div className="p-4 flex flex-col gap-5 items-center h-[85vh] overflow-y-auto">
					{inputs.map((input) => (
						<EditorInput key={input.id} input={input} />
					))}
					<AddQuestion />
				</div>
				<div className="absolute bottom-0 flex justify-between items-center px-4 py-6 w-full bg-backgroundGray border-t border-borderGray h-[8vh]">
					<Button
						variant={inputs.length === 0 ? "disabled" : "outline"}
						onClick={() => console.log("Form submitted")}
						prefixIcon={
							<Draft
								width={16}
								height={16}
								color={inputs.length === 0 ? "#959DA5" : "#0D0D0D"}
							/>
						}
						disabled={inputs.length === 0}
					>
						Save as Draft
					</Button>
					<Button
						variant={"default"}
						onClick={() => setPreview(true)}
						prefixIcon={<Check size={16} />}
						disabled={inputs.length === 0}
					>
						Publish Form
					</Button>
				</div>
			</>
		);

	return (
		<>
			<Header
				header={formName}
				isPreview={isPreview}
				setPreview={setPreview}
				handleHeader={handleHeader}
			/>
			<div className="p-4 flex flex-col gap-5 items-center">
				{inputs.map((input, index) => (
					<div key={index} className="w-full flex gap-2">
						<PreviewInput input={input} />
					</div>
				))}
				<div className="w-full flex justify-end">
					<Button
						variant="default"
						disabled={inputs.some(
							(input) => input.value?.toString().trim() === ""
						)}
						onClick={() =>
							toast.success("Form Submitted", {
								className: "text-borderPrimary",
								position: "bottom-center",
								closeButton: true,
							})
						}
					>
						Submit
					</Button>
				</div>
			</div>
		</>
	);
}
