<template>
  <van-nav-bar title="签到赢好礼" left-arrow @click-left="back" />
  <div style="overflow-y: scroll">
    <div class="checkin-module">
      <div>
        <div style="float: left; margin-left: 8px; margin-top: 5px">
          <div style="height: 24px; line-height: 24px">
            <van-image :src="reSignCard" style="width: 21px; height: 24px" />
            <div style="display: inline-block; color: #fff; font-size: 14px">
              补签卡：{{ reSignCardCount }}张
            </div>
          </div>
        </div>
        <div
          style="
            float: right;
            color: #bbb;
            font-size: 14px;
            margin-right: 8px;
            margin-top: 5px;
          "
          @click="showCheckRules"
        >
          签到规则
        </div>
      </div>
      <div class="checkin-count">
        <div class="days">
          <div>连续签到天数</div>
          <div>{{ days }}</div>
        </div>
        <div>|</div>
        <div class="days">
          <div>当前矿石数</div>
          <div>{{ currentPoint }}</div>
        </div>
      </div>
      <div style="text-align: center; padding-bottom: 20px">
        <div class="luck-button" @click="luck">去抽奖 >></div>
        <div class="luck-button" @click="exchange" style="margin-left: 8px">
          去兑换 >>
        </div>
      </div>
    </div>

    <van-calendar
      :show-title="false"
      readonly
      :min-date="minDate"
      :max-date="maxDate"
      :poppable="false"
      :show-confirm="false"
      :style="{ height: '420px' }"
      :formatter="formatter"
    />
    <div
      style="
        height: 72px;
        line-height: 72px;
        background: #e8f3ff;
        border-radius: 10px;
        margin-left: 5px;
        margin-right: 5px;
        margin-top: 8px;
        text-align: center;
        font-size: 16px;
        color: #1e80ff;
      "
    >
      累计签到天数：{{ totalDays }} 天
    </div>
    <a
      target="_self"
      href="https://juejin.cn/game/haidijuejin/?utm_campaign=hdjjgame&utm_medium=user_center"
    >
      <div class="sea"></div
    ></a>
    <div class="luck-today">
      <div class="luck-today-top">
        {{ new Date().toString("yyyy.MM.dd") }}
      </div>
      <div class="luck-today-middle">
        <div style="font-size: 24px; color: #1e80ff; margin-left: 20px">
          {{ luckShort }}
        </div>
        <div style="margin-left: 20px">
          {{ luckDesc }}
        </div>
      </div>
      <div class="luck-today-bottom">
        <div class="logo-text" data-v-357c54b7="">
          <img
            src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg"
            alt="juejin-logo"
            class="logo"
            data-v-357c54b7=""
          />
          <div class="text" data-v-357c54b7="">扫描右侧二维码分享给好友</div>
        </div>
        <img
          src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/web-qrcode.90661f6.png"
          style="width: 48px; height: 48px"
        />
      </div>
    </div>
  </div>
</template>


<script>
import { reactive, toRefs, onComputed } from "vue";
import { useRouter } from "vue-router";
import api from "../api/juejinapi";
import utils from "../utils/utils";
import reSignCard from "../assets/images/re-sign-card.png";
import seaBottom from "../assets/images/sea-bottom.png";
import { Dialog } from "vant";

export default {
  setup() {
    const state = reactive({
      days: 0,
      totalDays: 0,
      currentPoint: 0,
      minDate: new Date(),
      maxDate: new Date(),
      data: [],
      reSignCardCount: 0,
      luckShort: "",
      luckDesc: "",
      ruleDialog: true,
      checkinRules: "",
    });
    const router = useRouter();
    const back = function () {
      router.push("/");
    };
    api.getCount().then((res) => {
      state.days = res.data.cont_count;
      state.totalDays = res.data.sum_count;
    });
    api.getPoint().then((res) => {
      state.currentPoint = res.data;
    });
    api.getSignCard().then((res) => {
      state.reSignCardCount = res.data;
    });
    api.getCalendar().then((res) => {
      state.luckShort = res.data.should_or_not;
      state.luckDesc = res.data.aphorism;
    });
    api.getRulesText().then((res) => {
      res.data.forEach((element) => {
        state.checkinRules += element.text_bold + element.text_plain;
      });
    });
    const getDate = async function () {
      let { data } = await api.getMonth();
      const currentDate = new Date();
      const curM = currentDate.getMonth();
      const curY = currentDate.getFullYear();
      state.minDate = new Date(curY, curM, 1);
      state.maxDate = new Date(curY, curM, data.length);
      state.data = data;
    };
    getDate();
    const formatter = function (day) {
      const date = day.date.getDate();
      state.data.forEach((item) => {
        let d = new Date(utils.getLocalTime(item.date)).getDate();
        if (date === d) {
          if (item.status === 3) {
            day.bottomInfo = `+${item.point}`;
            day.topInfo = "☑";
            day.className = "day";
          } else if (item.status === 1 && d === new Date().getDate()) {
            day.bottomInfo = `+${item.point}`;
            day.topInfo = "♥";
          } else if (item.status === 0 && d === new Date().getDate()) {
            day.bottomInfo = `未签`;
          } else if (item.status === 4) {
            day.bottomInfo = `+${item.point}`;
            day.className = "day-future";
          }
        }
      });
      return day;
    };

    const showCheckRules = function () {
      Dialog.alert({
        title: "签到规则",
        message: state.checkinRules,
        theme: "round-button",
        confirmButtonText: "关闭",
        messageAlign: "left",
      }).then(() => {
        // on close
      });
    };

    const luck = function luck() {
      router.push("/luck");
    };
    const exchange = function exchange() {
      router.push("/exchange");
    };
    return {
      ...toRefs(state),
      back,
      formatter,
      reSignCard,
      seaBottom,
      showCheckRules,
      luck,
      exchange,
    };
  },
};
</script>

<style lang="less">
.day {
  color: #1e80ff;
}
.day-future {
  color: #b7b7b7;
}

.checkin-module {
  background-color: hsl(214, 100%, 56%);
  border-radius: 5px;
}
.checkin-count {
  display: flex;
  align-content: center;
  width: 100%;
  height: 150px;
  line-height: 120px;
  text-align: center;
  color: #fff;
  & .days {
    display: flex;
    flex-direction: column;
    & div {
      width: 180px;
      height: 20px;
      font-size: 14px;
    }
    & div:nth-child(2) {
      font-size: 36px;
      margin-top: 8px;
    }
  }
}
.luck-button {
  box-sizing: border-box;
  display: inline-block;
  width: 100px;
  padding: 5px;
  border-radius: 20px;
  font-size: 16px;
  color: #fff;
  border: 1px solid #b7b7b7;
}
.sea {
  height: 125px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 8px;
  background-image: url("https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/1024.39de3c0.png");
}
.luck-today {
  height: 700px;
  margin-top: 8px;
  margin-left: 5px;
  margin-right: 5px;
  &-top {
    height: 180px;
    padding: 30px 0 30px 24px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    box-sizing: border-box;
    background-image: url("https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/web-png.b00ed3b.png");
    background-repeat: no-repeat;
    color: #e8f3ff;
    background-size: 100% 158px;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    font-size: 18px;
  }
  &-middle {
    margin-bottom: 20px;
  }
  &-bottom {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    background-color: #f7f8fa;
    border: 1px solid #e5e6eb;
    border-top: none;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
  }
}
</style>