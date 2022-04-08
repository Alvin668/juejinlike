<template>
  <van-nav-bar
    left-arrow
    left-text="优秀作者榜"
    right-text="排序规则"
    @click-left="backHome"
  />
  <van-tabs
    color="#1e80ff"
    v-model:active="active"
    sticky
    @click-tab="clickTab"
  >
    <van-tab
      v-for="item in categoryList"
      :key="item.category_id"
      :title="item.category_name"
      :name="item.category_id"
    >
      <div class="tab-list-content">
        <van-pull-refresh
          v-model="refreshing"
          @refresh="onRefresh(item.category_id)"
        >
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad(item.category_id)"
          >
            <van-cell v-for="item in authorList" :key="item.user_id">
              <div class="author-list">
                <van-image
                  round
                  :src="item.avatar_large"
                  @click="toAuthorHome(item.user_id)"
                />
                <div class="author-item" @click="toAuthorHome(item.user_id)">
                  <div>
                    <span class="name">{{ item.user_name }}</span>
                    <van-image :src="level[item.level]" />
                  </div>
                  <div class="info">
                    {{ item.job_title }} @ {{ item.company }}
                  </div>
                  <div class="describ">
                    获得 {{ item.got_digg_count }} 赞 ·
                    {{ item.got_view_count }} 阅读
                  </div>
                </div>
                <div class="follow">
                  <van-button
                    v-show="!item.isfollowed"
                    round
                    plain
                    size="mini"
                    type="primary"
                    :id="`follow${item.user_id}`"
                    @click="follow(item.user_id)"
                    >+ 关注</van-button
                  >
                  <van-button
                    v-show="item.isfollowed"
                    type="success"
                    size="mini"
                    round
                    :id="`unfollow${item.user_id}`"
                    @click="cancelFollow(item.user_id)"
                    >已关注</van-button
                  >
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </div>
    </van-tab>
  </van-tabs>
</template>

<script>
import { reactive, toRefs } from "vue";
import http from "../api/http";
import api from "../api/juejinapi";
import { useRouter } from "vue-router";
export default {
  setup(props, context) {
    const state = reactive({
      loading: false,
      finished: false,
      refreshing: false,
      authorList: [],
      categoryList: [],
      active: 0,
      level: {
        1: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/636691cd590f92898cfcda37357472b8.svg",
        2: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/f597b88d22ce5370bd94495780459040.svg",
        3: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e108c685147dfe1fb03d4a37257fb417.svg",
        4: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/2c3fafd535a0625b44a5a57f9f536d77.svg",
        5: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/f8d51984638784aff27209d38b6cd3bf.svg",
        6: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/74bd93adef7feff4fee26d08c0845b4f.svg",
      },
    });
    const router = useRouter();
    api.queryCategoryBriefs().then((res) => {
      state.categoryList = res.data;
      state.categoryList.unshift({
        category_id: "-999",
        category_name: "热榜",
      });
    });

    let pageNo = 0;
    const onLoad = function (cate_id) {
      http
        .post("/juejin/recommend", {
          limit: 20,
          cate_id: cate_id,
          cursor: pageNo,
        })
        .then((res) => {
          if (state.refreshing) {
            state.authorList = [];
            state.refreshing = false;
          }
          state.authorList.push(...res.data);
          state.loading = false;

          if (pageNo >= 50) {
            //只加载50页（1000条）数据
            state.finished = true;
          }
          pageNo += 20;
        });
    };

    const onRefresh = function (cate_id) {
      pageNo = 0; //从第一页重新加载
      state.finished = false; //清空列表数据，重新加载
      state.loading = true;
      onLoad(cate_id);
    };

    const clickTab = function (params) {
      state.authorList = [];
      onRefresh(params.name);
    };

    const backHome = function (params) {
      router.push("/0");
    };

    const follow = function (userId) {
      api.follow(userId).then((res) => {
        const author = state.authorList.filter(
          (item) => item.user_id === userId
        );
        author[0].isfollowed = true;
      });
    };
    const cancelFollow = function (userId) {
      api.cancelFollow(userId).then((res) => {
        const author = state.authorList.filter(
          (item) => item.user_id === userId
        );
        author[0].isfollowed = false;
      });
    };

    const toAuthorHome = function (userId) {
      router.push(`/authorHome/${userId}`);
    };

    return {
      ...toRefs(state),
      onLoad,
      onRefresh,
      clickTab,
      backHome,
      follow,
      cancelFollow,
      toAuthorHome,
    };
  },
};
</script>

<style lang="less">
.tab-list-content {
  margin-top: 10px;
  padding-bottom: 50px;
}
.author-list {
  display: flex;
  padding: 5px;
  height: 75px;
  align-items: center;
  & img {
    width: 40px;
    height: 40px;
  }
  & .author-item {
    margin-left: 10px;
    width: 245px;
    & img {
      width: 23px;
      height: 14px;
    }
    & .name {
      font-size: 18px;
      font-weight: 500;
      color: #393939;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & .info {
      font-size: 14px;
      font-weight: 400;
      color: #b9c0c8;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & .describ {
      color: #777d81;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  & .follow {
  }
}
</style>