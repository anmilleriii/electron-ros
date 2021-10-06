<template>
  <div class="message">
    <p>Subscription value: {{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const message = ref('')
// import { createTopicSubscription } from "./ros/subscriber.js";

// todo actual ros topic subscription
// const subscription = createTopicSubscription("/topic");
// console.log(subscription);


const io = require("socket.io-client");
const rosWsConnection = io(
  `localhost:${process.env.VUE_APP_ROS_WS_PORT || 4545}`
);

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
    message.value = response;
  });
}
createTopicSubscription()
</script>

<script setup></script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  background: lightblue;
  font-size: 45px;
  font-family: Arial, Helvetica, sans-serif;
}

.message {
  width: 50%;
  margin: auto;
  margin-top: 100px;
}
</style>
