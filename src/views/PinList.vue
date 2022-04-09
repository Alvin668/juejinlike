<template>
  <div class="topic">
    <div class="title-box">
      <div class="title">推荐圈子</div>
      <div class="my-topic" @click="toTopicList(0)">我加入的圈子</div>
    </div>
    <div class="topic-box">
      <div class="topic-name" @click="toTopicList(1)">
        <van-image
          src="https://p9-passport.byteacctimg.com/img/user-avatar/4eb96a510ba31abc55e029bd74da2be0~300x300.image"
        />
        <span>发现更多</span>
      </div>
      <div
        class="topic-name"
        v-for="item in topicList"
        :key="item.topic_id"
        @click="toTopicPins(item.topic_id)"
      >
        <van-image :src="item.topic.icon" />
        <span>{{ item.topic.title }}</span>
      </div>
    </div>
  </div>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="msg in pinList" :key="msg.msg_id">
        <div class="content-box">
          <div class="fire-item">
            <div>
              <comment
                :avatar_large="msg.author_user_info.avatar_large"
                :user_name="msg.author_user_info.user_name"
                :job_title="msg.author_user_info.job_title"
                :company="msg.author_user_info.company"
                :ctime="msg.msg_Info.ctime"
                :origin_content="msg.msg_Info.content"
                :sub_content="msg.msg_Info.sub_content"
                :comment_id="msg.msg_Info.msg_id"
                :pic_list="msg.msg_Info.pic_list"
              />
              <div class="hot-comment" v-show="msg.hot_comment.comment_info">
                <div class="hot-title">
                  <svg
                    data-v-88398272=""
                    width="40"
                    height="16"
                    viewBox="0 0 40 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="hot-icon"
                  >
                    <rect
                      data-v-88398272=""
                      y="8"
                      width="40"
                      height="8"
                      fill="url(#paint0_linear)"
                    ></rect>
                    <path
                      data-v-88398272=""
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 11.9864H2.2736L3.40578 9.41717H1.13218L0 11.9864ZM2.89197 1.12923H1.59367L1.34138 2.77301H2.63971L2.35357 4.79665L0.815282 6.38517H2.12899L2.07977 6.7305C2.05901 6.87329 1.99355 7.00309 1.89516 7.09656C1.79579 7.19454 1.66747 7.24748 1.53521 7.24505H1.48905L0.722989 8.68853H2.23052C2.44987 8.687 2.66699 8.63896 2.87045 8.54694C3.07918 8.45342 3.27256 8.32154 3.44269 8.15672C3.61465 7.99038 3.76209 7.79458 3.87956 7.57656C3.99784 7.35869 4.07726 7.11708 4.11338 6.86518L4.3872 4.94169L5.31018 3.94713H4.54411L4.71024 2.76955H5.58092L5.81472 1.12923H4.94406L5.10403 0H3.05196L2.89197 1.12923ZM6.30699 9.41717H4.03031L4.43334 11.9864H6.71002L6.30699 9.41717ZM7.70991 2.76955L7.30072 3.76411L5.95009 3.76756L6.67926 5.27666L5.26402 8.69199H7.21458L7.70991 7.47987L8.05448 8.17053H10.0758L8.65442 5.18687L9.66353 2.76955H11.3926L10.8572 6.53367L11.3987 8.75414H13.4508L12.9093 6.53367L13.6754 1.12923H10.3558L10.8234 0H8.87592L8.40522 1.12923H6.44236L6.20853 2.76955H7.70991ZM9.88505 11.9864L9.48202 9.41717H7.20534L7.60837 11.9864H9.88505ZM13.0724 11.9864L12.6693 9.41717H10.405L10.7926 11.9864H13.0724ZM14.62 5.10694H15.4783L14.7707 10.1591C14.7336 10.3967 14.742 10.6403 14.7953 10.874C14.8435 11.09 14.9351 11.2908 15.063 11.461C15.1878 11.6312 15.3457 11.7671 15.5245 11.8582C15.7184 11.9534 15.9281 12.0017 16.1398 11.9997H17.3273L18.115 10.539H17.2381C17.1803 10.5407 17.1229 10.5283 17.0698 10.5026C17.0167 10.477 16.9691 10.4387 16.9305 10.3905C16.8918 10.3418 16.8636 10.2838 16.8481 10.2209C16.8327 10.158 16.8303 10.092 16.8412 10.0279L17.7642 3.46661H14.8538L14.62 5.10694ZM15.3706 0.0167593L16.0936 2.53767H18.5026L17.7827 0.0167593H15.3706ZM28 0.0167593H19.1702L18.9364 1.65708H22.3606L21.6469 6.69891H17.8934L17.6627 8.33923H21.413L20.8962 11.9859H22.9482L23.4651 8.33923H27.1416L27.3754 6.69891H23.6989L24.4127 1.65708H27.7662L28 0.0167593ZM19.0779 5.96681H21.2315L20.7454 2.62055H18.5918L19.0779 5.96681ZM28 2.38918H25.8464L24.3604 5.96681H26.514L28 2.38918Z"
                      fill="#FF834E"
                    ></path>
                    <defs data-v-88398272="">
                      <linearGradient
                        data-v-88398272=""
                        id="paint0_linear"
                        x1="7.45058e-08"
                        y1="12"
                        x2="40"
                        y2="12"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop
                          data-v-88398272=""
                          stop-color="#FF834E"
                          stop-opacity="0.4"
                        ></stop>
                        <stop
                          data-v-88398272=""
                          offset="1"
                          stop-color="#FF834E"
                          stop-opacity="0"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span data-v-88398272="" class="digg-count">
                    {{
                      msg.hot_comment.comment_info
                        ? msg.hot_comment.comment_info.digg_count
                        : 0
                    }}赞
                  </span>
                </div>
                <div>
                  {{
                    msg.hot_comment.comment_info
                      ? msg.hot_comment.comment_info.show_content
                      : ""
                  }}
                  <div
                    class="limit-btn"
                    v-if="
                      msg.hot_comment.comment_info &&
                      msg.hot_comment.comment_info.comment_content.length >=
                        80 &&
                      msg.hot_comment.comment_info.show_content.length <= 83
                    "
                    @click="
                      showFullHotContent(
                        msg.hot_comment.comment_info.comment_id
                      )
                    "
                  >
                    展开
                  </div>
                  <div
                    class="limit-btn"
                    v-if="
                      msg.hot_comment.comment_info &&
                      msg.hot_comment.comment_info.comment_content.length >=
                        80 &&
                      msg.hot_comment.comment_info.show_content.length > 83
                    "
                    @click="
                      hideFullHotContent(
                        msg.hot_comment.comment_info.comment_id
                      )
                    "
                  >
                    收起
                  </div>
                </div>
              </div>
            </div>
            <div style="display: flex">
              <div class="belong-topic" v-show="msg.topic.title">
                <svg
                  data-v-74a28d2e=""
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="club-icon"
                >
                  <path
                    data-v-74a28d2e=""
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM11.36 8C11.7135 8 12.0052 8.28834 11.9489 8.63729C11.8578 9.20177 11.6463 9.74274 11.3259 10.2223C10.8864 10.8801 10.2616 11.3928 9.53073 11.6955C8.79983 11.9983 7.99556 12.0775 7.21964 11.9231C6.44371 11.7688 5.73098 11.3878 5.17157 10.8284C4.61216 10.269 4.2312 9.55628 4.07686 8.78036C3.92252 8.00444 4.00173 7.20017 4.30448 6.46927C4.60723 5.73836 5.11992 5.11365 5.77772 4.67412C6.25726 4.3537 6.79823 4.14219 7.36271 4.05109C7.71166 3.99477 8 4.28654 8 4.64C8 4.99346 7.7096 5.27254 7.36588 5.35495C7.05478 5.42953 6.75763 5.55881 6.48885 5.7384C6.04155 6.03728 5.69292 6.46209 5.48705 6.9591C5.28118 7.45612 5.22731 8.00302 5.33226 8.53065C5.43722 9.05827 5.69627 9.54293 6.07667 9.92333C6.45707 10.3037 6.94173 10.5628 7.46935 10.6677C7.99698 10.7727 8.54388 10.7188 9.0409 10.513C9.53791 10.3071 9.96272 9.95845 10.2616 9.51115C10.4412 9.24237 10.5705 8.94522 10.6451 8.63412C10.7275 8.2904 11.0065 8 11.36 8ZM10.5 6.5C11.0523 6.5 11.5 6.05228 11.5 5.5C11.5 4.94772 11.0523 4.5 10.5 4.5C9.94771 4.5 9.5 4.94772 9.5 5.5C9.5 6.05228 9.94771 6.5 10.5 6.5Z"
                    fill="#1E80FF"
                  ></path>
                </svg>
                {{ msg.topic.title }}
              </div>
              <div style="flex: 1 1 auto"></div>
              <div
                class="digg-container digg-box is-link"
                v-show="msg.digg_user.length > 0"
              >
                <div data-v-4e60c69e="" class="list">
                  <img
                    v-for="digg in msg.digg_user"
                    :key="digg.user_id"
                    :src="digg.avatar_large"
                    alt=""
                    class="lazy avatar item"
                  />
                </div>
                <span data-v-4e60c69e="" class="label">等人赞过</span>
              </div>
            </div>
            <div class="operation">
              <div class="share"><van-icon name="share-o" />分享</div>
              <div
                class="comment"
                :class="{ active: curMsgId === msg.msg_id }"
                @click="showComment(msg.msg_id, curMsgId === msg.msg_id, 0)"
              >
                <van-icon name="chat-o" />
                {{ msg.msg_Info.comment_count }}
              </div>
              <div
                class="digg"
                :class="{ active: msg.user_interact.is_digg }"
                @click="digg(msg.msg_id, msg.user_interact.is_digg)"
              >
                <van-icon name="good-job-o" />{{ msg.msg_Info.digg_count }}
              </div>
            </div>
            <div class="comment-list" v-show="curMsgId === msg.msg_id">
              <div class="comment-list-arrow"></div>
              <div class="line"></div>
              <div class="comment-list-reply">
                <van-image
                  round
                  width="30px"
                  height="30px"
                  src="https://p9-passport.byteacctimg.com/img/user-avatar/4eb96a510ba31abc55e029bd74da2be0~300x300.image"
                />
                <reply
                  :itemId="msg.msg_id"
                  @published="publishComment"
                  :isShow="true"
                />
              </div>
              <div class="comment-list-comment">
                <div class="comment-title">
                  <div>全部评论（{{ msg.msg_Info.comment_count }}）</div>
                  <div class="title-right">
                    <span
                      :class="{ active: sort === 0 }"
                      @click="sortComment(0, msg.msg_id)"
                      >最新</span
                    >
                    <span>|</span>
                    <span
                      :class="{ active: sort === 1 }"
                      @click="sortComment(1, msg.msg_id)"
                      >最热</span
                    >
                  </div>
                </div>
                <div
                  class="comment-content"
                  v-for="rep in replyList"
                  :key="rep.comment_id"
                >
                  <comment
                    :avatar_large="rep.user_info.avatar_large"
                    :user_name="rep.user_info.user_name"
                    :job_title="rep.user_info.job_title"
                    :company="rep.user_info.company"
                    :ctime="rep.comment_info.ctime.toString()"
                    :origin_content="rep.comment_info.comment_content"
                    :sub_content="rep.comment_info.sub_content"
                    :comment_id="rep.comment_id"
                    :pic_list="rep.comment_info.comment_pics"
                    :is_author="rep.is_author"
                    :is_current_user="rep.user_info.user_id"
                    @delComment="deleteComment(msg.msg_id)"
                  />
                  <div class="comment-content-opt">
                    <div
                      class="digg"
                      :class="{ active: rep.user_interact.is_digg }"
                      @click="digg(rep.comment_id, rep.user_interact.is_digg)"
                    >
                      <van-icon name="good-job-o" />{{
                        rep.comment_info.digg_count === 0
                          ? "点赞"
                          : rep.comment_info.digg_count
                      }}
                    </div>
                    <div
                      class="comment"
                      @click="
                        replyHandle(
                          rep.comment_id,
                          current_comment === rep.comment_id
                        )
                      "
                      :style="{
                        color:
                          rep.comment_info.reply_count === 0 &&
                          current_comment === rep.comment_id
                            ? '#007fff'
                            : '',
                      }"
                    >
                      <van-icon name="chat-o" />{{
                        rep.comment_info.reply_count === 0
                          ? current_comment === rep.comment_id
                            ? "取消回复"
                            : "回复"
                          : rep.comment_info.reply_count
                      }}
                    </div>
                  </div>
                  <reply
                    :itemId="rep.comment_id"
                    @published="publishComment"
                    :isShow="current_comment === rep.comment_id"
                    :msg_id="msg.msg_id"
                  />
                  <div
                    class="reply-reply"
                    v-for="rrp in rep.reply_infos"
                    :key="rrp.reply_id"
                  >
                    <comment
                      :avatar_large="rrp.user_info.avatar_large"
                      :user_name="rrp.user_info.user_name"
                      :job_title="rrp.user_info.job_title"
                      :company="rrp.user_info.company"
                      :ctime="rrp.reply_info.ctime.toString()"
                      :origin_content="rrp.reply_info.reply_content"
                      :sub_content="rrp.reply_info.reply_content"
                      :comment_id="rrp.reply_info.reply_id"
                      :pic_list="rrp.reply_info.reply_pics"
                      :is_author="rrp.is_author"
                      :is_current_user="rrp.user_info.user_id"
                      @delComment="deleteComment(msg.msg_id)"
                    />
                    <div class="comment-content-opt">
                      <div class="digg">
                        <van-icon name="good-job-o" />{{
                          rrp.reply_info.digg_count === 0
                            ? "点赞"
                            : rrp.reply_info.digg_count
                        }}
                      </div>
                      <div class="comment">
                        <van-icon name="chat-o" />{{
                          rrp.reply_info.burry_count === 0
                            ? "回复"
                            : rrp.reply_info.burry_count
                        }}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="reply-more"
                  v-if="msg.msg_Info.comment_count > 5"
                  @click="moreReply(msg.msg_id)"
                >
                  查看全部{{ msg.msg_Info.comment_count }}条回复
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </van-pull-refresh>
  <div class="actual-img" :class="{ show: showImg }" @click="hideImage">
    <van-image :src="img_url" />
  </div>
</template>

<script>
import utils from "../utils/utils";
import { reactive, toRefs } from "vue";
import api from "../api/juejinapi";
import http from "../api/http";
import { useRouter } from "vue-router";
import comment from "./comment.vue";
import Reply from "./Reply.vue";
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  components: { comment, Reply },
  setup(props, ctx) {
    const state = reactive({
      topicList: [],
      pinList: [],
      refreshing: false,
      loading: false,
      finished: false,
      img_url: "",
      showImg: false,
      curMsgId: "",
      replyList: [],
      showBtn: false,
      reply_content: "",
      sort: 0,
      current_comment: "",
    });

    const router = useRouter();
    api.listByRec().then((res) => {
      state.topicList = res.data;
    });

    // api.recommendPins("0", 20, 300).then((res) => {
    //   console.log(res);
    //   state.pinList = res.data;
    // });

    const publishTime = utils.getPublishTime;

    let pageNo = 0;
    const onRefresh = function () {
      pageNo = 0; //从第一页重新加载
      state.finished = false; //清空列表数据，重新加载
      state.loading = true;
      state.refreshing = true;
      onLoad();
    };
    const { url } = props;
    const onLoad = function () {
      //   let api_url = store.state.url,
      //     tagId = store.state.tagId;
      http
        .post(url, {
          cursor: pageNo,
          limit: 20,
          sortType: 300,
        })
        .then((res) => {
          if (state.refreshing) {
            state.pinList = [];
            state.refreshing = false;
          }
          res.data.forEach((item) => {
            item.msg_Info.sub_content = item.msg_Info.content.substring(0, 80);
            item.msg_Info.content.length >= 80
              ? (item.msg_Info.sub_content += "...")
              : null;
            item.msg_Info.show_content = item.msg_Info.sub_content;

            item.hot_comment.comment_info
              ? (item.hot_comment.comment_info.sub_content =
                  item.hot_comment.comment_info.comment_content.substring(
                    0,
                    80
                  ))
              : null;
            item.hot_comment.comment_info
              ? (item.hot_comment.comment_info.show_content =
                  item.hot_comment.comment_info.sub_content)
              : null;
            item.hot_comment.comment_info &&
            item.hot_comment.comment_info.comment_content.length >= 80
              ? (item.hot_comment.comment_info.show_content += "...")
              : null;
          });
          state.pinList.push(...res.data);
          state.loading = false;
          pageNo = res.cursor;
          // console.log(state.pinList);
          //   if (pageNo >= 50) {
          //     //只加载50页（1000条）数据
          //     state.finished = true;
          //   }
          //   pageNo++;
        });
    };

    const processLength = function (txt) {
      if (txt.length >= 150) {
        return txt.substring(0, 150); //+ "...";
      }
      return txt;
    };

    const toTopicList = function (active) {
      router.push(`/topic/${active}`);
    };

    const toTopicPins = function (topic_id) {
      router.push(`/topicpins/${topic_id}`);
    };

    const showFullHotContent = function (msg_id) {
      let arrPin = state.pinList.filter((item) => {
        if (item.hot_comment.comment_info.comment_id === msg_id) {
          return item;
        }
        // console.log(item.msg_Info);
      });
      arrPin.length
        ? (arrPin[0].hot_comment.comment_info.show_content =
            arrPin[0].hot_comment.comment_info.comment_content)
        : null;
    };

    const hideFullHotContent = function (msg_id) {
      let arrPin = state.pinList.filter((item) => {
        if (item.hot_comment.comment_info.comment_id === msg_id) {
          return item;
        }
        // console.log(item.msg_Info);
      });
      arrPin.length
        ? (arrPin[0].hot_comment.comment_info.show_content =
            arrPin[0].hot_comment.comment_info.sub_content)
        : null;
    };

    const showImage = function (img_url) {
      state.showImg = true;
      state.img_url = img_url;
    };

    const hideImage = function () {
      state.showImg = false;
    };

    const showComment = (msgId, isShow, comment_id) => {
      state.curMsgId = !isShow ? msgId : "";
      api.commentList("0", msgId, 4, 5, comment_id).then((res) => {
        res.data.forEach((item) => {
          item.comment_info.sub_content =
            item.comment_info.comment_content.substring(0, 80);
          item.comment_info.comment_content.length >= 80
            ? (item.comment_info.sub_content += "...")
            : null;
          item.comment_info.show_content = item.comment_info.sub_content;
        });
        state.replyList = res.data;
        console.log(state.replyList);
      });
    };

    const deleteComment = (msg_id) => {
      showComment(msg_id, false, state.sort);
    };

    const sortComment = (sort, msgId) => {
      state.sort = sort;
      showComment(msgId, false, sort);
    };

    const publishComment = (obj) => {
      showComment(obj.itemId, false, 0);
    };

    const replyHandle = (comment_id, isShow) => {
      state.current_comment = !isShow ? comment_id : "";
    };

    const digg = (itemid, is_digg) => {
      const cur_pin = state.pinList.filter((item) => item.msg_id === itemid);
      const cur_com = state.replyList.filter(
        (item) => item.comment_id === itemid
      );
      if (is_digg) {
        api.cancelDigg(itemid, 4).then((res) => {
          if (cur_pin.length) {
            cur_pin[0].msg_Info.digg_count--;
            cur_pin[0].user_interact.is_digg = false;
          }
          if (cur_com.length) {
            cur_com[0].comment_info.digg_count--;
            cur_com[0].user_interact.is_digg = false;
          }
        });
      } else {
        api.saveDigg(itemid, 4).then((res) => {
          if (cur_pin.length) {
            cur_pin[0].msg_Info.digg_count++;
            cur_pin[0].user_interact.is_digg = true;
          }
          if (cur_com.length) {
            cur_com[0].comment_info.digg_count++;
            cur_com[0].user_interact.is_digg = true;
          }
        });
      }
    };

    const moreReply = (msg_id) => {
      console.log(msg_id);
      router.push(`/morereply/${msg_id}`);
    };

    return {
      ...toRefs(state),
      publishTime,
      onRefresh,
      onLoad,
      processLength,
      toTopicList,
      toTopicPins,
      showFullHotContent,
      hideFullHotContent,
      showImage,
      hideImage,
      showComment,
      sortComment,
      deleteComment,
      publishComment,
      replyHandle,
      digg,
      moreReply,
    };
  },
};
</script>

<style lang="less">
.tab-content {
  margin-top: 10px;
  box-sizing: border-box;

  & .topic {
    background: #fff;

    & .title-box {
      box-sizing: border-box;
      width: 100%;
      height: 25px;
      padding: 0 10px;

      & .title {
        width: 100px;
        font-weight: bold;
        font-size: 16px;
        float: left;
      }

      & .my-topic {
        float: right;
        font-size: 14px;
        color: #8a919f;
      }
    }

    & .topic-box {
      width: 100%;
      height: 100%;
      display: flex;
      box-sizing: border-box;
      overflow-x: auto;

      & .topic-name {
        width: 50px;
        height: 80px;
        min-width: 50px;
        border-radius: 5px;
        margin: 10px 5px;

        & img {
          width: 50px;
          height: 50px;
        }

        & span {
          width: 50px;
          display: inline-block;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }

  & .content-box {
    box-sizing: border-box;
    padding: 10px;
    background-color: #fff;
    margin-top: 10px;

    & .fire-item {
      & .hot-comment {
        background: #f7f8fa;
        border-radius: 4px;
        padding: 12px 16px;
        margin: 16px 20px;
        margin-top: 0;

        & .hot-title {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          line-height: 20px;
          color: #1e80ff;
        }
      }

      & .operation {
        display: flex;
        color: #8a919f;
        margin-top: 10px;
        text-align: center;

        & .share {
          flex: 1;
        }

        & .comment {
          flex: 1;
        }

        & .comment.active {
          color: #007fff;
        }

        & .digg {
          flex: 1;
        }

        & .digg.active {
          color: #007fff;
        }
      }

      & .belong-topic {
        width: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 12px;
        background-color: #eaf2ff;
        font-size: 12px;
        line-height: 20px;
        color: #1e80ff;
        border-radius: 50px;
        border-bottom-left-radius: 0;
      }

      & .digg-container {
        display: flex;
        line-height: 24px;
        align-items: center;

        & .list {
          display: flex;

          & .item {
            width: 22px;
            height: 22px;
            border: 2px solid #fff;
            border-radius: 50%;
            margin-right: -6px;
          }
        }

        & .label {
          font-size: 14px;
          line-height: 24px;
          color: #8a919f;
          margin-left: 10px;
        }
      }
    }
  }
}
.limit-btn {
  font-size: 14px;
  // line-height: 1.6;
  color: #1e80ff;
  overflow: hidden;
  line-height: 20px;
  margin-top: 5px;
  height: 20px;
  margin-bottom: 15px;
}

.actual-img {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 20%;
  display: none;
}

.actual-img.show {
  display: block;
}
.comment-list {
  margin-top: 10px;
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  width: 100%;
  position: relative;
  transition: all 0.3s;
  padding: 10px;

  &-arrow {
    width: 10px;
    height: 10px;
    border-left: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
    position: absolute;
    left: 50%;
    top: -3px;
    transform: rotate(45deg) translateX(-5px);
  }

  & .line {
    width: 14px;
    height: 10px;
    border-top: 1px solid #fff;
    position: absolute;
    left: 50%;
    top: -1px;
    transform: translateX(-5px);
  }

  &-reply {
    display: flex;
  }

  &-comment {
    margin-top: 20px;

    & .comment-title {
      display: flex;
      margin-bottom: 20px;

      & > div:first-child {
        flex: 1;
        font-size: 14px;
      }

      & .title-right {
        width: 100px;
        text-align: center;

        & span {
          margin-right: 10px;
        }

        & span.active {
          color: #1e80ff;
        }
      }
    }

    & .comment-content {
      border-bottom: 1px solid #e5e5e5;
      padding: 10px 0;

      &-opt {
        display: flex;
        margin-top: -5px;
        padding-left: 20px;

        & .digg {
          margin-right: 10px;
        }
        & .digg.active {
          color: #007fff;
        }
      }

      & .reply-reply {
        margin-left: 20px;
        padding: 10px;
        background-color: #f7f8fa;
        border: 1px solid #f7f8fa;
      }
    }

    & .reply-more {
      box-sizing: border-box;
      width: 100%;
      text-align: center;
      padding: 10px;
    }
  }
}
</style>
