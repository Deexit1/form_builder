import { Input } from "../providers/InputProvider";

export default function Progress({ inputs }: { inputs: Input[] }) {
	const values = inputs.map((input) => input["value"]);

	const progress = Math.round(
		(values.filter((value) => value?.toString().trim() !== "").length /
			values.length) *
			100
	);

	return (
		<div className="flex flex-col gap-1 justify-between items-center">
			<p className="text-md lg:text-large hidden lg:block">
				Form Completeness - {progress}%
			</p>
			<p className="text-sm lg:text-md lg:hidden">{progress}%</p>
			<div className="relative hidden md:block md:w-40 lg:w-80 bg-gray h-1 rounded-full">
				<div
					className={`absolute top-0 left-0 bg-primary h-1 rounded-full transition-all duration-150 ease-in-out`}
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>
	);
}
