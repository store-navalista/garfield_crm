import { LOCALES } from "../i18n";

export const getPaths = () => {
	const paths = Object.values(LOCALES)
		.filter(v => v !== 'en-us')
		.map(v => {
			return {
				params: { locale: v.substring(0, 2) }
			}
		});
	return paths;
}