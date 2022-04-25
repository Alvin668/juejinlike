<template>
  <div class="badge-wall">
    <div class="badge-header">
      <div class="user-info">
        <div class="avatar-box">
          <img :src="badgeInfo.user_info.avatar_large" class="avatar" />
        </div>
        <div class="user-name">
          <span class="badge-username">
            {{ badgeInfo.user_info.user_name }}
          </span>
          <img
            :src="badgeInfo.user_info.badges.wear_badges[0].image_url"
            class="badge-icon"
          />
        </div>
        <div class="obtain-count">
          已获得 {{ badgeInfo.user_info.badges.obtain_count }} 枚徽章
        </div>
      </div>
    </div>
    <div class="badge-list">
      <div class="badge-list-wrap">
        <ul>
          <li class="serie">
            <div class="serie-title">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAGCAYAAACFIR03AAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGnSURBVHgBbVNLdsIwDBwpOK+PRRflAt33Ej0al+yqGy7Arp9XIFZHloxDqR9BijSWRp8I9qbPwPzxhXLaouwK5QllEsyXCUUN81RRhHKhVNqE+CopgY1L4XutlMSYNl/3t1hGO2g3C7uFv1S/6zbedxu6TwYWoc+SfpeJLYo3yOEJhh3wSMsnn4fCK45cIDNuz4XPIsS7tJB+alcmQLVprCX8lTgWDLOBdV+/YxkvsvI+NRYlLCIs1mTP5WGsK7p/4cs7nH8723MPA5wmYirk5MQrcRv4DxMD3pCn7pwlidRgZo1IJBO9JQiVkeeGqERxXlQvGBlXIoIElHUTrXtO4HUHOR5p+RlB+wTOCpuDjWS3muRayJRJtQ4fO22KMQHLhBXXHkq10BV/jhPtdovqe6c76R4liwnswf9yBGy3fTvqMopx8r5wvj8crbUVWlZJp+y6P7RXxXUCvWcrsqZpq1hNDXfFOPEgK/jvtFW6xu0rZDPu4Jy/8YNuK+THV8hJO72mLwOrPqlk4xOQ2rq63nHf/WZV5Jqkni1efRpRh6P7MJrdRo2/AqrHkeBWUykAAAAASUVORK5CYII="
                class="series-left"
              />
              <div class="title">
                {{ badgeInfo.badge_info[0].series.series_name }}
              </div>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAGCAYAAACFIR03AAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGgSURBVHgBbVNBbtwwDBzSyuaQHgr0XLTn/qfvaf7T9yRA7rkmlyBA1rLFDEmtLS8iQCJFkWMOScvPf7aIoBpQAcyC0GfqVdIWdst72EM3btnfDu9GnI6pjXZFXZG28PdY2m3CrNSNetP8rq4pp4k2ypWy0LZU1HqDejqjfvuO+emZ3/pBfIKCgIdFk5u3y3a6tNixKKxdxfpSCf+MUaAhI1pLqa4rdWKRGFZNe+nxRSG2DnvpWO8EvYW9vKTfvWP15O2Yb1hkyMk2D6YvcngDSZgOIG3A7MmLv6v2uMa7Y5DQxOs04JWSLZdpyKmkfndHsFP6/n6D3D8ETpTbpcmRyZHanrJYt5J8APSKR+ewryNJP1avGKT1ikODxOa3+OZxg5zFUM7Ax8dOQs499hfwt0P0XMbiY+uA9cR0T9w2nyHVNphUdhjt1Y/FcjfJbnVWBt3jygB58qPGyOC2YOuRzamVV9j/P471xQxfkhoJ+Zg4kXblY5deDSPXNppJbCTHi1y64YTiZY0pyApfZeREzqy+lfyO/wP8ebFwhPAI+QRgPNl+sExIwgAAAABJRU5ErkJggg=="
                class="series-right"
              />
            </div>
            <ul class="badge-icon-list">
              <li
                class="badge-icon-item"
                v-for="item in badgeInfo.badge_info[0].badges"
                :key="item.badge.badge_id"
              >
                <div class="badge-item-icon">
                  <!-- :class="{ 'not-obtain': item.user_badge.status === 0 }" -->
                  <img :src="item.badge.image_url" />
                </div>
                <div class="badge-desc">{{ item.badge.badge_name }}</div>
                <div class="obtain-date">
                  {{ dateConvert(item.user_badge.obtain_time) }}
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import api from "../api/juejinapi";
import utils from "../utils/utils";
export default {
  setup() {
    const state = reactive({
      badgeInfo: {},
    });

    api.badgeList().then((res) => {
      state.badgeInfo = res.data;
      console.log(res.data);
    });

    const dateConvert = (date) => {
      return utils.getLocalDate(date);
    };

    return {
      ...toRefs(state),
      dateConvert,
    };
  },
};
</script>
<style lang="less">
.badge-wall {
  box-sizing: border-box;
  background-color: #fff;
  & .badge-header {
    height: 269px;
    background: url(//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/98570e28d7699e6530e0aece945c7281.svg);

    & .user-info {
      padding: 20px 0;
      width: 100%;
      position: relative;
      top: 40px;
      & .avatar-box {
        margin: 0 auto;
        width: 64px;
        height: 64px;
        & .avatar {
          cursor: pointer;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      & .user-name {
        font-size: 14px;
        text-align: center;
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        color: #fff;
        margin-top: 8px;
        height: 30px;
        line-height: 30px;
        margin-right: 4px;
        & .badge-username {
          display: inline-block;
          vertical-align: middle;
          cursor: pointer;
          font-size: 14px;
          text-align: center;
          font-family: PingFang SC;
          font-style: normal;
          font-weight: 600;
          color: #fff;
          margin-top: 8px;
          height: 30px;
          line-height: 30px;
          margin-right: 4px;
        }

        & .badge-icon {
          margin-left: 4px;
          vertical-align: middle;
          width: 24px;
          height: 24px;
        }
      }

      & .obtain-count {
        font-size: 12px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 400;
        color: #e4e6eb;
      }
    }
  }

  & .badge-list {
    margin-top: -86px;
    position: relative;
    z-index: 1;
    background-color: #fff;
    border-radius: 12px 12px 0 0;
    padding: 0 16px;
    margin-bottom: 32px;
    padding-bottom: 30px;

    &-wrap {
      & .serie {
        margin: 32px 0 24px;
        & .serie-title {
          margin-bottom: 16px;
          height: 32px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          & .title {
            font-size: 18px;
            font-family: PingFang SC;
            font-style: normal;
            font-weight: 600;
            color: #1d2129;
            margin: 0 16px;
          }
          & .series-left,
          & .series-right {
            width: 16px;
            height: 2px;
          }
        }

        & .badge-icon-list {
          grid-template-columns: repeat(auto-fill, 26.1vw);
          grid-gap: 5.6vw 0;
          display: grid;
          justify-content: space-between;
          flex-wrap: wrap;

          & .badge-icon-item {
            width: 26.1vw;
            -webkit-tap-highlight-color: transparent;
            cursor: pointer;
            font-family: PingFang SC;
            font-style: normal;
            font-weight: 400;
            & .badge-item-icon {
              width: 26.1vw;
              height: 26.1vw;
              & img {
                width: 100%;
                height: 100%;
              }
            }

            & .not-obtain {
              filter: grayscale(100%);
            }

            & .badge-desc {
              font-size: 14px;
              line-height: 24px;
              margin-top: 4px;
              text-align: center;
              color: #1d2129;
            }

            & .obtain-date {
              font-size: 12px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              color: #86909c;
            }
          }
        }
      }
    }
  }
}
li {
  list-style: none;
}
</style>
