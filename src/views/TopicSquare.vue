<template>
  <van-nav-bar title="话题广场" left-arrow @click-left="toBack" />
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="top in topicList" :key="top.theme.theme_id">
        <div class="topic-item">
          <div class="topic-title">
            #{{ top.theme.name }}#
            <img
              v-if="top.theme.is_rec"
              data-v-5287fbd5=""
              src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/rec.476fe07.png"
              alt=""
              class="tag"
            />
            <img
              v-if="top.theme.is_lottery"
              data-v-5287fbd5=""
              src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/lottery.b40d80b.png"
              alt=""
              class="tag"
            />
          </div>
          <div class="content-box">
            <div class="content">
              <div>
                {{ top.theme.brief }}
              </div>
              <div class="footer">
                {{ top.theme.user_cnt }}位掘友已发布精彩内容
                {{ top.theme.view_cnt }}人阅读
              </div>
            </div>
            <van-image class="image" :src="top.theme.cover" />
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
      topicList: [],
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
      console.log(state.cursor);
      api.queryTopicSquare(state.cursor).then((res) => {
        if (state.refreshing) {
          state.topicList = [];
          state.refreshing = false;
        }
        console.log(res);
        state.cursor = res.cursor;
        state.topicList.push(...res.data);
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
.topic-item {
  height: 100px;
  margin-top: 10px;
  background-color: #fff;
  padding: 15px;

  & .topic-title {
    font-size: 16px;
    font-weight: bold;
    & .tag[data-v-5287fbd5] {
      width: 16px;
      height: 16px;
      margin: 0 2px;
    }
  }

  & .content-box {
    display: flex;
    margin-top: 10px;

    & .content {
      flex: 1;
      word-break: break-all;
      position: relative;
      & > div:first-child {
        height: 50px;
        overflow: hidden;
      }
      & .footer {
        position: absolute;
        bottom: 2px;
        color: #8a919f;
        font-size: 12px;
      }
    }
    & .image {
      margin-left: 10px;
      width: 80px;
      height: 80px;
      & img {
        border-radius: 5px;
      }
    }
  }
}
.van-cell {
  background: none;
}
</style>
