const rclnodejs = require("rclnodejs");
const { Context } = require("rclnodejs");
import { createTopicPublisher } from "./modules/publisher.js";
import { createTopicSubscription } from "./modules/subscriber.js";

const options = {
  cors: {
    origin: `*`,
    methods: ["GET", "POST"],
  },
};
const io = require("socket.io")(options);
const onConnection = (socket) => {
  rclnodejs
    .init()
    .then(() => {
      // create publisher for sake of example
      console.log('ros is connected')
      createTopicSubscription(socket);
      createTopicPublisher(socket);
    })
    .catch((error) => console.log(error));

  io.on("disconnect", (socket) => {
    rclnodejs.shutdownAll();
    socket.diconnect(true);
  });
};
io.on("connection", onConnection);

io.listen(process.env.VUE_APP_ROS_WS_PORT || 4545);