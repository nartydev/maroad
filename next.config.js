require('dotenv-extended').load();
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const css = require('@zeit/next-css');
const optimizedImages = require('next-optimized-images');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const axios = require('axios');
const syncRequest = require('sync-request');

<<<<<<< HEAD
const blogs = () => {
	return JSON.parse(syncRequest('GET', `http://localhost:8888/wordpress/wp-json/wp/v2/posts`).getBody('utf8'));
};

const dataBlog = blogs();
console.log(dataBlog);

=======
>>>>>>> d0681dd52f7b46d120033e70ab1ecc7daf4d4588
module.exports = withPlugins(
	[
		[
			optimizedImages,
			{
				inlineImageLimit: -1,
				imagesFolder: 'images',
				imagesName: '[name]-[hash].[ext]',
				handleImages: [ 'jpg', 'jpeg', 'png', 'svg', 'webp', 'gif' ],
				optimizeImages: true,
				optimizeImagesInDev: false,
				mozjpeg: {
					quality: 80
				},
				optipng: {
					optimizationLevel: 3
				},
				pngquant: false,
				gifsicle: {
					interlaced: true,
					optimizationLevel: 3
				},
				svgo: {
					// enable/disable svgo plugins here
				},
				webp: {
					preset: 'default',
					quality: 75
				}
			}
		],
		css,
		[
			withBundleAnalyzer,
			{
				analyzeServer: [ 'server', 'both' ].includes(process.env.BUNDLE_ANALYZE),
				analyzeBrowser: [ 'browser', 'both' ].includes(process.env.BUNDLE_ANALYZE),
				bundleAnalyzerConfig: {
					server: {
						analyzerMode: 'static',
						reportFilename: '../bundles/server.html'
					},
					browser: {
						analyzerMode: 'static',
						reportFilename: '../bundles/client.html'
					}
				}
			}
		]
	],
	{
		webpack: (config) => {
			if (config.optimization.splitChunks.cacheGroups && config.optimization.splitChunks.cacheGroups.commons) {
				config.optimization.splitChunks.cacheGroups.commons.minChunks = 3;
			}

			config.plugins.push(
				new FilterWarningsPlugin({
					exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
				})
			);

			return config;
		},
		exportPathMap: (defaultExportPathMap) => ({
			...defaultExportPathMap,
			...dataBlog.reduce(
				(pages, { id }) =>
					Object.assign({}, pages, {
						[`/blog/${id}`]: {
							page: '/blog/[id]',
							query: { id }
						}
					}),
				{}
			)
		})
	}
);
