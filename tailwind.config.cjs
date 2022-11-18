const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				Roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
};
