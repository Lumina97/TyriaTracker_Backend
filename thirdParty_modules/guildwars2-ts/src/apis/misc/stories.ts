import { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { StoriesDTO, StoriesSeasonsDTO } from '../../models';
import { endpoints } from '../endpoints';

const storiesCore = z.array(z.number());
const seasonsCore = z.array(z.string());

export class StoriesApi extends ApiBase {
	/**
	 * Returns information about the Story Journal stories; including the personal story and Living World.
	 */
	async getStories(): Promise<z.infer<typeof storiesCore>>;
	/**
	 * Returns information about the Story Journal stories; including the personal story and Living World.
	 *
	 * @param ids - List of story ids, or "all"
	 */
	async getStories(ids: number[] | 'all'): Promise<z.infer<typeof StoriesDTO>>;
	async getStories(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof StoriesDTO>(endpoints.stories.byId, { ids }, StoriesDTO);
		return await this.buildRequest<typeof storiesCore>(endpoints.stories.all, {}, storiesCore);
	}

	/**
	 * Returns information about the Story Journal story seasons; including the personal story and Living World.
	 */
	async getSeasons(): Promise<string[]>;
	/**
	 * Returns information about the Story Journal story seasons; including the personal story and Living World.
	 *
	 * @param ids - List of season ids, or "all"
	 */
	async getSeasons(ids: string[] | 'all'): Promise<z.infer<typeof StoriesSeasonsDTO>>;
	async getSeasons(ids?: string[] | 'all') {
		if (ids)
			return await this.buildRequest<typeof StoriesSeasonsDTO>(
				endpoints.seasons.byId,
				{ ids },
				StoriesSeasonsDTO
			);
		return await this.buildRequest<typeof seasonsCore>(endpoints.seasons.all, {}, seasonsCore);
	}
}
