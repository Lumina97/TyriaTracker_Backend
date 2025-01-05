import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { AchievementCategoriesDTO, AchievementGroupsDTO } from '../../models/';
import { endpoints } from '../endpoints';
import { numberArrayType, stringArrayType } from '../v2apiUtils';

/**
 * /v2/achievements api
 */
export class AchievementsApi extends ApiBase {
	/**
	 * Returns all the categories for achievements.
	 */
	async getCategories(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns all the categories for achievements.
	 *
	 * @param ids - (optional) List of category ids, or "all".
	 */
	async getCategories(ids: number[] | 'all'): Promise<z.infer<typeof AchievementCategoriesDTO>>;
	async getCategories(ids?: number[] | 'all') {
		if (ids)
			return await this.buildRequest<typeof AchievementCategoriesDTO>(
				endpoints.achievements.categories,
				{ ids },
				AchievementCategoriesDTO
			);
		return await this.buildRequest<typeof numberArrayType>(endpoints.achievements.categoryIds, {}, numberArrayType);
	}

	/**
	 * Returns all the top-level groups for achievements.
	 */
	async getGroups(): Promise<z.infer<typeof stringArrayType>>;
	/**
	 * Returns all the top-level groups for achievements.
	 *
	 * @param id - (optional) Group id.
	 */
	async getGroups(id: string): Promise<z.infer<typeof AchievementGroupsDTO>>;
	async getGroups(id?: string) {
		if (id)
			return await this.buildRequest<typeof AchievementGroupsDTO>(
				endpoints.achievements.groupsById,
				{ id },
				AchievementGroupsDTO
			);
		return await this.buildRequest<typeof stringArrayType>(endpoints.achievements.groupsAll, {}, stringArrayType);
	}
}
