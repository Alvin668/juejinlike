<template>
  <div class="comment-box">
    <div class="author">
      <van-image class="photo" round :src="avatar_large" />
      <div style="display: flex; flex-direction: column">
        <div class="author-title">
          {{ user_name }}
          <span v-if="is_author">（作者）</span>
        </div>
        <div class="pub-time">
          {{ job_title }} @ {{ company }} ·
          {{ publishTime(ctime) }}
        </div>
      </div>
    </div>
    <div class="content">
      <div style="overflow: hidden; line-height: 20px">
        <span style="white-space: pre-line"> {{ content }}</span>

        <div
          v-if="is_current_user === current_user"
          class="del"
          @click="deleteComment"
        >
          删除
        </div>
      </div>
      <div
        class="limit-btn"
        v-if="origin_content.length >= 80 && content.length <= 83"
        @click="showFullContent(comment_id)"
      >
        展开
      </div>
      <div
        class="limit-btn"
        v-if="origin_content.length >= 80 && content.length > 83"
        @click="hideFullContent(comment_id)"
      >
        收起
      </div>
      <van-image
        :src="pic"
        v-for="(pic, $index) in pic_list"
        :key="$index"
        class="image"
        @click="showImage(pic)"
      />
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import utils from "../utils/utils";
import api from "../api/juejinapi";
import { Dialog } from "vant";
export default {
  name: "comment",
  props: {
    avatar_large: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    job_title: String,
    company: String,
    ctime: {
      type: String,
      required: true,
    },
    sub_content: {
      type: String,
      required: true,
    },
    origin_content: {
      type: String,
      required: true,
    },
    comment_id: {
      type: String,
      required: true,
    },
    pic_list: {
      type: Array,
    },
    is_author: {
      type: Boolean,
      default: false,
    },
    is_current_user: {
      type: String,
      default: "",
    },
  },
  components: { Dialog },
  setup(props, ctx) {
    const { sub_content, origin_content, comment_id } = props;
    const state = reactive({ content: sub_content, current_user: "" });
    const publishTime = utils.getPublishTime;

    const showFullContent = function (msg_id) {
      state.content = origin_content;
    };

    const hideFullContent = function (msg_id) {
      state.content = sub_content;
    };

    const showImage = (imgUrl) => {
      ctx.emit("showImage", imgUrl);
    };

    api.profileIdGet().then((res) => {
      state.current_user = res.data.profile_id;
    });

    const deleteComment = () => {
      Dialog.confirm({
        title: "操作提示",
        message: "删除后不可恢复，确定要删除吗？",
      })
        .then(async () => {
          // on confirm
          const res = await api.delete(comment_id);
          ctx.emit("delComment", res);
        })
        .catch(() => {
          // on cancel
        });
    };

    return {
      ...toRefs(state),
      publishTime,
      showFullContent,
      hideFullContent,
      showImage,
      deleteComment,
    };
  },
};
</script>
<style lang="less">
.author {
  display: flex;
  & .photo {
    width: 35px;
    height: 35px;
    display: inline-block;
  }
  & .author-title {
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    margin-left: 15px;
  }
  & .pub-time {
    margin-left: 15px;
    color: #8a919f;
  }
}
.content {
  position: relative;
  padding: 10px 20px;
  font-size: 12px;
  line-height: 1.6;
  color: #17181a;
  overflow: hidden;
  line-height: 20px;
  & .image {
    width: 150px;
    height: 150px;
  }

  & .limit-btn {
    display: inline-block;
    margin-top: 0.4rem;
    color: #007fff;
    cursor: pointer;
    user-select: none;
  }
  & .del {
    position: absolute;
    color: red;
    right: 10px;
    top: 15px;
    display: none;
  }
}
& .comment-box:hover {
  & .del {
    display: block;
  }
}
</style>
