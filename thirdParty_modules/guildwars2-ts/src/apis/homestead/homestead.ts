import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { HomesteadDecorationsCategoriesDTO, HomesteadDecorationsDTO, HomesteadGlyphsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType, stringArrayType } from '../v2apiUtils';

/**
 * /v2/homestead Api
 */
export class HomesteadApi extends ApiBase {
	/**
	 * Returns information about all available homestead decorations.
	 */
	async getDecorations(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about all available homestead decorations.
	 *
	 * @param ids - List of decoration ids
	 */
	async getDecorations(ids: number[]): Promise<z.infer<typeof HomesteadDecorationsDTO>>;
	async getDecorations(ids?: number[]) {
		if (ids) {
			return await this.buildRequest<typeof HomesteadDecorationsDTO>(
				endpoints.homestead.decorationsById,
				{ ids },
				HomesteadDecorationsDTO
			);
		}
		return await this.buildRequest<typeof numberArrayType>(endpoints.homestead.decorationsAll, {}, numberArrayType);
	}

	/**
	 * Returns information about all categories for homestead decorations.
	 */
	async getCategories(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about all categories for homestead decorations.
	 *
	 * @param ids - List of decoration category ids
	 */
	async getCategories(ids: number[]): Promise<z.infer<typeof HomesteadDecorationsCategoriesDTO>>;
	async getCategories(ids?: number[]) {
		if (ids) {
			return await this.buildRequest<typeof HomesteadDecorationsCategoriesDTO>(
				endpoints.homestead.decorationsCategoriesById,
				{ ids },
				HomesteadDecorationsCategoriesDTO
			);
		}
		return await this.buildRequest<typeof numberArrayType>(
			endpoints.homestead.decorationsCategoriesAll,
			{},
			numberArrayType
		);
	}

	/**
	 * Returns information about all available homestead glyphs.
	 */
	async getGlyphs(): Promise<z.infer<typeof stringArrayType>>;
	/**
	 * Returns information about all available homestead glyphs.
	 *
	 * @param ids - List of glyph ids
	 */
	async getGlyphs(ids: string[]): Promise<z.infer<typeof HomesteadGlyphsDTO>>;
	async getGlyphs(ids?: string[]) {
		if (ids) {
			return await this.buildRequest<typeof HomesteadGlyphsDTO>(
				endpoints.homestead.glyphsById,
				{ ids },
				HomesteadGlyphsDTO
			);
		}
		return await this.buildRequest<typeof stringArrayType>(endpoints.homestead.glyphsAll, {}, stringArrayType);
	}
}
