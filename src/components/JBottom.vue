<!--JBottom.vue-->
<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="fire-o" to="/fire">沸点</van-tabbar-item>
    <van-tabbar-item icon="browsing-history-o" to="/find">发现</van-tabbar-item>
    <van-tabbar-item icon="coupon-o" to="/course">课程</van-tabbar-item>
    <van-tabbar-item icon="user-circle-o" to="/profile">我</van-tabbar-item>
  </van-tabbar>
</template>

<script>
//JBottom.vue
import { reactive, toRefs } from "vue";
export default {
  setup() {
    const state = reactive({ active: 0 });
    return {
      ...toRefs(state),
    };
  },
};
</script>
