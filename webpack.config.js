const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const prod = process.env.NODE_ENV === "production";

module.exports = {
  mode: prod ? "production" : "development",
  devtool: prod ? "cheap-module-source-map" : "eval",
  entry: path.resolve(__dirname, "./src/index.tsx"),
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-report.html",
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: "bundle-status.json",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, "src"),
        use: ["babel-loader"],
      },
    ],
  },
  devServer: {
    open: true,
    port: 3000,
    hot: true,
  },
};
