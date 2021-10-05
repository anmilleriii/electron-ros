import { dialog } from "electron";
import { autoUpdater } from "electron-updater";

function createAutoUpdater() {
  autoUpdater.checkForUpdatesAndNotify();
  autoUpdater.on("checking-for-update", () => {
    dialog.showMessageBox({
      message: `Checking for update`,
    });
  });
  autoUpdater.on("update-available", (info) => {
    dialog.showMessageBox({
      message: `A new version ${info.version}, of the app is available`,
      detail:
        "The update will be downloaded in the background. You will be notified when it is ready to be installed.",
    });
  });
  autoUpdater.on("update-not-available", (info) => {
    dialog.showMessageBox({
      message: `Update not available`,
    });
  });
  autoUpdater.on("error", (err) => {
    dialog.showMessageBox({
      message: `Error in auto-updater`,
      detail: `${err.toString()}`,
    });
  });
  autoUpdater.on("download-progress", (progressObj) => {
    dialog.showMessageBox({
      message: `Download in progress`,
      detail: `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`,
    });
  });
  autoUpdater.on("update-downloaded", (info) => {
    dialog.showMessageBox({
      message: `Successfully downloaded, installing now (app will exit).`,
    });
    autoUpdater.quitAndInstall();
  });
}

export { createAutoUpdater };
