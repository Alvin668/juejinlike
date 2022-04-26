<template>
  <div class="tools-box">
    <van-icon name="eye-o" size="20" />
    <van-icon name="bulb-o" size="20" />
    <van-icon name="setting-o" size="20" />
  </div>
  <div class="profile-box">
    <div class="basic-info">
      <van-image :src="userInfo.avatar_large" round />
      <div class="content-box">
        <div class="title">
          <span>{{ userInfo.user_name }}</span>
          <img :src="level[userInfo.level]" />
        </div>
        <div class="tag" @click="badgeWall">
          {{ userInfo.badges ? userInfo.badges.obtain_count : 0 }} 徽章>
        </div>
      </div>
      <div class="home-page">个人主页</div>
    </div>
    <div class="other-info">
      <div>
        <div class="digital">
          {{ userInfo.digg_article_count + userInfo.digg_shortmsg_count }}
        </div>
        <div>点赞</div>
      </div>
      <div>
        <div class="digital">{{ userInfo.collect_set_count }}</div>
        <div>收藏</div>
      </div>
      <div>
        <div class="digital">{{ userInfo.followee_count }}</div>
        <div>关注</div>
      </div>
    </div>
  </div>
  <div class="tags-box">
    <div class="tag-item">
      <div class="icon">
        <van-icon name="checked" size="28" />
      </div>
      <div class="name">
        已签到<span style="color: #1e80ff">{{ days }}天</span>
      </div>
    </div>
    <div class="tag-item">
      <div class="icon">
        <van-icon name="award" size="28" />
      </div>
      <div class="name">幸运转盘</div>
    </div>
    <div class="tag-item">
      <div class="icon">
        <van-icon name="bookmark" size="28" />
      </div>
      <div class="name">收集Bug</div>
    </div>
    <div class="tag-item">
      <div class="icon">
        <van-icon name="gift" size="28" />
      </div>
      <div class="name">福利兑换</div>
    </div>
  </div>
  <div class="creator-center" @click="toCenter('/creatercenter')">
    <div class="header">
      <span class="title">创作者中心</span>
      <span class="arrow">
        <van-icon name="arrow" size="14" />
      </span>
    </div>
    <div class="article-box">
      <div class="info-item">
        <div class="title">文章展现数</div>
        <div class="digital">{{ cardInfo.datas.all_article_display.cnt }}</div>
        <div class="yestday">
          较前日<span style="color: #1e80ff">{{
            cardInfo.datas.all_article_display.than_before
          }}</span>
        </div>
      </div>
      <div class="info-item">
        <div class="title">文章阅读数</div>
        <div class="digital">{{ userInfo.got_view_count }}</div>
        <div class="yestday">
          较前日<span style="color: #1e80ff">{{
            cardInfo.datas.all_article_view.than_before
          }}</span>
        </div>
      </div>
      <div class="info-item">
        <div class="title">文章点赞数</div>
        <div class="digital">{{ userInfo.got_digg_count }}</div>
        <div class="yestday">
          较前日<span style="color: #1e80ff">{{
            cardInfo.datas.all_article_digg.than_before
          }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="more-box">
    <div class="header">更多功能</div>
    <div class="more-item-box">
      <div
        class="more-item"
        v-for="item in tags"
        :key="item.name"
        @click="toCenter(item.url)"
      >
        <van-icon :name="item.icon" size="20" />
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import api from "../api/juejinapi";
import { useRouter } from "vue-router";
export default {
  name: "",
  props: {},
  components: {},
  setup() {
    const state = reactive({
      level: {
        1: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/636691cd590f92898cfcda37357472b8.svg",
        2: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/f597b88d22ce5370bd94495780459040.svg",
        3: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e108c685147dfe1fb03d4a37257fb417.svg",
        4: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/2c3fafd535a0625b44a5a57f9f536d77.svg",
        5: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/f8d51984638784aff27209d38b6cd3bf.svg",
        6: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/74bd93adef7feff4fee26d08c0845b4f.svg",
      },
      tags: [
        { icon: "notes-o", name: "我的课程", url: "" },
        { icon: "edit", name: "创作者中心", url: "/creatercenter" },
        { icon: "music-o", name: "我的圈子", url: "" },
        { icon: "todo-list-o", name: "阅读记录", url: "" },
        { icon: "label-o", name: "标签管理", url: "" },
        { icon: "description", name: "简历管理", url: "" },
        { icon: "comment-o", name: "意见反馈", url: "" },
      ],
      userInfo: {},
      cardInfo: {},
      days: 0,
    });

    api.getUserinfo().then((res) => {
      state.userInfo = res.data;
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

    api.getCount().then((res) => {
      state.days = res.data.cont_count;
    });
    const router = useRouter();
    const badgeWall = () => {
      router.push("/badgewall");
    };
    const toCenter = (url) => {
      router.push(url);
    };
    return {
      ...toRefs(state),
      badgeWall,
      toCenter,
    };
  },
};
</script>
<style lang="less">
.tools-box {
  box-sizing: border-box;
  position: fixed;
  display: flex;
  justify-content: flex-end;
  top: 0;
  width: 100%;
  height: 20px;
  & .van-icon {
    margin-right: 15px;
    margin-top: 10px;
  }
}
.profile-box {
  box-sizing: border-box;
  padding: 10px;
  margin-top: 25px;
  & .basic-info {
    display: flex;

    & .van-image {
      width: 60px;
      height: 60px;
    }

    & .content-box {
      flex: 1;
      margin-left: 15px;
      & .title {
        font-weight: bold;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        & img {
          width: 23px;
          height: 14px;
        }
      }

      & .tag {
        width: 50px;
        padding: 3px 10px;
        margin-top: 10px;
        color: #1e80ff;
        background-color: #e8f3ff;
        border: 1px solid #e8f3ff;
        border-radius: 50px;
      }
    }

    & .home-page {
      width: 60px;
      text-align: right;
      color: #8a919f;
    }
  }

  & .other-info {
    padding: 15px 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    & > div {
      text-align: center;
    }
    & .digital {
      font-weight: bold;
      font-weight: 16px;
    }
  }
}

.tags-box {
  box-sizing: border-box;
  padding: 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
  border-radius: 5px;
  & .tag-item {
    text-align: center;
    & .name {
      margin-top: 5px;
    }
  }
  & .tag-item:first-child {
    & .icon {
      color: #1e80ff;
    }
  }
  & .tag-item:nth-child(2) {
    & .icon {
      color: goldenrod;
    }
  }
  & .tag-item:nth-child(3) {
    & .icon {
      color: rgb(114, 61, 211);
    }
  }
  & .tag-item:nth-child(4) {
    & .icon {
      color: rgba(255, 0, 0, 0.925);
    }
  }
}

.creator-center {
  box-sizing: border-box;
  margin: 10px;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  & .header {
    & .title {
      font-weight: bold;
      font-size: 14px;
    }
    & .arrow {
      float: right;
      margin-right: 10px;
      margin-top: 5px;
      color: #8a919f;
    }
  }

  & .article-box {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    & .info-item {
      text-align: center;
      & .title,
      & .digital,
      & .yestday {
        margin-top: 10px;
      }

      & .title,
      & .yestday {
        color: #8a919f;
      }

      & .digital {
        font-weight: bold;
        font-size: 14px;
      }
    }
  }
}

.more-box {
  box-sizing: border-box;
  margin: 10px;
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  & .header {
    font-weight: bold;
    font-size: 14px;
  }

  & .more-item-box {
    box-sizing: border-box;
    grid-template-columns: repeat(auto-fill, 26.1vw);
    grid-gap: 1.6vw 0;
    display: grid;
    justify-content: space-between;
    flex-wrap: wrap;
    & .more-item {
      width: 80px;
      text-align: center;
      margin-top: 20px;
      & .name {
        margin-top: 5px;
      }
    }
  }
}
</style>
