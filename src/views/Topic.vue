<template>
  <van-tabs
    sticky
    color="#1e80ff"
    title-active-color="#1e80ff"
    v-model:active="active"
  >
    <van-tab title="我的圈子">
      <div class="topic-box">
        <div class="topic" v-for="item in topicList" :key="item.topic_id">
          <van-image :src="item.topic.icon" />
          <div class="topic-content">
            <div class="topic-title">{{ item.topic.title }}</div>
            <span class="topic-info"
              >{{ item.topic.follower_count }}掘友·{{
                item.topic.msg_count
              }}沸点</span
            >
          </div>
          <div class="topic-opt" @click="showPopup">
            <van-icon name="ellipsis" size="20px" />
          </div>
          <van-popup v-model:show="show" position="bottom">
            <div
              class="cancel-follow"
              @click="cancelFollow(item.topic.topic_id)"
            >
              取消加入
            </div>
            <div class="close" @click="closePop">取消</div>
          </van-popup>
        </div>
      </div>
    </van-tab>
    <van-tab title="圈子广场">广场上的一堆圈子</van-tab>
  </van-tabs>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { useRoute } from "vue-router";
import api from "../api/juejinapi";
export default {
  setup() {
    const state = reactive({
      active: 0,
      topicList: [],
      show: false,
    });
    const route = useRoute();
    state.active = Number(route.params.active) || 0;
    const showPopup = () => {
      state.show = true;
    };

    const loadMyTopics = () => {
      api.myTopics().then((res) => {
        state.topicList = res.data;
        console.log(res.data);
      });
    };

    const closePop = () => {
      state.show = false;
    };

    const cancelFollow = (topic_id) => {
      console.log(topic_id);
      api.cancelFollow(topic_id, 11).then((res) => {
        state.show = false;
        loadMyTopics();
      });
    };
    loadMyTopics();
    return {
      ...toRefs(state),
      showPopup,
      closePop,
      cancelFollow,
    };
  },
};
</script>

<style lang="less">
.topic-box {
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  border-top: 1px solid #f4f4f4;
  & .topic {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f4f4f4;
    padding: 10px;
    & img {
      width: 80px;
      height: 80px;
    }

    & .topic-content {
      flex: 1;
      margin-left: 20px;
      & .topic-title {
        font-size: 18px;
        font-weight: bold;
      }
      & .topic-info {
        font-size: 16px;
        color: #8a919f;
      }
    }

    & .topic-opt {
      width: 20px;
    }
  }

  & .cancel-follow {
    padding: 20px;
    text-align: center;
    color: #1e80ff;
    font-size: 18px;
  }

  & .close {
    padding: 20px;
    text-align: center;
    font-size: 18px;
    background-color: #f4f4f4;
  }
}
</style>
