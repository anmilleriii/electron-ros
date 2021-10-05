module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ["rclnodejs"],

      builderOptions: {
        extraResources: [
          {
            from: "./build",
            to: "/_",
            filter: ["**/*"],
          },
        ],
      },

      linux: {
        target: "AppImage",
        category: "Utility",
      },
    },
  },
};
