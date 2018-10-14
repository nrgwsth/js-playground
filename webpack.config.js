const path = require("path");

module.exports = {
	mode: "development",
	devtool: "source-map",
	entry: "./src/index",
	output: {
		path: path.join(__dirname, "/"),
		filename: "bundle.js"
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: "babel-loader",
			exclude: /node_modules/
		}]
	},
	externals: ["assert"]
}