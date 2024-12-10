import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const filePath = path.resolve(process.cwd(), "data.json");

export const readData = () => JSON.parse(fs.readFileSync(filePath, "utf-8"));
const writeData = (data: object) =>
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

export async function GET(req: Request) {
	try {
		const data = readData();
		return NextResponse.json(data.forms);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch the forms" },
			{ status: 500 }
		);
	}
}

export async function POST(req: Request) {
	try {
		const data = readData();
		const newForm = await req.json();
		data.forms.push(newForm);
		writeData(data);
		return NextResponse.json(newForm, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to create the form" },
			{ status: 500 }
		);
	}
}
