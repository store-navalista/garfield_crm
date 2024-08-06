import { I18n } from "./I18n";

export interface IFooterBlock extends I18n {
	icon?: string;
}

export interface IFooter {
	blocks: IFooterBlock[];
	copyright: IFooterBlock;
}
