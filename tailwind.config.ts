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
				gray: "var(--gray)",
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
				normal: "16px",
				large: "18px",
				small: "14px",
			},
			borderRadius: {
				sm: "12px",
				md: "16px",
			},
			boxShadow: {
				sm: "0px 1px 1px -0.5px #00000008",
				md: "0px 3px 3px -1.5px #00000008",
			},
		},
	},
	plugins: [],
};
export default config;
