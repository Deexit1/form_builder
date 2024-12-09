import { useState } from "react";

export default function Calendar({
	width,
	height,
	...props
}: {
	width: number;
	height: number;
	props?: React.SVGProps<SVGSVGElement>;
}) {
	const [isHovered, setIsHovered] = useState(false);
	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<svg
				width={width}
				height={height}
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				{...props}
			>
				<path
					d="M15 1.66675V3.33341M5 1.66675V3.33341"
					stroke={isHovered ? "#0d0d0d" : "currentColor"}
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M9.99633 10.8333H10.0038M9.99633 14.1666H10.0038M13.3259 10.8333H13.3334M6.66675 10.8333H6.67422M6.66675 14.1666H6.67422"
					stroke={isHovered ? "#0d0d0d" : "currentColor"}
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M2.91675 6.66675H17.0834"
					stroke={isHovered ? "#0d0d0d" : "currentColor"}
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M2.08325 10.2027C2.08325 6.57162 2.08325 4.75607 3.12669 3.62803C4.17012 2.5 5.84949 2.5 9.20825 2.5H10.7916C14.1503 2.5 15.8298 2.5 16.8732 3.62803C17.9166 4.75607 17.9166 6.57162 17.9166 10.2027V10.6307C17.9166 14.2618 17.9166 16.0773 16.8732 17.2053C15.8298 18.3333 14.1503 18.3333 10.7916 18.3333H9.20825C5.84949 18.3333 4.17012 18.3333 3.12669 17.2053C2.08325 16.0773 2.08325 14.2618 2.08325 10.6307V10.2027Z"
					stroke={isHovered ? "#0d0d0d" : "currentColor"}
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M2.5 6.66675H17.5"
					stroke={isHovered ? "#0d0d0d" : "currentColor"}
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
}
