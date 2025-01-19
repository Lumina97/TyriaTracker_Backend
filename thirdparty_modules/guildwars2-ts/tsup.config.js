import { defineConfig } from 'tsup';

export default defineConfig({
	format: ['esm', 'cjs'],
	entry: ['src/index.ts'],
	treeshake: true,
	sourcemap: false,
	clean: true,
	dts: true
});
