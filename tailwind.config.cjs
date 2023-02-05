/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/routes/**/*.{svelte,js,ts}', './src/routes/*.{svelte,js,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#94B447',
					secondary: '#3b5284',
					accent: '#CBE54E',
					neutral: '#5BA8A0',
					'base-100': '#f8f8f1',
					info: '#3ABFF8',
					success: '#36D399',
					warning: '#facc15',
					error: '#f87171'
				}
			}
		]
	}
};
