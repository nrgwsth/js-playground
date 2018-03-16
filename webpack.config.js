const path = require("path");

module.exports = {

	entry: "./src/index",
	output: {
		path: path.join(__dirname, "/"),
		filename: "bundle.js"
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: "babel-loader",
			exclude: /node_modules/
		}]
	}
}