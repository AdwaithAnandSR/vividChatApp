/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				pblack: ["poppins-black"],
				pbold: ["poppins-bold"],
				pmedium: ["poppins-medium"],
				pthin: ["poppins-thin"],
				rblack: ["roboto-black"],
				rbold: ["roboto-bold"],
				rmedium: ["roboto-medium"],
				rthin: ["roboto-regular"],
				jfsregular: ["jacquesFrancoisShadow-regular"],
				nerkoregular: ["nerkoOne-regular"]
			}
		}
	},
	plugins: []
};
