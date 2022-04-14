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
    <van-tab title="圈子广场">
      <div class="topic-square">
        <div class="square-nav">
          <van-sidebar v-model="sideBarIndex">
            <van-sidebar-item title="推荐圈子" @click="lodeTopicsByCate(0)" />
            <van-sidebar-item
              :title="cate.category_name"
              v-for="cate in topicCategories"
              :key="cate.category_id"
              @click="lodeTopicsByCate(cate.category_id)"
            />
          </van-sidebar>
        </div>
        <div class="topic-list">
          <div class="topic-box">
            <div
              class="topic"
              v-for="top in topicListByCate"
              :key="top.topic_id"
            >
              <van-image :src="top.topic.icon" />
              <div class="topic-content">
                <div class="topic-title">{{ top.topic.title }}</div>
                <span class="topic-info"
                  >{{ top.topic.follower_count }}掘友·{{
                    top.topic.msg_count
                  }}沸点</span
                >
              </div>
              <div
                class="topic-join"
                :class="{ 'join-in': !top.user_interact.is_follow }"
              >
                <div class="join" v-if="top.user_interact.is_follow">
                  已加入
                </div>
                <div class="join" v-else>加入</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-tab>
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
      sideBarIndex: 0,
      topicCategories: [],
      topicListByCate: [],
    });
    const route = useRoute();
    state.active = Number(route.params.active) || 0;
    const showPopup = () => {
      state.show = true;
    };

    const loadMyTopics = () => {
      api.myTopics().then((res) => {
        state.topicList = res.data;
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

    api.queryItemCategories().then((res) => {
      state.topicCategories = res.data;
    });

    const lodeTopicsByCate = (cate_id) => {
      if (cate_id == 0) {
        api.listByRec().then((res) => {
          state.topicListByCate = res.data;
        });
      } else {
        api.listByCateCursor(cate_id, "0", 30).then((res) => {
          state.topicListByCate = res.data;
        });
      }
    };

    lodeTopicsByCate(0, 0);
    return {
      ...toRefs(state),
      showPopup,
      closePop,
      cancelFollow,
      lodeTopicsByCate,
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

.topic-square {
  display: flex;
  background-color: #fff;
  padding-top: 20px;
  padding-bottom: 30px;
  & .square-nav {
    width: 100px;
    & .van-sidebar {
      width: 100%;
    }
  }
  & .topic-list {
    flex: 1;
    & .topic-box {
      padding: 0;
      & .topic {
        & img {
          width: 60px;
          height: 60px;
        }
      }
      & .topic-title {
        font-size: 14px;
        font-weight: bold;
      }
      & .topic-info {
        font-size: 12px;
        color: #8a919f;
      }
    }
    & .topic-join {
      width: 50px;
      text-align: center;
      box-sizing: border-box;
      border: 1px solid #f4f4f4;
      background-color: #f4f4f4;
      border-radius: 2px;
      padding: 5px;
    }

    & .topic-join.join-in {
      color: #1e80ff;
      border: 1px solid #eaf2ff;
      background-color: #eaf2ff;
    }
  }

  & .van-sidebar-item--select:before {
    background-color: #1e80ff;
    height: 60px;
  }
}
</style>
