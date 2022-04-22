<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in eventList" :key="item.event_id">
        <div class="event-item">
          <van-image class="image" :src="item.screenshot" />
          <div class="event-content">
            <div class="event-title">{{ item.title }}</div>
            <div class="event-time">{{ item.event_start_time }}</div>
            <div class="event-city">{{ item.city }}</div>
            <div class="event-join">报名参加</div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import api from "../api/juejinapi";
import { useStore } from "vuex";
export default {
  props: {
    city: {
      type: String,
      required: true,
    },
  },
  setup(props, ctx) {
    const state = reactive({
      refreshing: false,
      loading: false,
      finished: false,
      eventList: [],
      cursor: 0,
    });

    const store = useStore();
    const { city } = props;
    const onRefresh = () => {
      state.finished = false; //清空列表数据，重新加载
      state.loading = true;
      state.refreshing = true;
      onLoad();
    };

    store.commit("setRefresh", onRefresh);

    const onLoad = () => {
      api.eventList(state.cursor, city).then((res) => {
        if (state.refreshing) {
          state.eventList = [];
          state.refreshing = false;
        }
        console.log(res);
        state.cursor = res.cursor;
        state.eventList.push(...res.data);
        state.loading = false;
      });
    };
    return {
      ...toRefs(state),
      onRefresh,
      onLoad,
    };
  },
};
</script>

<style lang="less">
.event-item {
  padding: 10px;
  margin-bottom: 15px;
  padding-top: 0;
  background-color: #fff;
  box-sizing: border-box;
  & .van-image {
    width: 100%;
    height: 200px;
    padding-top: 10px;
    & img {
      border-radius: 5px;
    }
  }
  & .event-content {
    position: relative;
    padding: 10px;
    & .event-title {
      font-weight: bold;
      font-size: 16px;
    }

    & .event-time,
    & .event-city {
      font-size: 12px;
      color: #8a919f;
    }
    & .event-join {
      position: absolute;
      right: 10px;
      top: 50px;
      padding: 5px 10px;
      background-color: #1e80ff;
      color: #fff;
      border-radius: 30px;
    }
  }
}
.van-cell {
  background: none;
}
</style>
