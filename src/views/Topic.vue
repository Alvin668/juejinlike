<template>
  <van-tabs
    sticky
    color="#1e80ff"
    title-active-color="#1e80ff"
    v-model:active="active"
    @click-tab="tabChange"
  >
    <van-tab title="我的圈子">
      <topic-list :data="topicList" :isJoin="true" />
    </van-tab>
    <van-tab title="圈子广场">
      <div class="square-box">
        <div class="topic-search" @click="showSearch">搜索圈子</div>
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
            <topic-list :data="topicList" :isJoin="false" />
          </div>
        </div>
      </div>
      <van-popup v-model:show="show" position="top" @closed="closePop">
        <div class="search-result">
          <div class="topic-search">
            <van-field
              v-model="search"
              placeholder="搜索圈子"
              @update:model-value="valueChange"
            />
          </div>
          <topic-list :data="topicList" :isJoin="false" />
        </div>
      </van-popup>
    </van-tab>
  </van-tabs>
</template>
<script>
import { reactive, ref, toRefs } from "vue";
import { useRoute } from "vue-router";
import api from "../api/juejinapi";
import TopicList from "./TopicList.vue";
export default {
  components: { TopicList },
  setup() {
    const state = reactive({
      active: 0,
      topicList: [],
      sideBarIndex: 0,
      topicCategories: [],
      show: false,
      search: "",
    });
    const route = useRoute();
    state.active = Number(route.params.active) || 0;

    const loadMyTopics = () => {
      api.myTopics().then((res) => {
        console.log(res);
        state.topicList = res.data;
      });
    };

    api.queryItemCategories().then((res) => {
      state.topicCategories = res.data;
    });

    const lodeTopicsByCate = (cate_id) => {
      if (cate_id == 0) {
        api.listByRec().then((res) => {
          state.topicList = res.data;
        });
      } else {
        api.listByCateCursor(cate_id, "0", 30).then((res) => {
          state.topicList = res.data;
        });
      }
    };

    const tabChange = (tab) => {
      if (tab.name === 0) {
        loadMyTopics();
      } else {
        lodeTopicsByCate(0, 0);
      }
    };

    if (state.active === 0) {
      loadMyTopics();
    } else {
      lodeTopicsByCate(0, 0);
    }

    const showSearch = () => {
      state.show = true;

      state.topicList = [];
    };
    const valueChange = () => {
      api.listBySearchCursor("0", state.search, 30).then((res) => {
        state.topicList = res.data;
      });
    };
    const closePop = () => {
      lodeTopicsByCate(0, 0);
    };
    return {
      ...toRefs(state),
      lodeTopicsByCate,
      showSearch,
      tabChange,
      valueChange,
      closePop,
    };
  },
};
</script>

<style lang="less">
.square-box {
  background-color: #fff;
  padding-top: 20px;
}
.topic-square {
  display: flex;
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
  }

  & .van-sidebar-item--select:before {
    background-color: #1e80ff;
    height: 60px;
  }
}
.topic-search {
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #f4f4f4;
  height: 40px;
  line-height: 40px;
  margin: 0 10px;
  padding-left: 10px;
  color: #8a919f;
}
.search-result {
  padding: 10px;
  height: 500px;
  & .van-cell {
    background-color: #f4f4f4;
    line-height: 28px;
    top: 5px;
  }
}
</style>
