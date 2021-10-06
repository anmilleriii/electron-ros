module.exports = {

  configureWebpack: {
    // Define entrypoint for the Vue application (not the broader Electron app entrypoint)
    entry: "./src/renderers/view/main.js",
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/renderers/view/')
      }
    }
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
