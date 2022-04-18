<template>
  <div class="topic-box">
    <div class="topic">
      <van-image :src="topic.topic.icon" />
      <div class="topic-content">
        <div class="topic-title">{{ topic.topic.title }}</div>
        <span class="topic-info"
          >{{ topic.topic.follower_count }}掘友·
          {{ topic.topic.msg_count }}沸点</span
        >
      </div>
    </div>
    <div class="desc">{{ topic.topic.description }}</div>
  </div>
  <div class="topic-notice">
    <div class="notice-title">圈子公告</div>
    <div class="notice-content">
      {{ topic.topic.notice }}
    </div>
  </div>
  <div class="topic-notice">
    <div class="notice-title">圈子管理员</div>
    <div class="notice-content">
      <div class="author" v-for="aut in topic.admin_users" :key="aut.user_id">
        <van-image class="photo" round :src="aut.avatar_large" />
        <div style="display: flex; flex-direction: column; flex: 1">
          <div class="author-title">{{ aut.user_name }}</div>
          <div class="pub-time">{{ aut.job_title }} @ {{ aut.company }}</div>
        </div>
        <div class="follow">
          {{ topic.user_interact.is_follow ? "已关注" : "关注" }}
        </div>
      </div>
    </div>
  </div>
  <div class="topic-notice">
    <div class="notice-title">圈中掘友</div>
    <div class="notice-content">
      <div class="author" v-for="item in followerList" :key="item.user_id">
        <van-image class="photo" round :src="item.avatar_large" />
        <div class="author-title">{{ item.user_name }}</div>
        <div class="follow">{{ item.isfollowed ? "已关注" : "关注" }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useRoute } from "vue-router";
import api from "../api/juejinapi";
export default {
  setup() {
    const state = reactive({
      topic: {},
      followerList: [],
    });
    const route = useRoute();
    const { topic_id } = route.params;

    api.queryTopicDetail(topic_id).then((res) => {
      state.topic = res.data;
      console.log(res.data);
    });

    api.followerList("0", topic_id).then((res) => {
      state.followerList = res.data;
    });
    return {
      ...toRefs(state),
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
      width: 60px;
      height: 60px;
    }

    & .topic-content {
      flex: 1;
      margin-left: 20px;
      & .topic-title {
        font-size: 16px;
        font-weight: bold;
      }
      & .topic-info {
        font-size: 14px;
        color: #8a919f;
      }
    }
  }
}
.topic-notice {
  margin-top: 10px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  & .notice-title {
    font-weight: bold;
    font-size: 16px;
  }
  & .notice-content {
    padding: 15px 0;
    word-wrap: break-word;
    & .author {
      display: flex;
      margin-bottom: 15px;
      & .photo {
        width: 35px;
        height: 35px;
        display: inline-block;
      }
      & .author-title {
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        margin-left: 15px;
        flex: 1;
      }
      & .pub-time {
        margin-left: 15px;
        color: #8a919f;
      }
      & .follow {
        box-sizing: border-box;
        width: 60px;
        padding: 10px 0;
        color: #007fff;
        background-color: #eaf2ff;
        margin-left: 10px;
        text-align: center;
      }
    }
  }
}
</style>
