module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ["rclnodejs"],
      linux: {
        target: "AppImage",
        category: "Utility",
      },
    },
  },
};
