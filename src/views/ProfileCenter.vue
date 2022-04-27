<template>
  <div class="top-box">
    <van-nav-bar left-arrow class="header" />
  </div>
  <div class="profile-box">
    <van-image class="avatar" :src="userInfo.avatar_large" round />
    <div class="title-box">
      <span class="title">{{ userInfo.user_name }}</span>
      <img
        src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/74bd93adef7feff4fee26d08c0845b4f.svg"
        alt="lv-1"
      />
      <img :src="userInfo.badges.wear_badges[0].image_url" class="badge-img" />
      <div class="edit">编辑</div>
    </div>
    <div class="follow-box">
      <div class="follow-item">
        <div class="count">{{ userInfo.followee_count }}</div>
        <div class="tag">关注</div>
      </div>
      <div class="follow-item">
        <div class="count">{{ userInfo.follower_count }}</div>
        <div class="tag">关注者</div>
      </div>
      <div class="follow-item">
        <div class="count">{{ userInfo.power }}</div>
        <div class="tag">掘力值</div>
      </div>
    </div>
  </div>
  <div class="badge-box">
    <div class="badge-left">
      <img
        src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/badge-count-icon.0586ac4.png"
        alt=""
        class="count-icon"
      />
      <div class="badge-count">
        获得的徽章
        <span style="font-weight: bold">{{
          userInfo.badges.obtain_count
        }}</span>
      </div>
    </div>
    <ul class="badge-list" @click="toBadgeWall">
      <li
        class="badge-item"
        v-for="item in userInfo.badges.obtain_badges"
        :key="item.badge_id"
      >
        <img
          :src="item.image_url"
          :alt="item.badge_name"
          class="badge-item-img"
        />
      </li>
      <li>
        <van-icon name="arrow" size="16" />
      </li>
    </ul>
  </div>
  <div class="dynamic-box">
    <van-tabs title-active-color="#1e80ff" color="#1e80ff">
      <van-tab title="动态">
        <div v-for="tar in target.list" :key="tar.id">
          <div class="follow" v-if="tar.target_type === 'user'">
            <van-image class="avatar" :src="tar.user.avatar_large" round />
            <div class="username">{{ tar.user.user_name }}</div>
            <div class="follow-label">关注了</div>
            <div class="username">{{ tar.target_data.user_name }}</div>
          </div>
          <div class="article-list" v-if="tar.target_type === 'article'">
            <div class="header" v-if="tar.action !== 0">
              <span>{{ tar.user.user_name }}</span>
              <span>赞了这篇文章</span>
            </div>
            <div
              data-v-1685671c=""
              data-v-058f449f=""
              data-v-0bc399c0=""
              data-entry-id="6953073994383753223"
              data-original-type="0"
              data-draft-id="6953064578200633357"
              class="entry"
              v-else
            >
              <div data-v-1685671c="" class="meta-container">
                <a
                  data-v-1685671c=""
                  :href="
                    '/user/' +
                    (tar.target_data.article_info
                      ? tar.target_data.article_info.article_id
                      : tar.target_data.item_info.article_id)
                  "
                  target="_blank"
                  rel=""
                  class="user-message"
                  ><div
                    data-v-76abb21e=""
                    data-v-39c3a12c=""
                    data-v-1685671c=""
                    class="popover-box user-popover"
                  >
                    {{
                      tar.target_data.author_user_info
                        ? tar.target_data.author_user_info.user_name
                        : tar.target_data.item_info.author_user_info.user_name
                    }}
                  </div></a
                >
                <div data-v-1685671c="" class="date">
                  {{
                    tar.target_data.article_info
                      ? tar.target_data.article_info.ctime
                      : tar.target_data.item_info.article_info.ctime
                  }}
                </div>
                <div data-v-1685671c="" class="tag_list">
                  <a
                    v-for="tag in tar.target_data.article_info
                      ? tar.target_data.article_info.tags
                      : tar.target_data.item_info.tags"
                    :key="tag.tag_id"
                    data-v-1685671c=""
                    :href="'/tag/' + tag.tag_name"
                    target="_blank"
                    rel=""
                    class="tag"
                  >
                    {{ tag.tag_name }}
                  </a>
                </div>
              </div>
              <div data-v-1685671c="" class="content-wrapper">
                <div data-v-1685671c="" class="content-main">
                  <div data-v-1685671c="" class="title-row">
                    <a
                      data-v-1685671c=""
                      :href="
                        '/post/' +
                        (tar.target_data.article_info
                          ? tar.target_data.article_info.article_id
                          : tar.target_data.item_info.article_info.article_id)
                      "
                      target="_blank"
                      rel=""
                      :title="
                        tar.target_data.article_info
                          ? tar.target_data.article_info.title
                          : tar.target_data.item_info.article_info.title
                      "
                      class="title"
                      >{{
                        tar.target_data.article_info
                          ? tar.target_data.article_info.title
                          : tar.target_data.item_info.article_info.title
                      }}</a
                    >
                  </div>
                  <div data-v-1685671c="" class="abstract">
                    <a
                      data-v-1685671c=""
                      :href="
                        '/post/' +
                        (tar.target_data.article_info
                          ? tar.target_data.article_info.article_id
                          : tar.target_data.item_info.article_info.article_id)
                      "
                      target="_blank"
                      rel=""
                    >
                      {{
                        tar.target_data.article_info
                          ? tar.target_data.article_info.brief_content
                          : tar.target_data.item_info.article_info.brief_content
                      }}
                    </a>
                  </div>
                  <ul
                    data-v-1685671c=""
                    class="action-list jh-timeline-action-area"
                  >
                    <li data-v-1685671c="" class="item view">
                      <i data-v-1685671c=""></i>
                      <span data-v-1685671c="">{{
                        tar.target_data.article_info
                          ? tar.target_data.article_info.view_count
                          : tar.target_data.item_info.article_info.view_count
                      }}</span>
                    </li>
                    <li
                      :id="`like${
                        tar.target_data.article_info
                          ? tar.target_data.article_info.article_id
                          : tar.target_data.item_info.article_info.article_id
                      }`"
                      data-v-1685671c=""
                      class="item like"
                      :class="{
                        active: tar.target_data.user_interact
                          ? tar.target_data.user_interact.is_digg
                          : tar.target_data.item_info.user_interact.is_digg,
                      }"
                      @click="
                        digg(
                          tar.target_data.article_info
                            ? tar.target_data.article_info.article_id
                            : tar.target_data.item_info.article_info.article_id
                        )
                      "
                    >
                      <i data-v-1685671c=""></i>
                      <span
                        data-v-1685671c=""
                        :id="`likecount${
                          tar.target_data.article_info
                            ? tar.target_data.article_info.article_id
                            : tar.target_data.item_info.article_info.article_id
                        }`"
                      >
                        {{
                          tar.target_data.article_info
                            ? tar.target_data.article_info.digg_count
                            : tar.target_data.item_info.article_info.digg_count
                        }}
                      </span>
                    </li>
                    <li data-v-1685671c="" class="item comment">
                      <i data-v-1685671c=""></i>
                      <span data-v-1685671c="">
                        {{
                          tar.target_data.article_info
                            ? tar.target_data.article_info.comment_count
                            : tar.target_data.item_info.article_info
                                .comment_count
                        }}
                      </span>
                    </li>
                  </ul>
                </div>
                <img
                  data-v-2a2c158c=""
                  data-v-1685671c=""
                  v-show="
                    tar.target_data.article_info
                      ? tar.target_data.article_info.cover_image
                      : tar.target_data.item_info.article_info.cover_image
                  "
                  :src="
                    tar.target_data.article_info
                      ? tar.target_data.article_info.cover_image
                      : tar.target_data.item_info.article_info.cover_image
                  "
                  :alt="
                    tar.target_data.article_info
                      ? tar.target_data.article_info.title
                      : tar.target_data.item_info.article_info.title
                  "
                  class="lazy thumb"
                  style=""
                />
              </div>
            </div>
          </div>
          <div class="short-msg-list" v-if="tar.target_type === 'short_msg'">
            <div class="header" v-if="tar.action !== 2">
              <span>{{ tar.user.user_name }}</span>
              <span>赞了这篇沸点</span>
            </div>
            <comment
              :avatar_large="tar.target_data.author_user_info.avatar_large"
              :user_name="tar.target_data.author_user_info.user_name"
              :job_title="tar.target_data.author_user_info.job_title"
              :company="tar.target_data.author_user_info.company"
              :ctime="tar.target_data.msg_Info.ctime"
              :origin_content="tar.target_data.msg_Info.content"
              :sub_content="tar.target_data.msg_Info.content"
              :comment_id="tar.target_data.msg_Info.msg_id"
              :pic_list="tar.target_data.msg_Info.pic_list"
            />
          </div>
        </div>
      </van-tab>
      <van-tab title="文章">dongt</van-tab>
      <van-tab title="专栏">dongt</van-tab>
      <van-tab title="沸点">dongt</van-tab>
      <van-tab title="收藏">dongt</van-tab>
      <van-tab title="关注">dongt</van-tab>
      <van-tab title="赞">dongt</van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import api from "../api/juejinapi";
import { useRouter } from "vue-router";
import comment from "./comment.vue";
export default {
  name: "",
  props: {},
  components: { comment },
  setup() {
    const state = reactive({
      userInfo: {},
      target: [],
    });
    api.getUserinfo().then((res) => {
      state.userInfo = res.data;
    });

    const router = useRouter();
    const toBadgeWall = () => {
      router.push("/badgewall");
    };
    api.dynamic().then((res) => {
      state.target = res.data;
      console.log(res.data);
    });
    return {
      ...toRefs(state),
      toBadgeWall,
    };
  },
};
</script>
<style lang="less" scoped>
.top-box {
  box-sizing: border-box;
  height: 120px;
  background: url(//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/98570e28d7699e6530e0aece945c7281.svg);
  & .header {
    background: transparent;
  }
  & .header:after {
    border: none;
  }

  & .van-icon {
    color: #fff;
  }
}

.profile-box {
  box-sizing: border-box;
  height: 180px;
  background-color: #fff;
  position: relative;
  padding: 15px;
  & .avatar {
    position: absolute;
    width: 80px;
    height: 80px;
    top: -40px;
    left: 15px;
  }

  & .title-box {
    margin-top: 60px;
    & .title {
      font-size: 18px;
      font-weight: 500;
    }

    & img {
      margin-left: 5px;
    }

    & .badge-img {
      width: 24px;
      height: 24px;
      vertical-align: text-bottom;
    }

    & .edit {
      float: right;
      padding: 5px 15px;
      border: 1px solid #1e80ff;
      color: #1e80ff;
      border-radius: 5px;
    }
  }

  & .follow-box {
    margin-top: 30px;
  }

  & .follow-box {
    display: flex;
    & .follow-item {
      width: 50px;
      text-align: center;
      margin-right: 10px;
      & .count {
        font-size: 14px;
        font-weight: bold;
      }
      & .tag {
        color: #8a919f;
        margin-top: 5px;
      }
    }
  }
}

.badge-box {
  margin-top: 10px;
  box-sizing: border-box;
  height: 40px;
  background-color: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & .badge-left {
    display: flex;
    align-items: center;
    & .count-icon {
      width: 20px;
      height: 20px;
      margin-left: 20px;
    }

    & .badge-count {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: #1d2129;
      margin-left: 10px;
    }
  }

  & .badge-list {
    display: flex;
    height: 28px;
    align-items: center;
    margin-right: 10px;
    & .badge-item {
      height: 28px;
      margin-right: 4px;
      &-img {
        width: 28px;
        height: 28px;
      }
    }
    & .van-icon {
      color: #8a919f;
    }
  }
}

.dynamic-box {
  margin-top: 10px;
  // background-color: #fff;
  padding-bottom: 80px;
  & .follow {
    background-color: #fff;
    box-sizing: border-box;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;

    & .avatar {
      width: 50px;
      height: 50px;
    }

    & .username {
      font-weight: bold;
      font-size: 16px;
      margin-left: 15px;
    }

    & .follow-label {
      font-size: 14px;
      margin-left: 15px;
      color: #8a919f;
    }
  }

  & .van-tabs__wrap {
    border-bottom: 1px solid #e4e6eb;
  }

  & .article-list {
    margin-bottom: 10px;
    background-color: #fff;
    padding-bottom: 0px;
    & .advertisement[data-v-02f416ca] {
      position: relative;
      cursor: pointer;
      padding: 12px 20px 0;
      & .meta-container[data-v-02f416ca] {
        display: flex;
        align-items: center;
        & .user-message[data-v-02f416ca] {
          display: flex;
          align-items: center;
          & .userbox[data-v-02f416ca] {
            max-width: 162px;
            font-size: 13px;
            line-height: 22px;
            color: #4e5969;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
          }
        }
        & .dividing[data-v-02f416ca] {
          width: 1px;
          height: 14px;
          background: #e5e6eb;
          margin: 0 8px;
        }
        & .date[data-v-02f416ca] {
          line-height: 22px;
          font-size: 13px;
          color: #86909c;
        }
      }
      & .tag[data-v-02f416ca] {
        position: absolute;
        top: 12px;
        right: 20px;
        border: 1px solid #c9cdd4;
        box-sizing: border-box;
        border-radius: 2px;
        line-height: 18px;
        width: 42px;
        text-align: center;
        color: #c9cdd4;
        font-size: 13px;
      }
      & .main[data-v-02f416ca] {
        margin-top: 6px;
        padding-bottom: 12px;
        display: flex;
        border-bottom: 1px solid #e5e6eb;
        & .info-box[data-v-02f416ca] {
          flex-grow: 1;
          & .title[data-v-02f416ca] {
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            color: #1d2129;
            margin-bottom: 8px;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
          & .description[data-v-02f416ca] {
            font-weight: 400;
            font-size: 13px;
            line-height: 22px;
            color: #86909c;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
      }
      & .thumb[data-v-02f416ca] {
        flex: 0 0 auto;
        width: 120px;
        height: 80px;
        margin-left: 24px;
        border-radius: 2px;
      }
    }
    & .entry[data-v-1685671c] {
      cursor: pointer;
      position: relative;
      background: #fff;
      padding: 12px 20px 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      & .meta-container[data-v-1685671c] {
        color: #86909c;
        display: flex;
        align-items: center;
        & .user-message[data-v-1685671c] {
          display: flex;
          align-items: center;
          margin-right: 8px;
          max-width: 162px;
          font-size: 13px;
          line-height: 22px;
          color: #4e5969;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
        }
        & .date[data-v-1685671c] {
          position: relative;
          padding: 0 10px;
          line-height: 22px;
          font-size: 13px;
          flex-shrink: 0;
        }
        & .tag_list[data-v-1685671c] {
          display: flex;
          align-items: center;
          & .tag[data-v-1685671c] {
            display: flex;
            align-items: center;
            position: relative;
            flex-shrink: 0;
            font-size: 13px;
            line-height: 22px;
            padding: 0 8px;
            color: #86909c;
          }
        }
      }
      & .content-wrapper[data-v-1685671c] {
        display: flex;
        padding-bottom: 12px;
        border-bottom: 1px solid #e5e6eb;
        margin-top: 10px;
        width: 100%;
        & .content-main[data-v-1685671c] {
          flex: 1 1 auto;
        }
      }
    }
    & .header {
      padding: 10px;
      border-bottom: 1px solid #e4e6eb;
      & span:nth-child(2) {
        margin-left: 10px;
        font-size: 14px;
        color: #8a919f;
      }
    }
  }

  & .short-msg-list {
    margin-bottom: 10px;
    background-color: #fff;
    & .header {
      padding: 10px;
      border-bottom: 1px solid #e4e6eb;
      & span:nth-child(2) {
        margin-left: 10px;
        font-size: 14px;
        color: #8a919f;
      }
    }
  }
}

li {
  list-style: none;
}

body {
  -webkit-font-smoothing: unset !important;
  font-family: -apple-system, system-ui, Segoe UI, Roboto, Ubuntu, Cantarell,
    Noto Sans, sans-serif, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", Arial !important;
}
</style>
