# electron-ros

### Purpose

This is a sample implementation of [rclnodejs](https://github.com/RobotWebTools/rclnodejs) in a distributable, production Electron application.

### Background

`rclnodejs` contains dynamic links and requires runtime interpolation of environment variables pertaining the the current system's custom ROS installation (*e.g.*, including custom topic definitions).

Currently no static distribution of `rclnodejs` is available (see [this issue](https://github.com/RobotWebTools/rclnodejs/issues/718)).

>While this repository uses `rclnodejs` as the examplar, the principle of using a launch file to launch an Electron app is applicable across many use cases, for which this template is equally applicable.

Using a launch file is messier than bundling your Electron app altogether. You are responsible for distributing the launch file with your Electron application, and updating it seperately as necessary. The launch file is not updated by Electron's auto-update functionality.

### Stack

This repository uses [Vue](https://vuejs.org/) and [electron-builder](https://www.electron.build/), using [vue-cli-plugin-electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/) to marry them.

While this setup includes a few idiosyncrasies, the principle of using a launch file with production Electron apps as demonstrated here is framework-agnostic.

### Setup

#### Requirements

Exact dependency versions have proven to be critical for functionality.

````json
// package.json
...
  "engines": {
    "node": "15.14.0",
    "npm": "7.7.6"
  },
  "dependencies": {
    "core-js": "3.6.5",
    "electron-updater": "4.3.9",
    "socket.io": "^4.2.0",
    "vue": "3.1.1",
    "rclnodejs": "0.19.1"
  }
  ...
````
While the `rclnodejs` `README.md` suggests:

>Nodejs version between 10.23.1 - 12.x.

...`rclnodejs` should be forwards-compatible with Node versions `>12.x.y`. (see *...incorrect Node version* below).

#### Development

`git clone https://github.com/anmilleriii/electron-ros.git`

`cd electron-ros/app`

Source ROS manually.

`source /opt/ros/foxy/setup.bash`

`npm install` (or `yarn`)

`npm run electron:serve` (or `yarn electron:serve`)

#### Distribution

##### Build

`npm run electron:build` (or `yarn electron:build`)

>Recall you will be unable to run the Electron executable normally, due to the missing `source /opt/ros/foxy/setup.bash` in a shared context as the Electron app.

##### Launch File

To source the ROS installation in a shared context with the Electron app, we can use a launch file.

Our launch file needs to 1) source ROS 2) grant permissions to the Electron app and 3) start the Electron app.

We can compile a petite C script to do this:

```bash
// launch.sh

#! /bin/bash env -i

source /opt/ros/foxy/setup.bash
/opt/app/$(ls | grep 'app-.[^\s]*' | head -1) --no-sandbox
```

Move `launch.sh` to the same directory as your bundled Electron app.

E.g., the final end-user's directory structure might look like:

````
/opt/app/
    launch.sh
    example-0.1.0.AppImage
````

Per the earlier caveat, you are responsible for distributing your Electron app with the launch script, and directing your users to launch from that rather than the Electron application, as they normally would.

##### Release

This example publishes releases to Github.

First add your publishing destination repository in `package.json`.

````json
// package.json
...
"repository": "https://github.com/<username>/<repository>.git"
...
````

Get a [Github Personal Access Token (PAT)](https://github.com/settings/tokens) with repository access.

Then export it in the same terminal as you run the release command.

`export GH_TOKEN=<your_GH_PAT>`

`npm run release` (or `yarn electron:serve`)

See the great vue-cli-plugin-electron-builder [ documentation](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/recipes.html#auto-update).

Recall that this release only includes the Electron app - not the launch file.

Distributing the launch file and having the user install it is handled per your implementation.

A potential solution is to distribute your application as an archive (zip, tar, etc.) with both the launch executable and Electron app. This will likely introduce complexities you will need to manage for Mac and Windows outside of the scope of this article.

#### Auto Updates

Refer to the `auto-updater.js` module and `background.js` file in this repository.

Also see the great vue-cli-plugin-electron-builder [ documentation](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/recipes.html#auto-update).

#### Auto Launch on Boot

>Enabling auto launching requires `sudo` or end-user granted permission.

A common requirement is for an Electron application (commonly kiosk-type use-cases) to launch on system start.

In a simpler case (*sans* launch file) we could take advantage of Electron's native `app.setLoginItemSettings()` `openAtLogin` property, or perhaps the npm `auto-launch` [module](https://www.npmjs.com/package/auto-launch).

However we have introduced the complexity of needing to launch our app via the `launch` executable rather than the Electron app itself.

To achieve auto launch then, we can use `cron` or `systemd`. Here `systemd` is used.

Create a `systemd` `service` in `/etc/systemd/system/`.

````systemd
# /etc/systemd/system/auto-launch.service

[Unit]
Description=Electron application auto-launch on boot

[Service]
WorkingDirectory=/opt/app
ExecStart=/opt/app/launch.sh
Restart=always

[Install]
WantedBy=multi-user.target
````

Ensure you have granted permissions to the `launch` file

`chmod u+x <path_to_launch_executable>`

And finally enable the service to start on boot.

`sudo systemctl enable auto-launch.service`

##### Common Errors

**`rclnodejs` module is undefined**

```
App threw an error during load
    TypeError: Cannot read property 'indexOf' of undefined
    ...
```

*Fix:*

`npm rebuild rclnodejs --update-binary`

Add `rclnodejs` to externals in `vue.config.js`:

````js
// vue.config.js

module.exports = {
  ...
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ["rclnodejs"],
    },
  },
  ...
};
````

>*If not using the same stack as this repository, you may need to manually handle your Webpack configuration.*

**`rclnodejs` compiled against incorrect Node version**

```
Error: The module '...' was compiled against a different Node.js version using
    NODE_MODULE_VERSION x. This version of Node.js requires
    NODE_MODULE_VERSION y. Please try re-compiling or re-installing
    the module (for instance, using `npm rebuild` or `npm install`).
```

*Fix:*

`npm rebuild rclnodejs --update-binary`

### Further Reading

- [Useful Stack Overflow answer on launch files](https://stackoverflow.com/questions/43692986/launching-an-application-while-sourcing-bashrc)
- [vue-cli-plugin-electron-builder documentation](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/recipes.html#auto-update)
- [Getting started with systemd](https://github.com/coreos/docs/blob/master/os/getting-started-with-systemd.md)

### Questions

Please open an issue or feel free to reach out at [albert.miller@uconn.edu](mailto:albert.miller@uconn.edu).
