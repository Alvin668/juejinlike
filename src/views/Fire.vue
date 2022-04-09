<template>
  <van-tabs sticky color="#1e80ff" title-active-color="#1e80ff">
    <van-tab title="发现">
      <div class="tab-content">
        <pin-list url="/juejin/recommend_pins" />
      </div>
    </van-tab>
    <van-tab title="热榜">
      <div class="tab-content">
        <pin-list url="/juejin/hot_pins" />
      </div>
    </van-tab>
    <van-tab title="关注">
      <div class="tab-content">
        <pin-list url="/juejin/follow_pins" />
      </div>
    </van-tab>
  </van-tabs>
  <div class="publish">
    <van-icon name="edit" />
  </div>
</template>
<script>
import PinList from "./PinList.vue";
export default {
  components: {
    PinList,
  },
};
</script>
<style lang="less">
.publish {
  position: fixed;
  width: 60px;
  height: 60px;
  line-height: 60px;
  font-size: 50px;
  color: #fff;
  border: 2px solid #1e80ff;
  background-color: #1e80ff;
  border-radius: 50%;
  text-align: center;
  bottom: 60px;
  right: 10px;
}
</style>
