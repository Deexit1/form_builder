"use client";
import Button from "./components/button";

export default function NotFound() {
	return (
		<div className="h-screen flex flex-col justify-center items-center">
			<h1 className="text-6xl font-extrabold text-primary">404</h1>
			<p className="text-medium font-semibold text-gray-500">
				Seems you lost your way !
			</p>
			<Button className="mt-5" onClick={() => window.location.replace("/")}>
				Go back home
			</Button>
		</div>
	);
}
