module.exports = {

  configureWebpack: {
    // Define entrypoint for the Vue application (not the broader Electron app entrypoint)
    entry: "./src/renderers/view/main.js",
  },

  pluginOptions: {
    electronBuilder: {
      // Specify entrypoint for Electron app
      mainProcessFile: 'src/main/background.js',
      nodeIntegration: true,
      externals: ["rclnodejs"],
      linux: {
        target: "AppImage",
        category: "Utility",
      },
    },
  },
};
