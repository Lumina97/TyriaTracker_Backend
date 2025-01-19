import { ApiBase } from '../../base/apiBase';
import { HomeCatsDTO, HomeNodesDTO } from '../../models';
import { endpoints } from '../endpoints';

/**
 * /v2/home Api
 */
export class HomeApi extends ApiBase {
	/**
	 * Returns information about cats.
	 * Identical to /v2/cats
	 *
	 * @param ids - List of cat ids, or "all"
	 */
	async getCats(ids: number[] | 'all' = 'all') {
		return await this.buildRequest<typeof HomeCatsDTO>(endpoints.home.cats, { ids }, HomeCatsDTO);
	}

	/**
	 * Returns a list of all currently available home instance nodes.
	 * Can be resolved against /v2/account/home/nodes to identify an account's unlocked nodes.
	 *
	 * @param ids - List of node ids, or "all"
	 */
	async getNodes(ids: string[] | 'all' = 'all') {
		return await this.buildRequest<typeof HomeNodesDTO>(
			endpoints.home.nodes,
			{
				ids
			},
			HomeNodesDTO
		);
	}
}
