const merge = require("webpack-merge");

exports.default = {
  pre(options) {
    console.log("START BUILD")
  },
  config(config) {
    const mergeStrategy = merge.strategy({
      "config.optimization.splitChunks.cacheGroups": "append"
    });

    return mergeStrategy(config, {
      optimization: {
        splitChunks: {
          cacheGroups: {
            angular: {
              name: "angular",
              chunks: "initial",
              test: /[\\/]node_modules[\\/](@angular)[\\/]/,
              priority: 5
            }
          }
        }
      }
    });
  },
  post(options) {
    console.log("END BUILD");
  }
};
