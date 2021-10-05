module.exports = {

  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    //   externals: ['json-server', 'rclnodejs'],
        linux: {
          "target": "AppImage",
          "category": "Utility"
        },
      },
    },
  },
}