import { ApiBase } from '../../base/apiBase';
import { SkillsDTO } from '../../models';
import { endpoints } from '../endpoints';

/**
 * /v2/skills Api
 */
export class SkillsApi extends ApiBase {
	/**
	 * Returns information about skills usable by players in the game.
	 *
	 * @param ids - List of skill ids
	 */
	async get(ids: number[]) {
		return await this.buildRequest<typeof SkillsDTO>(endpoints.skills, { ids }, SkillsDTO);
	}
}
