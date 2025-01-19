import { type ILogObj, Logger } from 'tslog';

/**
 * TSlog log level
 */
export enum LogLevel {
	error = 5,
	warn = 4,
	info = 3,
	debug = 2
}

/**
 * Global logger object
 */
export const logger: Logger<ILogObj> = new Logger({
	minLevel: LogLevel.error,
	hideLogPositionForProduction: true
});

/**
 * Set logger level
 *
 * @param minLevel - Minimum logging level
 */
export const setLogLevel = (minLevel: LogLevel): void => {
	logger.settings.minLevel = minLevel;
};

/**
 * Set whether the logger will display file paths
 *
 * @param displayFilePath - Filepath status
 */
export const setPathLogging = (displayFilePath: boolean): void => {
	logger.settings.hideLogPositionForProduction = !displayFilePath;
};
