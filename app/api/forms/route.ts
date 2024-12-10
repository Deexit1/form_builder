import { NextResponse } from "next/server";
import { readData, writeData } from "../utils";

export async function GET(req: Request) {
	try {
		console.log("req", req);
		const data = readData();
		return NextResponse.json(data.forms);
	} catch (error) {
		console.log("error", error);
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
		console.log("error", error);
		return NextResponse.json(
			{ error: "Failed to create the form" },
			{ status: 500 }
		);
	}
}
