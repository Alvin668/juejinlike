<template>
  <div class="find-box">
    <div class="search-box" @click="toSearch">
      <div class="search-input">搜索稀土掘金</div>
    </div>
    <div class="swiper-box">
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="ad in advList" :key="ad.advert_id">
          <a :href="ad.url"> <img :src="ad.picture" /></a>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="category-box">
      <div class="category-item">
        <van-icon name="gem-o" size="30px" style="color: gold"></van-icon>
        <span>招聘</span>
      </div>
      <div class="category-item" @click="toTopic">
        <van-icon
          name="comment-circle-o"
          size="30px"
          style="color: gold"
        ></van-icon>
        <span>话题</span>
      </div>
      <div class="category-item">
        <van-icon name="flag-o" size="30px" style="color: gold"></van-icon>
        <span>字学</span>
      </div>
      <div class="category-item" @click="toActivity">
        <van-icon name="bullhorn-o" size="30px" style="color: gold"></van-icon>
        <span>活动</span>
      </div>
    </div>
    <div class="bang-box">
      <div class="author-bang">
        <div class="bang-title">
          <span class="title">文章榜</span>
          <span class="sub-title">每日更新</span>
        </div>
        <div class="bang-img" @click="toArticleList">
          <van-image
            v-for="item in 3"
            :key="item"
            src="https://p9-passport.byteacctimg.com/img/user-avatar/4eb96a510ba31abc55e029bd74da2be0~300x300.image"
            round
          ></van-image>
        </div>
      </div>
      <div class="author-bang">
        <div class="bang-title">
          <span class="title">作者榜</span>
          <span class="sub-title">每日更新</span>
        </div>
        <div class="bang-img" @click="toAuthorList">
          <van-image
            v-for="item in authorList"
            :key="item.user_id"
            :src="item.avatar_large"
            round
          ></van-image>
        </div>
      </div>
    </div>
    <div class="recommend-box">
      <div class="title-box">
        <span class="title">推荐技术团队</span>
        <span class="all-team" @click="toAuthorList">全部技术团队></span>
      </div>
      <div class="team-box">
        <div
          class="team"
          v-for="item in teamList"
          :key="item.user_id"
          @click="toAuthorHome(item.user_id)"
        >
          <van-image :src="item.avatar_large"></van-image>
        </div>
      </div>
    </div>
    <div class="hot-articles-box">
      <div class="hot-bang">
        <van-icon name="fire-o" color="#ee0a24" />热门文章
      </div>
      <j-list url="/juejin/recommend_all_feed" :limit="20" :sort_type="200" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";
import JList from "./JList.vue";
import api from "../api/juejinapi";
export default {
  components: {
    JList,
  },
  setup() {
    const state = reactive({
      advList: [],
      authorList: [],
      teamList: [],
    });
    const router = useRouter();
    const toSearch = () => {
      router.push("/search");
    };

    api.queryAdverts().then((res) => {
      state.advList = res.data;
    });

    const toTopic = () => {
      router.push("/topic");
    };
    const toActivity = () => {
      router.push("/activity");
    };

    api.recommend(3, "", "0").then((res) => {
      state.authorList = res.data;
      console.log(res.data);
    });

    api.recommend(5, "", "0").then((res) => {
      state.teamList = res.data;
      console.log(res.data);
    });

    const toAuthorList = () => {
      router.push("/authorlist");
    };

    const toAuthorHome = (uid) => {
      router.push(`/authorhome/${uid}`);
    };

    const toArticleList = () => {
      router.push("/articlelist");
    };
    return {
      ...toRefs(state),
      toSearch,
      toTopic,
      toActivity,
      toArticleList,
      toAuthorList,
      toAuthorHome,
    };
  },
};
</script>

<style lang="less">
.find-box {
  box-sizing: border-box;
  & .search-box {
    background-color: #fff;
    padding: 15px;
    & .search-input {
      height: 35px;
      line-height: 38px;
      background-color: #e5e5e5;
      color: #8c8c8c;
      border-radius: 3px;
      padding-left: 10px;
      & .van-cell {
        height: 34px;
        line-height: 38px;
        margin-left: -10px;
        width: auto !important;
        background-color: #e5e5e5;
      }
    }
  }

  & .swiper-box {
    & img {
      width: 100%;
      height: 200px;
    }
  }

  & .category-box {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    margin-top: 10px;
    & .category-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  & .bang-box {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 10px 25px;
    margin-top: 10px;
    & .author-bang {
      display: flex;
      justify-content: space-between;
      & .bang-title {
        display: flex;
        flex-direction: column;
        & .title {
          font-weight: bold;
          font-size: 16px;
        }
        & .sub-title {
          font-size: 12px;
          color: #8c8c8c;
        }
      }
      & .bang-img {
        transform: translateX(20px);
        & img {
          width: 40px;
          height: 40px;
        }

        & .van-image {
          margin-left: -15px;
        }
      }
    }
    & .author-bang:nth-child(2) {
      transform: translateX(-20px);
    }
  }

  & .recommend-box {
    background-color: #fff;
    margin-top: 10px;
    padding: 10px 0;
    overflow: hidden;
    & .team-box {
      display: flex;
      & .team {
        margin-left: 10px;
        & img {
          width: 80px;
          height: 80px;
          border-radius: 5px;
        }
      }
    }
    & .title-box {
      padding: 10px;
      padding-top: 0;
      & .title {
        font-weight: bold;
        font-size: 16px;
      }
      & .all-team {
        color: #1e80ff;
        float: right;
      }
    }
  }

  & .hot-articles-box {
    background-color: #fff;
    margin-top: 10px;
    padding: 10px 0;
    overflow: hidden;
    & .van-icon {
      font-size: 18px;
    }
  }
}
</style>
