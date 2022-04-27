<template>
  <van-nav-bar title="创作者中心" left-arrow @click-left="toBack" />
  <div class="box profile-box">
    <van-image :src="userInfo.avatar_large" round class="avatar" />
    <div class="user-info">
      {{ userInfo.user_name }}
      <van-image
        src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/74bd93adef7feff4fee26d08c0845b4f.svg"
      />
    </div>
    <div class="home-page">
      个人主页
      <van-icon name="arrow" />
    </div>
  </div>
  <div class="box content-box">
    <div class="header">
      <span class="title">内容数据<van-icon name="question-o" /></span>
      <span class="more">更多内容 <van-icon name="arrow" /></span>
    </div>
    <div class="content">
      <div class="content-item">
        <div class="item-title">
          总文章数
          <van-icon name="arrow" style="margin-left: 5px" />
        </div>
        <div class="item-count">{{ centerCount.article_cnt.all_cnt }}</div>
      </div>
      <div class="content-item">
        <div class="item-title">
          总专栏数
          <van-icon name="arrow" style="margin-left: 5px" />
        </div>
        <div class="item-count">{{ centerCount.column_cnt.all_cnt }}</div>
      </div>
      <div class="content-item">
        <div class="item-title">
          总沸点数
          <van-icon name="arrow" style="margin-left: 5px" />
        </div>
        <div class="item-count">{{ centerCount.short_msg_cnt.all_cnt }}</div>
      </div>
      <div class="content-item2">
        <div class="item-title">文章展现数</div>
        <div class="item-count">
          {{ cardInfo.datas.all_article_display.cnt }}
        </div>
        <div class="item-before">
          较前日<span style="color: #1e80ff">{{
            cardInfo.datas.all_article_display.than_before
          }}</span>
        </div>
      </div>
      <div class="content-item2">
        <div class="item-title">文章阅读数</div>
        <div class="item-count">{{ cardInfo.datas.all_article_view.cnt }}</div>
        <div class="item-before">
          较前日<span style="color: #1e80ff">{{
            cardInfo.datas.all_article_view.than_before
          }}</span>
        </div>
      </div>
      <div class="content-item2">
        <div class="item-title">文章收藏数</div>
        <div class="item-count">
          {{ cardInfo.datas.all_article_collect.cnt }}
        </div>
        <div class="item-before">
          较前日<span style="color: #1e80ff">{{
            cardInfo.datas.all_article_collect.than_before
          }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="box content-box">
    <div class="header">
      <span class="title">关注者数据<van-icon name="question-o" /></span>
      <span class="more">更多内容 <van-icon name="arrow" /></span>
    </div>
    <div class="content">
      <div class="content-item2">
        <div class="item-title">总关注者</div>
        <div class="item-count">{{ trend.datas.all_follower.cnt }}</div>
        <div class="item-before">
          较前日<span style="color: #1e80ff">{{
            trend.datas.all_follower.than_before
          }}</span>
        </div>
      </div>
      <div class="content-item2">
        <div class="item-title">活跃关注者</div>
        <div class="item-count">{{ trend.datas.incr_active_follower.cnt }}</div>
        <div class="item-before">
          较前日<span style="color: #1e80ff">{{
            trend.datas.incr_active_follower.than_before
          }}</span>
        </div>
      </div>
      <div class="content-item2">
        <div class="item-title">净增关注</div>
        <div class="item-count">{{ trend.datas.incr_do_follower.cnt }}</div>
        <div class="item-before">
          较前日<span style="color: #1e80ff">{{
            trend.datas.incr_do_follower.than_before
          }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="box content-box" style="padding-bottom: 130px">
    <div class="header">
      <span class="title">创作活动<van-icon name="question-o" /></span>
      <span class="more">更多内容 <van-icon name="arrow" /></span>
    </div>
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerList" :key="item.id">
          <van-image
            :src="item.screenshot"
            style="width: 100%; height: 150px"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import api from "../api/juejinapi";
export default {
  name: "",
  props: {},
  components: {},
  setup() {
    const state = reactive({
      userInfo: {},
      centerCount: {},
      cardInfo: {},
      trend: {},
      bannerList: [],
    });
    const router = useRouter();
    const toBack = () => {
      router.back();
    };

    api.getUserinfo().then((res) => {
      state.userInfo = res.data;
    });

    api.centerCount().then((res) => {
      state.centerCount = res.data;
    });
    api
      .card([
        "all_follower",
        "all_article_display",
        "all_article_view",
        "all_article_digg",
        "all_article_comment",
        "all_article_collect",
      ])
      .then((res) => {
        state.cardInfo = res.data;
      });
    api
      .card([
        "all_follower",
        "incr_active_follower",
        "incr_do_follower",
        "incr_undo_follower",
        "incr_follower",
      ])
      .then((res) => {
        state.trend = res.data;
      });
    api.bannerList().then((res) => {
      state.bannerList = res.data;
      console.log(res.data);
    });

    return {
      ...toRefs(state),
      toBack,
    };
  },
};
</script>
<style lang="less" scoped>
.box {
  background-color: #fff;
  box-sizing: border-box;
  margin-top: 10px;
  padding: 10px;
}
.profile-box {
  display: flex;
  & .avatar {
    width: 60px;
    height: 60px;
  }
  & .user-info {
    flex: 1;
    margin-left: 20px;
    color: #1d2129;
    font-size: 16px;
    font-weight: 500;
  }
  & .home-page {
    width: 80px;
    color: #86909c;
    font-size: 14px;
    font-weight: 400;
  }
}

.content-box {
  & .header {
    position: relative;
    & .title {
      font-weight: 550;
      font-size: 16px;
    }

    & .more {
      color: #86909c;
      font-size: 14px;
      font-weight: 400;
      float: right;
    }
  }

  & .content {
    display: grid;
    grid-template-columns: repeat(auto-fill, 108px);
    justify-content: space-between;
    grid-gap: 15px;
    flex-wrap: wrap;
    margin-top: 10px;
    & .content-item {
      position: relative;
      background-color: #f4f4f4;
      padding: 10px;
      height: 50px;
      & .item-title {
        font-size: 14px;
        color: #86909c;
      }

      & .item-count {
        position: absolute;
        bottom: 10px;
        font-weight: bold;
        font-size: 16px;
      }
    }
    & .content-item2 {
      position: relative;
      padding: 10px;
      border: 1px solid #f4f4f4;
      height: 70px;
      border-radius: 5px;
      & .item-title {
        font-size: 15px;
        color: #86909c;
      }

      & .item-count {
        position: absolute;
        bottom: 30px;
        font-weight: bold;
        font-size: 18px;
      }
      & .item-before {
        font-size: 10px;
        position: absolute;
        bottom: 10px;
      }
    }
  }
}
</style>
