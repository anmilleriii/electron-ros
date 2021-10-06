const io = require("socket.io-client");
const rosWsConnection = io(
  `localhost:${process.env.VUE_APP_ROS_WS_PORT || 4545}`
);

/**
 * Subscribe to the backend publisher which is itself subscribing to ROS.
 *
 * @param {String} topicName
 * @returns {void}
 */
function createTopicSubscription(topicName) {
  rosWsConnection.on(topicName, (response) => console.log(response));
}

export { createTopicSubscription };
