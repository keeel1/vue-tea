let path = require("path");
module.exports = {
	//代理

	devServer: {
		proxy: {
			'/admin': {
				target: "http://localhost:3000",
				changeOrigin: true,
				pathRewrite: {
					'^/admin': '/admin'
				}
			}
		},
	},

	configureWebpack: (config) => {
		config.resolve = {
			extensions: ['.js', '.json', '.vue'],
			alias: {
				'@': path.resolve(__dirname, './src'),
			}
		}
	}
}