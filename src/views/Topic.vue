<template>
  <van-tabs
    sticky
    color="#1e80ff"
    title-active-color="#1e80ff"
    v-model:active="active"
  >
    <van-tab title="我的圈子">我加入的一堆圈子</van-tab>
    <van-tab title="圈子广场">广场上的一堆圈子</van-tab>
  </van-tabs>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const active = ref(0);
    const route = useRoute();
    active.value = Number(route.params.active) || 0;

    return {
      active,
    };
  },
};
</script>

<style>
</style>