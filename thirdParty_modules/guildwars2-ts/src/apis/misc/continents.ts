import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { ContinentsDTO, ContinentsFloorsDTO, ContinentsMapsDTO, ContinentsRegionsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/continents api
 */
export class ContinentsApi extends ApiBase {
	/**
	 * Returns information about continents, their floors, regions, and maps.
	 *
	 * NOTE: Refer to the function overload types for usage.
	 * Endpoint priority is as follows -> maps > regions > floors > continents > none
	 * As such, for example, maps is present, all previous arguments must be of type number
	 */
	async getContinents(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about continents, their floors, regions, and maps.
	 *
	 * @param continents - Continent ids, or "all"
	 */
	async getContinents(continents: number[] | 'all'): Promise<z.infer<typeof ContinentsDTO>>;
	/**
	 * Returns information about continents, their floors, regions, and maps.
	 *
	 * @param continents - Continent id.
	 * @param floors - Floor ids, or "all".
	 */
	async getContinents(continents: number, floors: number[] | 'all'): Promise<z.infer<typeof ContinentsFloorsDTO>>;
	/**
	 * Returns information about continents, their floors, regions, and maps.
	 *
	 * @param continents - Continent id.
	 * @param floors - Floor id.
	 * @param regions - Region ids, or "all".
	 */
	async getContinents(
		continents: number,
		floors: number,
		regions: number[] | 'all'
	): Promise<z.infer<typeof ContinentsRegionsDTO>>;
	/**
	 * Returns information about continents, their floors, regions, and maps.
	 *
	 * @param continents - Continent id.
	 * @param floors - Floor id.
	 * @param regions - Region id.
	 * @param maps - Map ids, or "all".
	 */
	async getContinents(
		continents: number,
		floors: number,
		regions: number,
		maps: number[] | 'all'
	): Promise<z.infer<typeof ContinentsMapsDTO>>;
	async getContinents(
		continents?: number[] | number | 'all',
		floors?: number[] | number | 'all',
		regions?: number[] | number | 'all',
		maps?: number[] | 'all'
	) {
		if (typeof continents === 'number') {
			if (typeof floors === 'number') {
				if (typeof regions === 'number') {
					if (maps) {
						return await this.buildRequest<typeof ContinentsMapsDTO>(
							endpoints.continents.maps,
							{
								continents,
								floors,
								regions,
								maps
							},
							ContinentsMapsDTO
						);
					}
				} else if (Array.isArray(regions) || regions === 'all') {
					return await this.buildRequest<typeof ContinentsRegionsDTO>(
						endpoints.continents.regions,
						{
							continents,
							floors,
							regions
						},
						ContinentsRegionsDTO
					);
				}
			} else if (Array.isArray(floors) || floors === 'all') {
				return await this.buildRequest<typeof ContinentsFloorsDTO>(
					endpoints.continents.floors,
					{
						continents,
						floors
					},
					ContinentsFloorsDTO
				);
			}
		} else if (Array.isArray(continents) || continents === 'all') {
			return await this.buildRequest<typeof ContinentsDTO>(
				endpoints.continents.continents,
				{
					continents
				},
				ContinentsDTO
			);
		}
		return await this.buildRequest<typeof numberArrayType>(endpoints.continents.core, {}, numberArrayType);
	}
}
