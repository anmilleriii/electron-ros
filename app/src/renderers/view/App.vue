<template>
  <div class="message">
    <p>Subscription value: {{ subscription }}</p>
  </div>
</template>

<script setup>
import { createTopicSubscription } from "./ros/subscriber.js";

// todo actual ros topic subscription
const subscription = createTopicSubscription("/topic");
console.log(subscription);
</script>

<script setup></script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  background: lightblue;
}
</style>
