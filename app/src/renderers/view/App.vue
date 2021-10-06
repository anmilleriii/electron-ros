<template>
  <div class="message">
    <p>If ros is connected, there will be a subscription value below.</p>
    <p>Subscription value: {{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const io = require("socket.io-client");

const rosWsConnection = io(
  `http://localhost:${process.env.VUE_APP_ROS_WS_PORT || 4545}`
);

const message = ref('')

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
    message.value = response.data;
  });
}
createTopicSubscription('/topic')
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  background: rgb(0, 73, 97);
  font-size: 25px;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
}

.message {
  width: 50%;
  margin: auto;
  margin-top: 100px;
}
</style>
