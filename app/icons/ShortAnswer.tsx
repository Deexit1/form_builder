import React from "react";

export default function ShortAnswer({
	width,
	height,
}: {
	width: number;
	height: number;
}) {
	const [isHovered, setIsHovered] = React.useState(false);
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
				<path
					d="M2.5 7.5H10.8333"
					stroke={isHovered ? "#0d0d0d" : "currentColor"}
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M2.5 12.5H17.5"
					stroke={isHovered ? "#0d0d0d" : "currentColor"}
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
}
