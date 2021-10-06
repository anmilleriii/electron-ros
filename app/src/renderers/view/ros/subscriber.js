const io = require("socket.io-client");
const rosWsConnection = io(
  `http://localhost:4545`
);
// const rosWsConnection = io(
//   `localhost:${process.env.VUE_APP_ROS_WS_PORT || 4545}`
// );

/**
 * Subscribe to the backend publisher which is itself subscribing to ROS.
 * Could be named client-subscrition.js
 * Vuex would be used here to subscribe...
 *
 * @param {String} topicName
 * @returns {String} response
 */
function createTopicSubscription(topicName) {
  console.log('client is subscribed')
  rosWsConnection.on(topicName, (response) => {
    // console.log(response, 'asdf')
    // return response;
  });
}

export { createTopicSubscription };
