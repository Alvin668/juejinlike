<template>
  <van-nav-bar title="课程" left-arrow @click-left="toBack" />
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in courseList" :key="item.booklet_id">
        <div class="course-item">
          <van-image class="image" :src="item.base_info.cover_img" />
          <div class="course-content">
            <div class="course-title">{{ item.base_info.title }}</div>
            <div class="course-author">{{ item.user_info.user_name }}</div>
            <div class="course-info">
              {{ item.base_info.section_count }}小节
              {{ item.base_info.buy_count }}人阅读
            </div>
          </div>
          <div class="course-price">
            <div>¥{{ item.base_info.price / 100 }}</div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";
import api from "../api/juejinapi";
export default {
  setup() {
    const state = reactive({
      refreshing: false,
      loading: false,
      finished: false,
      courseList: [],
      cursor: "0",
    });
    const router = useRouter();

    const toBack = () => {
      router.back();
    };
    const onRefresh = () => {
      state.finished = false; //清空列表数据，重新加载
      state.loading = true;
      state.refreshing = true;
      onLoad();
    };

    const onLoad = () => {
      api.courseList(state.cursor).then((res) => {
        if (state.refreshing) {
          state.courseList = [];
          state.refreshing = false;
        }
        console.log(res);
        state.cursor = res.cursor;
        state.courseList.push(...res.data);
        state.loading = false;
      });
    };
    return {
      ...toRefs(state),
      toBack,
      onRefresh,
      onLoad,
    };
  },
};
</script>

<style lang="less">
.course-item {
  box-sizing: border-box;
  padding: 10px;
  background-color: #fff;
  display: flex;
  margin-bottom: 15px;
  & .image {
    width: 100px;
    height: 120px;
    & img {
      border-radius: 5px;
    }
  }

  & .course-content {
    margin-left: 15px;
    & .course-title {
      font-weight: bold;
      font-size: 16px;
    }
    & .course-info,
    & .course-author {
      font-size: 12px;
      color: #8a919f;
      margin-top: 10px;
    }
  }

  & .course-price {
    width: 80px;
    height: 120px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    & > div {
      color: #ed7b11;
      background-color: #e8f3ff;
      border-radius: 30px;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>
