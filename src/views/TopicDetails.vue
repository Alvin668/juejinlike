<template>
  <div class="topic-details-box">
    <div class="topic-info-box">
      <div class="back" @click="toBack">
        <van-icon name="arrow-left" size="20px" />
      </div>
      <topic-list :data="[topic]" :isJoin="false" />
      <div class="topic-desc">
        {{ topic.topic.description }}
      </div>
      <div class="more" @click="toMore(topic.topic_id)">更多详细信息></div>
    </div>
    <div class="topic-sort">
      <div class="sort-title">排序</div>
      <div class="sort-opt">
        <span :class="{ active: sort === 0 }" @click="sortTopic(0, 500)"
          >最新</span
        >
        <span>|</span>
        <span :class="{ active: sort === 1 }" @click="sortTopic(1, 200)"
          >最热</span
        >
      </div>
    </div>
    <div class="topic-list-box">
      <div class="comment" v-for="msg in pinList" :key="msg.msg_id">
        <comment
          :avatar_large="msg.author_user_info.avatar_large"
          :user_name="msg.author_user_info.user_name"
          :job_title="msg.author_user_info.job_title"
          :company="msg.author_user_info.company"
          :ctime="msg.msg_Info.ctime"
          :origin_content="msg.msg_Info.content"
          :sub_content="msg.msg_Info.content"
          :comment_id="msg.msg_Info.msg_id"
          :pic_list="msg.msg_Info.pic_list"
        />
        <!-- <div class="hot-comment" v-show="msg.hot_comment.comment_info">
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
                msg.hot_comment.comment_info.comment_content.length >= 80 &&
                msg.hot_comment.comment_info.show_content.length <= 83
              "
              @click="
                showFullHotContent(msg.hot_comment.comment_info.comment_id)
              "
            >
              展开
            </div>
            <div
              class="limit-btn"
              v-if="
                msg.hot_comment.comment_info &&
                msg.hot_comment.comment_info.comment_content.length >= 80 &&
                msg.hot_comment.comment_info.show_content.length > 83
              "
              @click="
                hideFullHotContent(msg.hot_comment.comment_info.comment_id)
              "
            >
              收起
            </div>
          </div>
        </div> -->
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
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import api from "../api/juejinapi";
import TopicList from "./TopicList.vue";
import comment from "./comment.vue";
export default {
  components: { TopicList, comment },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      topic: {},
      pinList: [],
      curMsgId: "",
      sort: 0,
    });
    const topic_id = route.params.topic_id;
    api.queryTopicDetail(topic_id).then((res) => {
      state.topic = res.data;
    });

    const toBack = () => {
      router.back();
    };

    const sortTopic = (sort, sort_type) => {
      state.sort = sort;
      api.topic("0", sort_type, topic_id).then((res) => {
        console.log(res);
        state.pinList = res.data;
      });
    };
    sortTopic(0, 500);
    const toMore = (path) => {
      router.push(`/topicdetailsmore/${path}`);
    };
    return {
      ...toRefs(state),
      toBack,
      sortTopic,
      toMore,
    };
  },
};
</script>

<style lang="less">
.topic-details-box {
  & .topic-info-box {
    box-sizing: border-box;
    width: 100%;
    height: 220px;
    background-color: #3d3d3b;
    color: #fff;
    & .back {
      padding-top: 10px;
      margin-left: 10px;
    }
    & .topic-box {
      background-color: #3d3d3b;
      border: none;
      & .topic {
        border: none;
      }
    }
    & .more {
      margin-top: 10px;
      font-size: 12px;
    }
  }
  & .topic-list-box {
    padding: 10px;
    background-color: #fff;
    & .comment {
      margin: 10px 0;
      border-bottom: 1px solid #f4f4f4;
    }
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
  }

  & .topic-sort {
    display: flex;
    margin: 10px;
    & .sort-title {
      width: 80px;
    }
    & .sort-opt {
      flex: 1;
      text-align: right;
      & .active {
        color: #1e80ff;
      }
    }
  }
}
</style>
