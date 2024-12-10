"use client";
import { useRouter } from "next/navigation";
import Button from "./button";

export default function List(form: any) {
	const router = useRouter();
	form = form.form;

	return (
		<div key={form.formId} className="px-4 py-2 border-b border-borderGray">
			<div className="flex gap-2 justify-between items-center">
				<p className="text-medium font-bold">{form.formName}</p>
				<div className="flex gap-2 items-center">
					<div className="flex gap-2 items-center">
						{form.isDraft ? (
							<Button variant="outline" className="bg-orange-500 text-white">
								Draft
							</Button>
						) : null}
						<Button
							variant="outline"
							onClick={() => router.push(`form?id=${form.formId}`)}
						>
							Edit
						</Button>
					</div>
				</div>
			</div>
			<p className="text-small text-gray-500">
				{form.inputs?.length} questions
			</p>
		</div>
	);
}
