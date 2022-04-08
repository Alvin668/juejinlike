<!--App.vue-->
<template>
  <div>
    <router-view />
    <j-bottom />
  </div>
</template>
<script>
import JBottom from "./components/JBottom.vue";

export default {
  components: { JBottom },
};
</script>

<style lang="less">
html,
body {
  background-color: #f4f4f4;
}
</style>
