const path = require("path");
module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    proxy: {
      "/auth/google": {
        target: "http://localhost:5000",
        ws: true,
        changeOrigin: true
      },
      "/api/*": {
        target: "http://localhost:5000"
      }
    }
  }
};
