<template>
  <van-image :src="exchange" />
</template>

<script>
import exchange from "../assets/images/exchange.png";
export default {
  setup() {
    return {
      exchange,
    };
  },
};
</script>

<style>
</style>