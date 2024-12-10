"use client";
import { Check } from "lucide-react";
import React, {
	ChangeEvent,
	useState,
	useCallback,
	useEffect,
	Suspense,
} from "react";
import { toast } from "sonner";
import Header from "../components/Header";
import EditorInput from "../components/EditorInput";
import PreviewInput from "../components/PreviewInput";
import AddQuestion from "../components/AddQuestion";
import { useInputs } from "../providers/InputProvider";
import Button from "../components/button";
import Draft from "../icons/Draft";
import { uuid } from "uuidv4";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const MemoizedHeader = React.memo(Header);
const MemoizedEditorInput = React.memo(EditorInput);
const MemoizedPreviewInput = React.memo(PreviewInput);
const MemoizedAddQuestion = React.memo(AddQuestion);

function FormBuilder() {
	const { inputs, setInputs } = useInputs();
	const params = useSearchParams();
	const router = useRouter();
	const id = params.get("id");

	const getInputs = useCallback(async () => {
		try {
			const res = await axios.get(`/api/form/${id}`);
			if (res.data) {
				setFormName(res.data.formName);
				setInputs(res.data.inputs);
			} else {
				router.push("/not-found");
			}
		} catch (err) {
			console.log("Error", err);
			router.push("/not-found");
		}
	}, []);

	useEffect(() => {
		if (id) {
			getInputs();
		}
	}, [id]);

	const [isPreview, setPreview] = useState<boolean>(false);
	const [formName, setFormName] = useState<string>("");

	const handleHeader = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setFormName(e.target.value);
	}, []);

	const handleSaveDraft = useCallback(async () => {
		try {
			let res;
			if (id) {
				const data = {
					formId: id,
					isDraft: true,
					formName: formName,
					inputs: inputs,
				};
				res = await axios.put(`/api/form/${id}`, data);
			} else {
				const data = {
					formId: uuid(),
					isDraft: true,
					formName: formName,
					inputs: inputs,
				};
				res = await axios.post("/api/forms", data);
			}
			toast.success(`Form Submitted (${res.data.formId})`, {
				className: "text-borderPrimary",
				position: "bottom-center",
				closeButton: true,
			});
		} catch (err) {
			console.log("Error", err);
			toast.error("Failed to submit form", {
				className: "text-red-600",
				position: "bottom-center",
				closeButton: true,
			});
		}
	}, [inputs, formName, id]);

	const handlePublishForm = useCallback(async () => {
		try {
			let res;
			if (id) {
				const data = {
					formId: id,
					isDraft: false,
					formName: formName,
					inputs: inputs,
				};
				res = await axios.put(`/api/form/${id}`, data);
			} else {
				const data = {
					formId: uuid(),
					isDraft: false,
					formName: formName,
					inputs: inputs,
				};
				res = await axios.post("/api/forms", data);
			}
			setPreview(true);
			toast.success(`Form Published (${res.data.formId})`, {
				className: "text-borderPrimary",
				position: "bottom-center",
				closeButton: true,
			});
		} catch (err) {
			console.log("Error", err);
			toast.error("Failed to publish form", {
				className: "text-red-600",
				position: "bottom-center",
				closeButton: true,
			});
		}
	}, [inputs, formName, id, setPreview]);

	const handleFormSubmit = useCallback(async () => {
		// Make an API call to submit the form
		try {
			const data = {
				formId: uuid(),
				isDraft: false,
				formName,
				inputs,
			};
			const res = await axios.post("/api/forms", data);
			toast.success(`Form Submitted (${res.data.formId})`, {
				className: "text-borderPrimary",
				position: "bottom-center",
				closeButton: true,
			});
		} catch (err) {
			console.log("Error", err);
			toast.error("Failed to submit form", {
				className: "text-red-600",
				position: "bottom-center",
				closeButton: true,
			});
		}
	}, []);

	if (!isPreview)
		return (
			<>
				<MemoizedHeader
					header={formName}
					handleHeader={handleHeader}
					isPreview={isPreview}
					setPreview={setPreview}
				/>
				<div className="p-4 flex flex-col gap-5 items-center h-[85vh] overflow-y-auto">
					{inputs.map((input) => (
						<MemoizedEditorInput key={input.id} input={input} />
					))}
					<MemoizedAddQuestion />
				</div>
				<div className="absolute bottom-0 flex justify-between items-center px-4 py-6 w-full bg-backgroundGray border-t border-borderGray h-[8vh]">
					<Button
						variant={inputs.length === 0 ? "disabled" : "outline"}
						onClick={handleSaveDraft}
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
						onClick={handlePublishForm}
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
			<MemoizedHeader
				header={formName}
				isPreview={isPreview}
				setPreview={setPreview}
				handleHeader={handleHeader}
			/>
			<div className="p-4 flex flex-col gap-5 items-center">
				{inputs.map((input, index) => (
					<div key={index} className="w-full flex gap-2">
						<MemoizedPreviewInput input={input} />
					</div>
				))}
				<div className="w-full flex justify-end">
					<Button
						variant="default"
						disabled={inputs.some(
							(input) => input.value?.toString().trim() === ""
						)}
						onClick={handleFormSubmit}
					>
						Submit
					</Button>
				</div>
			</div>
		</>
	);
}

export default function Form() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<FormBuilder />
		</Suspense>
	);
}
