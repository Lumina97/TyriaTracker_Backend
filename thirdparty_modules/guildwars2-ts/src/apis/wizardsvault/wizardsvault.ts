import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { WizardsVaultDTO, WizardsVaultListingsDTO, WizardsVaultObjectivesDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

export class WizardsVaultApi extends ApiBase {
	/**
	 * Returns information about the current Wizard's Vault season.
	 */
	async get() {
		return await this.buildRequest<typeof WizardsVaultDTO>(endpoints.wizardsVault.root, {}, WizardsVaultDTO);
	}

	/**
	 * Returns details about listings in the Wizard's Vault.
	 */
	async getListings(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns details about listings in the Wizard's Vault.
	 *
	 * @param ids - (optional) List of listing ids, or "all".
	 */
	async getListings(ids: number[] | 'all'): Promise<z.infer<typeof WizardsVaultListingsDTO>>;
	async getListings(ids?: number[] | 'all') {
		if (ids)
			return await this.buildRequest<typeof WizardsVaultListingsDTO>(
				endpoints.wizardsVault.listingsById,
				{ ids },
				WizardsVaultListingsDTO
			);
		return await this.buildRequest<typeof numberArrayType>(endpoints.wizardsVault.listingsAll, {}, numberArrayType);
	}

	/**
	 * Returns all Wizard's Vault's objectives in the game.
	 */
	async getObjectives(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns all Wizard's Vault's objectives in the game.
	 *
	 * @param ids - (optional) List of objective ids, or "all".
	 */
	async getObjectives(ids: number[] | 'all'): Promise<z.infer<typeof WizardsVaultObjectivesDTO>>;
	async getObjectives(ids?: number[] | 'all') {
		if (ids)
			return await this.buildRequest<typeof WizardsVaultObjectivesDTO>(
				endpoints.wizardsVault.objectivesById,
				{ ids },
				WizardsVaultObjectivesDTO
			);
		return await this.buildRequest<typeof numberArrayType>(
			endpoints.wizardsVault.objectivesAll,
			{},
			numberArrayType
		);
	}
}
