<template>
  <div class="comment-reply" :id="`reply${itemId}`" v-show="isShow">
    <div class="reply-input">
      <van-field
        @focus="inputFocus"
        @blur="inputBlur"
        v-model="reply_content"
        placeholder="输入评论(Enter换行，Ctrl + Enter发送)"
      ></van-field>
    </div>
    <div class="reply-opt" v-show="showBtn">
      <span> <van-icon class="reply-icon" name="smile-o"></van-icon>表情 </span>
      <span> <van-icon class="reply-icon" name="photo-o"></van-icon>图片 </span>
      <van-button
        style="float: right"
        :disabled="reply_content === ''"
        type="primary"
        size="small"
        @click="publishComment"
        >发表评论</van-button
      >
      <span style="float: right; margin-top: 9px; color: #8c8c8c"
        >Ctrl + Enter</span
      >
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import api from "../api/juejinapi";
export default {
  props: {
    itemId: {
      type: String,
      required: true,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    msg_id: {
      type: String,
      default: "",
    },
  },
  setup(props, ctx) {
    const state = reactive({ showBtn: false, reply_content: "" });
    const { itemId, msg_id } = props;
    const inputFocus = () => {
      state.showBtn = true;
      const el_input = document.querySelector(`#reply${itemId}`),
        el_con = el_input.querySelector(".van-field__control ");

      el_con.classList.add("active");
    };
    const inputBlur = () => {
      const el_input = document.querySelector(`#reply${itemId}`),
        el_con = el_input.querySelector(".van-field__control ");
      !state.reply_content ? (state.showBtn = false) : null;
      !state.reply_content ? el_con.classList.remove("active") : null;
    };

    const publishComment = async () => {
      let res = null;
      if (msg_id) {
        res = await api.reply(state.reply_content, [], itemId, msg_id);
        ctx.emit("published", { res, itemId: msg_id });
      } else {
        res = await api.publish(state.reply_content, [], itemId);
        ctx.emit("published", { res, itemId });
      }

      state.reply_content = "";
    };

    return {
      ...toRefs(state),
      inputFocus,
      inputBlur,
      publishComment,
    };
  },
};
</script>

<style lang="less">
.comment-reply {
  box-sizing: border-box;
  flex: 1;
  margin-left: 10px;

  & .reply-input {
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

    & .active {
      background-color: #fff;
      border: 1px solid #e5e5e5;
    }
  }

  & .reply-opt {
    margin-top: 10px;

    & .reply-icon {
      margin-right: 3px;
      font-size: 16px;
      top: 2px;
    }

    & span {
      margin-right: 5px;
    }

    & span:hover {
      color: #007fff;
    }
  }
}
</style>
