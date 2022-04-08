<template>
  <van-nav-bar left-arrow @click-left="back" @click-right="search">
    <template #title>
      <div>
        <van-search placeholder="搜索稀土掘金" />
      </div>
    </template>
    <template #right> <van-icon name="search" size="28" />搜索</template>
  </van-nav-bar>
  <van-tabs
    v-model:active="active"
    sticky
    swipeable
    color="#0176fa"
    title-active-color="#0176fa"
  >
    <van-tab v-for="item in categoryList" :key="item.id" :title="item.text">
      <div class="tab-list-content">{{ item.text }}</div>
    </van-tab>
  </van-tabs>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const active = ref(0);
    const categoryList = [
      { id: 0, text: "综合" },
      { id: 2, text: "文章" },
      { id: 12, text: "课程" },
      { id: 9, text: "标签" },
      { id: 1, text: "用户" },
    ];
    const router = useRouter();
    const back = function back() {
      router.push("/");
    };
    const search = function search() {
      console.log("搜索稀土掘金");
    };

    return {
      active,
      back,
      search,
      categoryList,
    };
  },
};
</script>

