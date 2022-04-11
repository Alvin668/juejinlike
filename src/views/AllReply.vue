<template>
  <van-nav-bar
    title="沸点详情"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <div class="detail-box">
    <comment
      :avatar_large="pin.author_user_info.avatar_large"
      :user_name="pin.author_user_info.user_name"
      :job_title="pin.author_user_info.job_title"
      :company="pin.author_user_info.company"
      :ctime="pin.msg_Info.ctime"
      :origin_content="pin.msg_Info.content"
      :sub_content="pin.msg_Info.sub_content"
      :comment_id="pin.msg_Info.msg_id"
      :pic_list="pin.msg_Info.pic_list"
      :is_followed="pin.user_interact.is_follow"
    />
    <div style="display: flex">
      <div class="belong-topic" v-show="pin.topic.title">
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
        {{ pin.topic.title }}
      </div>
      <div style="flex: 1 1 auto"></div>
      <div
        class="digg-container digg-box is-link"
        v-show="pin.digg_user.length > 0"
      >
        <div data-v-4e60c69e="" class="list">
          <img
            v-for="digg in pin.digg_user"
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
      <div class="comment">
        <van-icon name="chat-o" />
        {{ pin.msg_Info.comment_count }}
      </div>
      <div
        class="digg"
        :class="{ active: pin.user_interact.is_digg }"
        @click="digg(pin.msg_id, pin.user_interact.is_digg)"
      >
        <van-icon name="good-job-o" />{{ pin.msg_Info.digg_count }}
      </div>
    </div>
  </div>
  <div class="detail-comment-box">
    <div class="title">评论</div>
    <div class="reply-pub">
      <van-image
        round
        width="30px"
        height="30px"
        src="https://p9-passport.byteacctimg.com/img/user-avatar/4eb96a510ba31abc55e029bd74da2be0~300x300.image"
      />
      <reply :itemId="pin.msg_id" :isShow="true" :msg_id="pin.msg_id" />
    </div>
    <div class="title">热门评论<van-icon name="fire-o" color="#ee0a24" /></div>
    <div class="comment-hot" v-for="hot in hots" :key="hot.comment_id">
      <comment
        :avatar_large="hot.user_info.avatar_large"
        :user_name="hot.user_info.user_name"
        :job_title="hot.user_info.job_title"
        :company="hot.user_info.company"
        :ctime="hot.comment_info.ctime"
        :origin_content="hot.comment_info.comment_content"
        :sub_content="hot.comment_info.sub_content"
        :comment_id="hot.comment_info.item_id"
        :pic_list="hot.comment_info.comment_pics"
        :is_followed="false"
      />
      <div class="operation">
        <div class="comment">
          <van-icon name="chat-o" />
          {{ hot.comment_info.reply_count }}
        </div>
        <div
          class="digg"
          :class="{ active: hot.user_interact.is_digg }"
          @click="digg(hot.msg_id, hot.user_interact.is_digg)"
        >
          <van-icon name="good-job-o" />{{ hot.comment_info.digg_count }}
        </div>
      </div>
      <div
        class="comment-reply"
        v-for="rep in hot.reply_infos"
        :key="rep.reply_id"
      >
        <comment
          :avatar_large="rep.user_info.avatar_large"
          :user_name="rep.user_info.user_name"
          :job_title="rep.user_info.job_title"
          :company="rep.user_info.company"
          :ctime="rep.reply_info.ctime.toString()"
          :origin_content="rep.reply_info.reply_content"
          :sub_content="rep.reply_info.reply_content"
          :comment_id="rep.reply_info.item_id"
          :pic_list="rep.reply_info.reply_pics"
          :is_followed="false"
        />
        <div class="operation">
          <div class="comment">
            <van-icon name="chat-o" />
            {{ rep.reply_info.burry_count }}
          </div>
          <div
            class="digg"
            :class="{ active: rep.user_interact.is_digg }"
            @click="digg(hot.msg_id, rep.user_interact.is_digg)"
          >
            <van-icon name="good-job-o" />{{ rep.reply_info.digg_count }}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import comment from "./comment.vue";
import api from "../api/juejinapi";
import { useRoute } from "vue-router";
import { reactive, toRefs } from "@vue/reactivity";
import Reply from "./Reply.vue";
export default {
  components: { comment, Reply },
  setup() {
    const route = useRoute();
    const state = reactive({ pin: {}, hots: [] });
    const onClickLeft = () => {
      history.back();
    };

    const msg_id = route.params.msg_id;
    api.detail(msg_id).then((res) => {
      console.log(res.data);
      res.data.msg_Info.sub_content = res.data.msg_Info.content.substring(
        0,
        80
      );
      res.data.msg_Info.content.length >= 80
        ? (res.data.msg_Info.sub_content += "...")
        : null;
      res.data.msg_Info.show_content = res.data.msg_Info.sub_content;

      state.pin = res.data;
    });

    const digg = (itemid, is_digg) => {
      //   const cur_pin = state.pinList.filter((item) => item.msg_id === itemid);
      //   const cur_com = state.replyList.filter(
      //     (item) => item.comment_id === itemid
      //   );
      //   if (is_digg) {
      //     api.cancelDigg(itemid, 4).then((res) => {
      //       if (cur_pin.length) {
      //         cur_pin[0].msg_Info.digg_count--;
      //         cur_pin[0].user_interact.is_digg = false;
      //       }
      //       if (cur_com.length) {
      //         cur_com[0].comment_info.digg_count--;
      //         cur_com[0].user_interact.is_digg = false;
      //       }
      //     });
      //   } else {
      //     api.saveDigg(itemid, 4).then((res) => {
      //       if (cur_pin.length) {
      //         cur_pin[0].msg_Info.digg_count++;
      //         cur_pin[0].user_interact.is_digg = true;
      //       }
      //       if (cur_com.length) {
      //         cur_com[0].comment_info.digg_count++;
      //         cur_com[0].user_interact.is_digg = true;
      //       }
      //     });
      //   }
    };

    api.hotComment(msg_id).then((res) => {
      console.log(res.data);
      state.hots = [];
      state.hots.push(res.data.shift());
      state.hots.push(res.data.shift());
      console.log(state.hots);
      state.hots.forEach((item) => {
        item.comment_info.sub_content =
          item.comment_info.comment_content.substring(0, 80);
        item.comment_info.comment_content.length >= 80
          ? (item.comment_info.sub_content += "...")
          : null;
        item.comment_info.show_content = item.comment_info.sub_content;
      });
    });

    return {
      ...toRefs(state),
      onClickLeft,
      digg,
    };
  },
};
</script>

<style lang="less">
.operation {
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

.detail-box {
  box-sizing: border-boxs;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  margin-top: 10px;

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
.detail-comment-box {
  margin-top: 10px;
  padding: 10px;
  background-color: #fff;
  & .title {
    font-size: 18px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  & .reply-pub {
    display: flex;
  }
}

.comment-hot {
  margin-top: 20px;
  & .comment-reply {
    background: rgba(247, 248, 250, 0.7);
    margin-left: 20px;
    margin-top: 20px;
  }
}
</style>
