import { I18n } from "./I18n";

interface ILinks extends I18n {
	href: string,
}

export interface IHeader {
	links: ILinks[];
}
