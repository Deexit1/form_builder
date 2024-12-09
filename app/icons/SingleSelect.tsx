import { useState } from "react";

export default function SingleSelect({
	width,
	height,
}: {
	width: number;
	height: number;
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
			>
				<g clipPath="url(#clip0_664_1208)">
					<path
						d="M10.0001 18.3334C14.6025 18.3334 18.3334 14.6025 18.3334 10.0001C18.3334 5.39771 14.6025 1.66675 10.0001 1.66675C5.39771 1.66675 1.66675 5.39771 1.66675 10.0001C1.66675 14.6025 5.39771 18.3334 10.0001 18.3334Z"
						stroke={isHovered ? "#0d0d0d" : "currentColor"}
						strokeWidth="1.5"
						strokeLinejoin="round"
					/>
					<path
						d="M10.0001 13.3334C11.841 13.3334 13.3334 11.841 13.3334 10.0001C13.3334 8.15913 11.841 6.66675 10.0001 6.66675C8.15913 6.66675 6.66675 8.15913 6.66675 10.0001C6.66675 11.841 8.15913 13.3334 10.0001 13.3334Z"
						fill={isHovered ? "#0d0d0d" : "currentColor"}
						stroke={isHovered ? "#0d0d0d" : "currentColor"}
						strokeWidth="1.5"
						strokeLinejoin="round"
					/>
				</g>
				<defs>
					<clipPath id="clip0_664_1208">
						<rect width="20" height="20" fill="white" />
					</clipPath>
				</defs>
			</svg>
		</div>
	);
}
