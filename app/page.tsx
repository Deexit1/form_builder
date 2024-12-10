import Button from "./components/button";
import { readData } from "./api/forms/route";
import List from "./components/List";
import { Form } from "./providers/InputProvider";

export default async function Home() {
	// Server actions (no need to call the api, you can directly search in the db)
	const res = await readData();
	const forms = res.forms;

	return (
		<>
			<div className="sticky top-0 w-full p-3 border-y border-borderGray font-bold flex items-center justify-between gap-2 h-[8vh] lg:h-[6vh] bg-white">
				Form Builder
			</div>
			{forms.length > 0 ? (
				<div>
					<p className="p-4 text-large font-bold">Your Forms</p>
					{forms.map((form: Form) => (
						<List key={form.formId} form={form} />
					))}
				</div>
			) : (
				<div className="p-4 flex flex-col gap-5 items-center h-[85vh] overflow-y-auto justify-center">
					<p className="text-lg font-bold">Welcome to Form Builder</p>
					<p className="text-md text-center">
						Click on the button below to start creating your form
					</p>
					<Button>Create Form</Button>
				</div>
			)}
		</>
	);
}
