<template>
  <div class="topic-box">
    <div
      class="topic"
      v-for="item in data"
      :key="item.topic_id"
      @click="toDetails(item.topic_id)"
    >
      <van-image :src="item.topic.icon" />
      <div class="topic-content">
        <div class="topic-title">{{ item.topic.title }}</div>
        <span class="topic-info"
          >{{ item.topic.follower_count }}掘友·{{
            item.topic.msg_count
          }}沸点</span
        >
      </div>
      <div class="topic-opt" @click="showPopup" v-if="isJoin">
        <van-icon name="ellipsis" size="20px" />
      </div>
      <div
        v-else
        class="topic-join"
        :class="{ 'join-in': !item.user_interact.is_follow }"
      >
        <div class="join" v-if="item.user_interact.is_follow">已加入</div>
        <div class="join" v-else>加入</div>
      </div>
      <van-popup v-model:show="show" position="bottom">
        <div class="cancel-follow" @click="cancelFollow(item.topic.topic_id)">
          取消加入
        </div>
        <div class="close" @click="closePop">取消</div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "",
  props: {
    data: {
      type: Array,
      required: true,
    },
    isJoin: {
      type: Boolean,
      default: true,
    },
  },
  components: {},
  setup() {
    const router = useRouter();
    const state = reactive({
      show: false,
    });

    const showPopup = () => {
      state.show = true;
    };

    const closePop = () => {
      state.show = false;
    };

    const cancelFollow = (topic_id) => {
      api.cancelFollow(topic_id, 11).then((res) => {
        state.show = false;
      });
    };
    const toDetails = (topic_id) => {
      router.push(`/topicdetails/${topic_id}`);
    };
    return {
      ...toRefs(state),
      showPopup,
      closePop,
      cancelFollow,
      toDetails,
    };
  },
};
</script>
<style lang="less">
.topic-box {
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  border-top: 1px solid #f4f4f4;
  & .topic {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f4f4f4;
    padding: 10px;
    & img {
      width: 80px;
      height: 80px;
    }

    & .topic-content {
      flex: 1;
      margin-left: 20px;
      & .topic-title {
        font-size: 18px;
        font-weight: bold;
      }
      & .topic-info {
        font-size: 16px;
        color: #8a919f;
      }
    }

    & .topic-opt {
      width: 20px;
    }
  }

  & .cancel-follow {
    padding: 20px;
    text-align: center;
    color: #1e80ff;
    font-size: 18px;
  }

  & .close {
    padding: 20px;
    text-align: center;
    font-size: 18px;
    background-color: #f4f4f4;
  }

  & .topic-join {
    width: 50px;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid #f4f4f4;
    background-color: #f4f4f4;
    border-radius: 2px;
    padding: 5px;
  }

  & .topic-join.join-in {
    color: #1e80ff;
    border: 1px solid #eaf2ff;
    background-color: #eaf2ff;
  }
}
</style>
