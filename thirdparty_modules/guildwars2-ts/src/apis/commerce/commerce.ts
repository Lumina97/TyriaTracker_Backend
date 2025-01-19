import type { z } from "zod";
import { ApiBase } from "../../base/apiBase";
import {
	CommerceDeliveryDTO,
	CommerceExchangeDTO,
	CommerceListingsDTO,
	CommercePricesDTO,
	CommerceTransactionDTO,
} from "../../models";
import { endpoints } from "../endpoints";
import { numberArrayType } from "../v2apiUtils";
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
			CommerceDeliveryDTO,
		);
	}

	/**
	 * Returns the current coins to gems exchange rate, or vice versa.
	 *
	 * @param type - Gems to coins, or vice versa
	 * @param quantity - Quantity of coins to be exchanged (in copper coins)
	 */
	async getExchange(type: "gems" | "coins", quantity: number) {
		return await this.buildRequest<typeof CommerceExchangeDTO>(
			endpoints.commerce.exchange,
			{ type, quantity },
			CommerceExchangeDTO,
		);
	}

	/*
	 * Returns all tradable item Ids
	 */
	async getListings(): Promise<z.infer<typeof numberArrayType>>;

	/**
	 * Returns current buy and sell listings from the trading post.
	 *
	 * @param ids - Listing ids
	 */
	async getListings(ids: number[]): Promise<z.infer<typeof CommerceListingsDTO>>;
	async getListings(ids?: number[]) {
		if (ids)
			return await this.buildRequest<typeof CommerceListingsDTO>(
				endpoints.commerce.listings.byId,
				{ ids },
				CommerceListingsDTO,
			);
		return await this.buildRequest<typeof numberArrayType>(endpoints.commerce.listings.all, {}, numberArrayType);
	}

	/*
	 * Returns all tradable item ids
	 */
	async getPrices(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns current aggregated buy and sell listing information from the trading post.
	 *
	 * @param ids - Item ids
	 */
	async getPrices(ids: number[]): Promise<z.infer<typeof CommercePricesDTO>>;
	async getPrices(ids?: number[]) {
		if (ids)
			return await this.buildRequest<typeof CommercePricesDTO>(
				endpoints.commerce.prices.byId,
				{ ids },
				CommercePricesDTO,
			);
		return await this.buildRequest<typeof numberArrayType>(endpoints.commerce.prices.all, {}, numberArrayType);
	}

	/**
	 * Provides access to the current and historical transactions of a player.
	 * Results are cached for 5 minutes.
	 *
	 * @param status - Current or historical transactions
	 * @param type - Buy or sell transactions
	 */
	async getTransactions(status: "current" | "history", type: "buys" | "sells") {
		return await this.buildRequest<typeof CommerceTransactionDTO>(
			endpoints.commerce.transactions,
			{ status, type },
			CommerceTransactionDTO,
		);
	}
}
