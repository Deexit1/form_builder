import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				primary: "var(--primary)",
				primaryLight: "var(--primaryLight)",
				gray: "var(--gray)",
				backgroundGray: "var(--backgroundGray)",
				borderGray: "var(--borderGray)",
				borderPrimary: "var(--borderPrimary)",
				textBlack: "var(--textBlack)",
				textGray: "var(--textGray)",
			},
			fontFamily: {
				inter: ["Inter", "sans-serif"],
			},
			fontWeight: {
				light: "400",
				normal: "500",
				bold: "600",
			},
			fontSize: {
				large: "18px",
				medium: "16px",
				normal: "14px",
				small: "12px",
			},
			borderRadius: {
				sm: "8px",
				md: "12px",
				lg: "16px",
			},
			boxShadow: {
				sm: "0px 1px 1px -0.5px #00000008, 0px 3px 3px -1.5px #00000008",
				dropdown:
					"0px 24px 24px -12px #00000008, 0px 12px 12px -6px #00000008, 0px 6px 6px -3px #00000008, 0px 3px 3px -1.5px #00000008, 0px 1px 1px -0.5px #00000008",
			},
		},
	},
	plugins: [],
};
export default config;
