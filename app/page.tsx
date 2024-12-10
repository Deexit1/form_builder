import { readData } from "./api/utils";
import Button from "./components/button";
import List from "./components/List";
import { Form } from "./providers/InputProvider";
import Link from "next/link";

export default async function Home() {
	// Server actions (no need to call the api, you can directly search in the db)
	// HERE WE SHOULD CALL THE API TO GET THE FORMS, BUT AS I'M NOT USING A DATABASE, I'LL JUST RETURN A MOCKED DATA
	// WHICH WILL CAUSE NOT REFRESHING THE DATA WHEN A NEW FORM IS CREATED BECAUSE OF THE NEXTJS CACHE SYSTEM
	const res = await readData();
	const forms = res.forms;

	return (
		<>
			<div className="sticky top-0 w-full p-3 border-y border-borderGray font-bold flex items-center justify-between gap-2 h-[8vh] lg:h-[6vh] bg-white">
				<h1>Form Builder</h1>
				<Link
					href="/form"
					className="flex items-center gap-1 text-small border rounded-md py-1 px-4 w-fit font-bold hover:shadow-sm text-textBlack border-borderGray bg-white"
				>
					Create Form
				</Link>
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
