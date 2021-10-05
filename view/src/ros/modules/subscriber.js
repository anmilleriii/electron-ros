import rclnodejs from "rclnodejs";

const sampleTopicSubscription = (socket) => {
  const node = rclnodejs.createNode(`sampleTopic`);

  node.createSubscription("example", (message) => {
    setInterval(() => {
      socket.emit("/example/topic", message);
      console.log('hey', message)
    }, 1000);
  });

  rclnodejs.spin(node);
};

export default sampleTopicSubscription;
