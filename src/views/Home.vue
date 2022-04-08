<template>
  <div>
    <van-nav-bar>
      <template #left>
        <van-image :src="image" round />
      </template>
      <template #title>
        <div @click="search">
          <!--新增内容-->
          <van-search placeholder="搜索稀土掘金" disabled />
        </div>
      </template>
      <template #right>
        <div v-if="todayStatus" @click="checkIn">
          <van-icon name="sign" size="28" />已签
        </div>
        <div v-else @click="checkIn">
          <van-icon name="notes-o" size="24" /><van-badge dot>签到</van-badge>
        </div>
      </template>
    </van-nav-bar>
    <van-tabs
      color="#1e80ff"
      sticky
      v-model:active="active"
      @click-tab="clickTab"
    >
      <van-tab title="关注">
        <div class="tab-list-content">
          <van-nav-bar style="margin-bottom: 10px">
            <template #left>
              <div style="font-weight: bold">发现更多优秀作者</div>
            </template>
            <template #right>
              <div
                style="margin-top: 5px; margin-right: -5px"
                v-for="item in authorList"
                :key="item.user_id"
                @click="toAuthorList"
              >
                <van-image
                  round
                  width="30px"
                  height="30px"
                  :src="item.avatar_large"
                />
              </div>
              <van-icon
                name="arrow"
                color="#262626"
                style="margin-left: 15px; font-weight: bold"
              />
            </template>
          </van-nav-bar>
          <j-list url="/juejin/recommend_follow_feed" />
        </div>
      </van-tab>
      <van-tab title="推荐" title-active-color="#1e80ff">
        <div class="tab-list-content">
          <van-swipe class="hot-swipe" indicator-color="#39a9ed">
            <van-swipe-item>
              <div class="article-container">
                <div class="hot-bang">
                  <van-icon name="fire-o" color="#ee0a24" />热榜
                </div>
                <div class="hot-tag">
                  <van-tag type="primary" round>文章</van-tag>
                </div>
              </div>
              <div
                class="article-container"
                v-for="(art, $index) in hotArticles"
                :key="art.item_info.article_id"
              >
                <div class="icon">
                  <div :class="'hot' + ($index + 1)">{{ $index + 1 }}</div>
                </div>
                <div class="title">
                  {{ art.item_info.article_info.title }}
                </div>
                <div class="hot">
                  {{ art.item_info.article_info.view_count }}热度
                </div>
              </div>
            </van-swipe-item>
            <van-swipe-item>
              <div class="article-container">
                <div class="hot-bang">
                  <van-icon name="fire-o" color="#ee0a24" />热榜
                </div>
                <div class="hot-tag">
                  <van-tag type="success" round>作者</van-tag>
                </div>
              </div>
              <div class="author-container">
                <div
                  class="author"
                  v-for="aut in hotAuthors"
                  :key="aut.user_id"
                >
                  <van-image
                    round
                    width="40px"
                    height="40px"
                    :src="aut.avatar_large"
                  />
                  <div class="info">
                    <div class="title">{{ aut.user_name }}</div>
                    <div class="desc">
                      {{ aut.job_title }} @{{ aut.company }}
                    </div>
                  </div>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="tab-list-content">
          <j-list
            url="/juejin/recommend_all_feed"
            :limit="20"
            :sort_type="200"
          />
        </div>
      </van-tab>
      <!-- <van-tab title="热榜">
        <div class="tab-list-content">热榜列表</div>
      </van-tab> -->
      <van-tab
        v-for="item in categoryList"
        :key="item.category_id"
        :title="item.category_name"
      >
        <div class="tab-list-content">
          <j-tags
            url="/juejin/recommend_tag_list"
            :cateId="item.category_id"
            :categoryName="item.category_url"
          ></j-tags>
          <j-list
            url="/juejin/recommend_cate_feed"
            :cateId="item.category_id"
            :limit="20"
            :sort_type="200"
          />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// @ is an alias to /src

import image from "../assets/images/logo.svg";
import { reactive, toRefs, onMounted } from "vue";
import api from "../api/juejinapi";
import { useRouter, useRoute } from "vue-router";
import JList from "./JList.vue";
import JTags from "./JTags.vue";
import { useStore } from "vuex";

export default {
  name: "Home",
  components: { JList, JTags },
  setup() {
    const store = useStore();
    const route = useRoute();
    const state = reactive({
      active:
        Number(route.params.active) >= 0 ? Number(route.params.active) : 1,
      categoryList: [],
      todayStatus: false,
      hotArticles: [],
      hotAuthors: [],
      loading: false,
      finished: false,
      refreshing: false,
      recommendList: [],
      authorList: [],
    });
    const router = useRouter();

    api
      .queryCategoryBriefs()
      .then((res) => {
        state.categoryList = res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    api.getTodayStatus().then((res) => {
      state.todayStatus = res.data;
    });

    api.recommendAllFeed(0, 3, 3).then((res) => {
      state.hotArticles = res.data.filter((item) => item.item_type === 2);
    });

    api.recommend(2, "", 0).then((res) => {
      state.hotAuthors = res.data;
    });
    api.recommend(5, "", 0).then((res) => {
      state.authorList = res.data.filter((item) => item.isfollowed === false);
    });

    const checkIn = function () {
      if (state.todayStatus) {
        router.push("/checkin");
        return;
      }
      api
        .checkIn()
        .then((res) => {
          if (res.err_no == 0 && res.data) {
            state.todayStatus = true;
            router.push("/luck");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const search = function () {
      router.push("/search");
    };

    const toAuthorList = function () {
      router.push("/authorlist");
    };
    onMounted(() => {
      state.active =
        Number(route.params.active) >= 0 ? Number(route.params.active) : 1;
    });
    if (state.active == 1) {
      store.commit("setUrl", "/juejin/recommend_all_feed");
    }
    const clickTab = function (tab) {
      if (tab.name === "关注") {
        store.commit("setUrl", "/juejin/recommend_follow_feed");
      } else if (tab.name === "推荐") {
        store.commit("setUrl", "/juejin/recommend_all_feed");
      } else {
        store.commit("setUrl", "/juejin/recommend_cate_feed");
      }
    };
    return {
      ...toRefs(state),
      image,
      search,
      checkIn,
      toAuthorList,
      clickTab,
    };
  },
};
</script>
<style lang="less">
.van-search {
  background-color: #f4f4f4;
  padding: 0 !important;
}
.van-search__content {
  background: #f4f4f4 !important;
  border-radius: 8px !important;
}
.tab-list-content {
  margin-top: 10px;
  & .hot-swipe {
    & .van-swipe-item {
      height: 140px;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 10px;
    }
  }
  & .article-container {
    display: flex;
    height: 30px;
    line-height: 30px;
    & .hot-bang {
      font-size: 20px;
      font-weight: bold;
      margin-left: 10px;
      font-family: cursive;
    }
    & .hot-tag {
      margin-left: 8px;
    }
    & .icon {
      box-sizing: border-box;
      width: 30px;
      height: 30px;
      padding: 5px;
      & div:nth-child(1) {
        box-sizing: border-box;
        width: 20px;
        height: 20px;
        line-height: 20px;

        color: #fff;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        border-radius: 5px;
      }
      & .hot1 {
        background-color: rgb(255, 74, 63);
      }

      & .hot2 {
        background-color: rgb(255, 132, 65);
      }
      & .hot3 {
        background-color: rgb(255, 199, 0);
      }
    }

    & .title {
      margin-left: 5px;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 70%;
      white-space: nowrap;
    }
    & .hot {
      font-size: 12px;
      color: #86909c;
      flex: 1;
    }
  }

  & .author-container {
    display: flex;
    padding: 10px;
    & .author {
      display: flex;
      border-radius: 10px;
      padding: 10px;
      background: #f2f3f5;
      flex: 1 1;
      & .info {
        margin-left: 10px;
        height: 60px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100px;
        & .title {
          height: 20px;
        }
        & .desc {
          height: 20px;
        }
      }
    }
    & .author:nth-child(2) {
      margin-left: 20px;
    }
  }
}
</style>