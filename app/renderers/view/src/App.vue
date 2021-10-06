<template>
  <div class="message">
    <p>Subscription value: {{ subscription }}</p>
  </div>
</template>

<script setup>
import { creatTopicSubscription } from "../ros-util.js";

// todo actual ros topic subscription
const subscription = creatTopicSubscription("/example/topic");
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
