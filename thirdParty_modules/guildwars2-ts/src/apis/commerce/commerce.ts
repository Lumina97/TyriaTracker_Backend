import { ApiBase } from '../../base/apiBase';
import {
	CommerceDeliveryDTO,
	CommerceExchangeDTO,
	CommerceListingsDTO,
	CommercePricesDTO,
	CommerceTransactionDTO
} from '../../models';
import { endpoints } from '../endpoints';

/**
 * /v2/commerce Api
 */
export class CommerceApi extends ApiBase {
	/**
	 * Provides access to the current items and coins available for pickup on this account.
	 */
	async getDeliveries() {
		return await this.buildRequest<typeof CommerceDeliveryDTO>(
			endpoints.commerce.delivery,
			{},
			CommerceDeliveryDTO
		);
	}

	/**
	 * Returns the current coins to gems exchange rate, or vice versa.
	 *
	 * @param type - Gems to coins, or vice versa
	 * @param quantity - Quantity of coins to be exchanged (in copper coins)
	 */
	async getExchange(type: 'gems' | 'coins', quantity: number) {
		return await this.buildRequest<typeof CommerceExchangeDTO>(
			endpoints.commerce.exchange,
			{ type, quantity },
			CommerceExchangeDTO
		);
	}

	/**
	 * Returns current buy and sell listings from the trading post.
	 * TODO: Functionality to return a complete list of every listing is currently unsupported
	 *
	 * @param ids - Listing ids
	 */
	async getListings(ids: number[]) {
		return await this.buildRequest<typeof CommerceListingsDTO>(
			endpoints.commerce.listings,
			{ ids },
			CommerceListingsDTO
		);
	}

	/**
	 * Returns current aggregated buy and sell listing information from the trading post.
	 * TODO: Functionality to return a complete list of every listing is currently unsupported
	 *
	 * @param ids - Item ids
	 */
	async getPrices(ids: number[]) {
		return await this.buildRequest<typeof CommercePricesDTO>(endpoints.commerce.prices, { ids }, CommercePricesDTO);
	}

	/**
	 * Provides access to the current and historical transactions of a player.
	 * Results are cached for 5 minutes.
	 *
	 * @param status - Current or historical transactions
	 * @param type - Buy or sell transactions
	 */
	async getTransactions(status: 'current' | 'history', type: 'buys' | 'sells') {
		return await this.buildRequest<typeof CommerceTransactionDTO>(
			endpoints.commerce.transactions,
			{ status, type },
			CommerceTransactionDTO
		);
	}
}
