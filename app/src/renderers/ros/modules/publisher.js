/**
 * Example only, normally publisher would be elswhere in ROS.
 */

import rclnodejs from "rclnodejs";

const createTopicPublisher = (socket) => {
  const node = new rclnodejs.Node("publisher_example_node");
  const publisher = node.createPublisher("std_msgs/msg/String", "topic");
  publisher.publish(`Hello ROS 2 from rclnodejs`);
  console.clear()
  console.log('creating publisher')
  rclnodejs.spin(node);
};

export { createTopicPublisher };
