import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config : Config = {
	namespace: 'exa',
	srcDir: 'src',
	copy: [
		{ src: 'svg/', dest: 'svg/' },
	],
	outputTargets: [
		{ type: 'www' },
		{ type: 'dist' }
	],
	plugins: [
		sass()
	],
	
};
