import { COLORS } from "./constants/colors.const";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: COLORS,
			aspectRatio: {
				portrait: 9 / 16,
			},
		},
	},
	plugins: [],
};
