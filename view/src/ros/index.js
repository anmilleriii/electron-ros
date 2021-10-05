// const rclnodejs = require("rclnodejs");
// const { Context } = require("rclnodejs");
// const sampleTopicSubscription = require("./modules/subscriber.js");

// const options = {
//   cors: {
//     origin: `*`,
//     methods: ["GET", "POST"],
//   },
// };
// const io = require("socket.io")(options);
// const onConnection = (socket) => {
//   rclnodejs
//     .init()
//     .then(() => {
//       sampleTopicSubscription.default(socket);
//       rclnodejs.spin(node);
//     })
//     .catch((error) => console.log(error));

//   io.on("disconnect", (socket) => {
//     rclnodejs.shutdownAll();
//     socket.diconnect(true);
//   });
// };
// io.on("connection", onConnection);

// io.listen(4545);
