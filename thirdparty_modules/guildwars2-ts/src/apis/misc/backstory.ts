import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { BackstoryAnswersDTO, BackstoryQuestionsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType, stringArrayType } from '../v2apiUtils';

/**
 * /v2/backstory Api
 */
export class BackstoryApi extends ApiBase {
	/**
	 * Returns information about the Biography answers that are in the game.
	 */
	async getAnswers(): Promise<z.infer<typeof stringArrayType>>;
	/**
	 * Returns information about the Biography answers that are in the game.
	 *
	 * @param ids - List of answer ids, or "all"
	 */
	async getAnswers(ids: Array<`${number}-${number}`> | 'all'): Promise<z.infer<typeof BackstoryAnswersDTO>>;
	async getAnswers(ids?: Array<`${number}-${number}`> | 'all') {
		if (ids)
			return await this.buildRequest<typeof BackstoryAnswersDTO>(
				endpoints.backstory.answersById,
				{ ids },
				BackstoryAnswersDTO
			);
		return await this.buildRequest<typeof stringArrayType>(endpoints.backstory.answersAll, {}, stringArrayType);
	}

	/**
	 * Returns information about the Biography questions that are in the game.
	 */
	async getQuestions(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about the Biography questions that are in the game.
	 *
	 * @param ids - List of question ids, or "all"
	 */
	async getQuestions(ids: number[] | 'all'): Promise<z.infer<typeof BackstoryQuestionsDTO>>;
	async getQuestions(ids?: number[] | 'all') {
		if (ids)
			return await this.buildRequest<typeof BackstoryQuestionsDTO>(
				endpoints.backstory.questionsById,
				{ ids },
				BackstoryQuestionsDTO
			);
		return await this.buildRequest<typeof numberArrayType>(endpoints.backstory.questionsAll, {}, numberArrayType);
	}
}
