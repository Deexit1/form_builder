import fs from "fs";
import { NextResponse, NextRequest } from "next/server";
import path from "path";

const filePath = path.resolve(process.cwd(), "data.json");

export const readData = () => JSON.parse(fs.readFileSync(filePath, "utf-8"));

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	try {
		const data = readData();
		if (id) {
			const form = data.forms.find((form: any) => form.formId === id);
			if (!form) {
				return NextResponse.json({ error: "Form not found" }, { status: 404 });
			}
			return NextResponse.json(form);
		} else {
			return NextResponse.json({ message: "No form found" }, { status: 404 });
		}
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch the forms" },
			{ status: 500 }
		);
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	const data = readData();
	const formIndex = data.forms.findIndex((form: any) => form.formId === id);
	if (formIndex === -1) {
		return NextResponse.json({ error: "Form not found" }, { status: 404 });
	}
	const body = await req.json();

	data.forms[formIndex] = { ...data.forms[formIndex], ...body };
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
	return NextResponse.json(data.forms[formIndex]);
}
