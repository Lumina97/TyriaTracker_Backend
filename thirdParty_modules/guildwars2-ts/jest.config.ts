import type { Config } from 'jest';

export default async (): Promise<Config> => ({
	verbose: true,
	preset: 'ts-jest',
	transform: {
		'.(ts|tsx)': 'ts-jest'
	},
	modulePathIgnorePatterns: ['<rootDir>/build', '<rootDir>/node_modules']
});
