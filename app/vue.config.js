module.exports = {

  configureWebpack: {
    // Define entrypoint for the Vue application (not the broader Electron app entrypoint)
    entry: "./src/renderers/view/main.js",
  },

  pluginOptions: {
    electronBuilder: {
      // Specify entrypoint for Electron app
      mainProcessFile: './src/main/background.js',
      nodeIntegration: true,
      externals: ["rclnodejs"],
      linux: {
        target: "AppImage",
        category: "Utility",
      },
    },

    // Publish to Github Releases (could also use publish .AppImage's to AWS S3)
    // publish: ['github']
    /** @see https://www.electron.build/configuration/publish.html#s3options */
    publish: [{ provider: "s3", bucket: "app-releases", acl: "private" }],




  },
};
