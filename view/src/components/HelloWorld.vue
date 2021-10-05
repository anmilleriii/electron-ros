<template>
  <div class="hello">
    <p>hey</p>
  </div>
</template>

<script setup>
import { creatTopicSubscription } from "../ros-util.js";

const subscription = creatTopicSubscription('/example/topic')
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
