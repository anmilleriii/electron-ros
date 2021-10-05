import { dialog } from "electron";
import { autoUpdater } from "electron-updater";

// Toggle show dialogs
const showDialogs = process.env.VUE_APP_SHOW_AUTO_UPDATE_DIALOGS || true;

/**
 * Auto updater used in background.js.
 *
 * @param {null}
 * @returns {void}
 */
function createAutoUpdater() {
  autoUpdater.checkForUpdatesAndNotify();
  autoUpdater.on("checking-for-update", () => {
    showDialogs &&
      showDialog({
        message: `Checking for update`,
      });
  });
  autoUpdater.on("update-available", (info) => {
    showDialogs &&
      showDialog({
        message: `A new version ${info.version}, of the app is available`,
        detail:
          "The update will be downloaded in the background. You will be notified when it is ready to be installed.",
      });
  });
  autoUpdater.on("update-not-available", (info) => {
    showDialogs &&
      showDialog({
        message: `Update not available`,
      });
  });
  autoUpdater.on("error", (err) => {
    showDialogs &&
      showDialog({
        message: `Error in auto-updater`,
        detail: `${err.toString()}`,
      });
  });
  autoUpdater.on("download-progress", (progressObj) => {
    showDialogs &&
      showDialog({
        message: `Download in progress`,
        detail: `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`,
      });
  });
  autoUpdater.on("update-downloaded", (info) => {
    showDialogs &&
      showDialog({
        message: `Successfully downloaded update, installing now (app will exit).`,
      });
    autoUpdater.quitAndInstall();
  });
}

/**
 * Generate & show dialogs.
 *
 * @param {string} message
 * @param {string} details
 * @returns {void}
 */
function showDialog(message = "", details = "") {
  dialog.showMessageBox({
    message: message,
    details: details,
  });
}

export { createAutoUpdater };
