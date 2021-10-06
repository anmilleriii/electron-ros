import rclnodejs from "rclnodejs";

const createTopicSubscription = (socket) => {
  const node = rclnodejs.createNode(`subscriber_example_node`);

  node.createSubscription("std_msgs/msg/String", "topic", (message) => {
    // only listen at throttled interval
    setInterval(() => {
      socket.emit("/topic", message);
      console.log('emitting msg', message)
      console.log("message from publisher:", message);
    }, 1000);
  });

  rclnodejs.spin(node);
};

export { createTopicSubscription };
