import fs from "fs";
import path from "path";

const filePath = path.resolve(process.cwd(), "data.json");

export const readData = () => JSON.parse(fs.readFileSync(filePath, "utf-8"));
export const writeData = (data: object) =>
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
