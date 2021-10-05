import rclnodejs from "rclnodejs";

const sampleTopicSubscription = (socket) => {
  const node = rclnodejs.createNode(`sampleTopic`);

  node.createSubscription("sample/topic", (message) => {
    setInterval(() => {
      socket.emit("/sample/topic", message);
    }, 1000);
  });

  rclnodejs.spin(node);
};

export default sampleTopicSubscription;
