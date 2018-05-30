const sass = require('@stencil/sass');


exports.config = {
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
