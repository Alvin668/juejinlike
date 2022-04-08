<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in recommendList"
          :key="
            item.article_info
              ? item.article_info.article_id
              : item.item_info.article_id || item.item_info.advert_id
          "
        >
          <div class="article-list">
            <div
              v-if="item.item_type === 14"
              data-v-02f416ca=""
              data-v-058f449f=""
              data-v-0bc399c0=""
              st:name="link"
              class="advertisement"
              enable-dislike-button="true"
            >
              <div data-v-02f416ca="" class="meta-container">
                <div data-v-02f416ca="" class="user-message">
                  <a
                    data-v-02f416ca=""
                    href="/user/1556564194374926"
                    target="_blank"
                    rel=""
                    st:name="user"
                    st:state="1556564194374926"
                    class="userbox"
                    ><div
                      data-v-76abb21e=""
                      data-v-39c3a12c=""
                      data-v-02f416ca=""
                      class="popover-box user-popover"
                    >
                      <!---->
                      {{ item.item_info.author_name }}
                    </div></a
                  >
                </div>
                <div data-v-02f416ca="" class="dividing"></div>
                <div data-v-02f416ca="" class="date">
                  {{ item.item_info.ctime }}
                </div>
              </div>
              <div data-v-02f416ca="" class="tag">广告</div>
              <div data-v-02f416ca="" class="main">
                <div data-v-02f416ca="" class="info-box">
                  <a
                    data-v-02f416ca=""
                    href="https://juejin.cn/post/7052884569032392740?utm_source=feed_1&amp;utm_medium=feed&amp;utm_campaign=gengwen202201_yq"
                    target="_blank"
                    class="title"
                    >{{ item.item_info.title }}</a
                  >
                  <a
                    data-v-02f416ca=""
                    href="https://juejin.cn/post/7052884569032392740?utm_source=feed_1&amp;utm_medium=feed&amp;utm_campaign=gengwen202201_yq"
                    target="_blank"
                    class="description"
                  >
                    {{ item.item_info.brief }}
                  </a>
                </div>
                <img
                  data-v-2a2c158c=""
                  data-v-02f416ca=""
                  :src="item.item_info.picture"
                  :alt="'「' + item.item_info.title + '」封面'"
                  class="lazy thumb"
                  style=""
                />
              </div>
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
                    (item.article_info
                      ? item.article_info.article_id
                      : item.item_info.article_id)
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
                      item.author_user_info
                        ? item.author_user_info.user_name
                        : item.item_info.author_user_info.user_name
                    }}
                  </div></a
                >
                <div data-v-1685671c="" class="date">
                  {{
                    item.article_info
                      ? item.article_info.ctime
                      : item.item_info.article_info.ctime
                  }}
                </div>
                <div data-v-1685671c="" class="tag_list">
                  <a
                    v-for="tag in item.article_info
                      ? item.article_info.tags
                      : item.item_info.tags"
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
                        (item.article_info
                          ? item.article_info.article_id
                          : item.item_info.article_info.article_id)
                      "
                      target="_blank"
                      rel=""
                      :title="
                        item.article_info
                          ? item.article_info.title
                          : item.item_info.article_info.title
                      "
                      class="title"
                      >{{
                        item.article_info
                          ? item.article_info.title
                          : item.item_info.article_info.title
                      }}</a
                    >
                  </div>
                  <div data-v-1685671c="" class="abstract">
                    <a
                      data-v-1685671c=""
                      :href="
                        '/post/' +
                        (item.article_info
                          ? item.article_info.article_id
                          : item.item_info.article_info.article_id)
                      "
                      target="_blank"
                      rel=""
                    >
                      {{
                        item.article_info
                          ? item.article_info.brief_content
                          : item.item_info.article_info.brief_content
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
                        item.article_info
                          ? item.article_info.view_count
                          : item.item_info.article_info.view_count
                      }}</span>
                    </li>
                    <li
                      :id="`like${
                        item.article_info
                          ? item.article_info.article_id
                          : item.item_info.article_info.article_id
                      }`"
                      data-v-1685671c=""
                      class="item like"
                      :class="{
                        active: item.user_interact
                          ? item.user_interact.is_digg
                          : item.item_info.user_interact.is_digg,
                      }"
                      @click="
                        digg(
                          item.article_info
                            ? item.article_info.article_id
                            : item.item_info.article_info.article_id
                        )
                      "
                    >
                      <i data-v-1685671c=""></i>
                      <span
                        data-v-1685671c=""
                        :id="`likecount${
                          item.article_info
                            ? item.article_info.article_id
                            : item.item_info.article_info.article_id
                        }`"
                      >
                        {{
                          item.article_info
                            ? item.article_info.digg_count
                            : item.item_info.article_info.digg_count
                        }}
                      </span>
                    </li>
                    <li data-v-1685671c="" class="item comment">
                      <i data-v-1685671c=""></i>
                      <span data-v-1685671c="">
                        {{
                          item.article_info
                            ? item.article_info.comment_count
                            : item.item_info.article_info.comment_count
                        }}
                      </span>
                    </li>
                  </ul>
                </div>
                <img
                  data-v-2a2c158c=""
                  data-v-1685671c=""
                  v-show="
                    item.article_info
                      ? item.article_info.cover_image
                      : item.item_info.article_info.cover_image
                  "
                  :src="
                    item.article_info
                      ? item.article_info.cover_image
                      : item.item_info.article_info.cover_image
                  "
                  :alt="
                    item.article_info
                      ? item.article_info.title
                      : item.item_info.article_info.title
                  "
                  class="lazy thumb"
                  style=""
                />
              </div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import http from "../api/http";
import api from "../api/juejinapi";
import { useStore } from "vuex";
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      default: 20,
    },
    sort_type: {
      type: Number,
      default: 200,
    },
    cateId: {
      type: String,
    },
  },
  setup(props, context) {
    const store = useStore();
    const state = reactive({
      loading: false,
      finished: false,
      refreshing: false,
      recommendList: [],
    });
    let pageNo = 0;
    const { limit, sort_type, url, cateId } = props;

    const onLoad = function () {
      let api_url = store.state.url,
        tagId = store.state.tagId;
      http
        .post(api_url, {
          cursor: pageNo,
          limit: limit,
          sortType: sort_type,
          cateId: cateId,
          tagId: tagId,
        })
        .then((res) => {
          if (state.refreshing) {
            state.recommendList = [];
            state.refreshing = false;
          }
          state.recommendList.push(...res.data);
          state.loading = false;

          if (pageNo >= 50) {
            //只加载50页（1000条）数据
            state.finished = true;
          }
          pageNo++;
        });
    };

    const onRefresh = function (params) {
      pageNo = 0; //从第一页重新加载
      state.finished = false; //清空列表数据，重新加载
      state.loading = true;
      state.refreshing = true;
      onLoad();
    };
    store.commit("setRefresh", onRefresh);
    const digg = function digg(article_id) {
      const likeli = document.querySelector(`#like${article_id}`),
        likespan = document.querySelector(`#likecount${article_id}`);
      if (likeli.classList.contains("active")) {
        likeli.className = "item like";
        api.cancelDigg(article_id, 2).then((res) => {
          console.log(res);
        });
        likespan.innerText = parseInt(likespan.innerText) - 1;
      } else {
        likeli.className = "item like active";
        // [].push.call(likeli.classList, "active");
        api.saveDigg(article_id, 2).then((res) => {
          console.log(res);
        });
        likespan.innerText = parseInt(likespan.innerText) + 1;
      }
    };
    return {
      ...toRefs(state),
      onLoad,
      onRefresh,
      digg,
    };
  },
};
</script>

<style lang="less">
.article-list {
  padding-bottom: 50px;
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
}
.action-list[data-v-1685671c] {
  display: flex;
  align-items: center;
  & > .item[data-v-1685671c] {
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 20px;
    font-size: 13px;
    line-height: 20px;
    color: #4e5969;
    flex-shrink: 0;
    & i[data-v-1685671c] {
      display: block;
      width: 16px;
      height: 16px;
      background-size: 100%;
    }
    & span[data-v-1685671c] {
      margin-left: 4px;
    }
  }
  & .item.comment i[data-v-1685671c] {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKRSURBVHgB7VZNbtpQEJ55BlR15RvUOUHTG5ATJD1BQ9NU6gq8JKiKoyrJ0u2qUmkFOUGaE5TegJwg7gnqLRh7MvMwwiDbYHCUDZ9kHph5M9+bN38AO+zwzEAoiEv3xz4v/KAFiK/0S6J/qPCBoui+Y38cFlC3HgHH7Zk1FTXZUIt/mivEPVY6GFFw4difPNiWwNW3X+dLhj1iA3JqProXq7EQ8TVoz4A1147OWfPkAjYhcO1+twirt7FSEexPiG4+26cDyMEXt1s3AI7Z+LsZ4TEFB1newBzjf2B6Gi8kaqwyvEpHFgmVtjmxcTgm401R44I2G0M2KjpEV5W9KbG0koC+8znrt47d8GFDCAk+gJCQwNyvwqS1LLNwBbHbHuQ7G99bJ4rXgY4LRPGqz4T2koda8EAERl2zIrory7hArlBnDmdSDSbHyf8WrwDVNHKV0YOyQdGNXhAPMwlgnHKjaHQPJUNBOEjamL9fhI7SMt0/Q3uu08wjoJGWLk+FZQKefLyEwIKSETcxwTCbANFfWQLAIygZCFifrjkEQq73WgixCaUziHWi+p1JIC65Hj/mpdt1oCQkq2u7+f4uk4BAGo8minguFQy2hFRXvlonqTuXgK5aRLqHc/m8vXK7LdgCE6hYskolTGtqqWnYsU+dmITJrnCvv/7sOXKSDVCBiScrJgeVBHInIokDuYqEsB5KQqgMl7uk1A4DwrpCkFLLExL0x1HAWfXCr2H4X2TOWh+wEAGB7pBQcRITzgwymvmxEilcVtp+cX1cfs20Drv2VKyDSVUPI4Ij3lRPEfFJclzXEvIQlXhioZ4QYaNjn/Q3IrAMiQmDA0wB+QGEflr/ENK6xXOXFS8QRQdFx/YdnhyP1D0hcwr1KvEAAAAASUVORK5CYII=);
  }
  & .item.view i[data-v-1685671c] {
    background-image: url(//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/view.1eda8fa.png);
  }

  & .item.like i[data-v-1685671c] {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJ9SURBVHgB7VZNbtNQEP7GP7AkN8DcoJyA5gRNTwCR2kqsUm9YEKEaoZRl0hUSBLWcAHOCpjdIT1AfIewgTjzM+AccxwHXLRYS/STnvbyxZ743b34e8L+DcEMMhu+fERk7DLTAuAwRjjz3eVD1+xsROD75eARmr7AczDlsVyVhoCbeDt85mXHmqLtkbst0Ko9jk31aVU9tAgvYW7FxYNJ3D85eufuTOZtKYiZu3X4z/LBdRU9tAia4E0+YL7I1z+3OmPEpkWOrip7aBED0RAcb7K8KeBb/alD+LQIa+TI48kxfuAfTVSlVMlybgAafpN1RYgujopwIOzpGEhuogGuloTc8bd2j5TmS8/VfHu7t5uUaeCaRygORPaqi00JFJAVn2UuNa667xXfEeJZ+rePR+Kool7gIQg67+RpBJTvo5QMoZHPXxFLW8Tld2lhoUqMOfg/JlKjdT2Pnpwf0bDlx3worG1EnPlENF0m5OayO5+7NyjRLHXgMfCsNQhumrBviRfRAhnqyu0KAYXmpcX/BfKKekL+dvBIheOUddkuNK7QO6A43ycXDvolYr5OtGTnlD3VU41rVZLdfccvIipMYDdYINAHZZJyicgR+4wQ0hbVH6Px7RBeNE9BM0lGbVxorTRNImhcxf8mvNxcDafOywBM0TUCqqEa/I09QbF6NECDQdjKuN6hGCJSlX2MENqXfGgFKS6hlmA9wi7hvLJ/qWEy/DL96AfMlEXWkU/mD0XiCkjud7kRk56iOltwRYz3ShM7KXlhpx4PheBR3qxzS6zbSi0YtyOZe9919D38ioNC2vIDl6NyQC2bWtzWVomvf93gWwg7KXH+HfwY/AGsn+Lf3Dim6AAAAAElFTkSuQmCC);
  }
  & .item.like.active i[data-v-1685671c] {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG1SURBVHgB7ZdbTsJAFIb/MwWMEZI+moix7oAdCCsQdwAr4F00VI0+4wrUFagrAHcAO5h4SXxsxISEtjNOJZByCRTo5UG/J+YMw3y055xpgb8OYUP2z/sVgB2rn9KlRNdJuc1Pc5sHXb+RQP7MbhBJcyrMbc0tBZVgWJNds2/M2dzDSLvaHQKytkDaYYUF08V8vV9ElAKK8qJJCVokGIIA4WjxNOmISmCY+WQgBFYW8JJPLWss/6ZoIwArlaFuSj3r2C0iLLu//O0qc4gwBfZOBxViqAXY3MNSaWjN2c7rEVV/j5gQyNftIjFRgy+Ber30SS47KILoEeFgCRelj5tMxxukRtHfxuLK1vRF2cnZZeEKME1DSOhMg/qTqHqDcRKqxmIiPozRB18V0AHig2NWIEaIPSFJgd6X9oIEBdpWk6zEBIQQz/5x/FdAsjYSFOCjBpSUQHs6EK+Ar/wSEfCX36wAkYVomSi/GQEpRBcRQsTu58XHAu/XW6Z6sbidWShcrp4BODbZHPLi9TL1MH9uCkMdy449PK1SadfiZrYzjH8XHFsL9KA5wluvDnTOzchv7z/r8wP0gYciEk0ZYQAAAABJRU5ErkJggg==);
  }
}
.abstract[data-v-1685671c] {
  margin-bottom: 10px;
  & a[data-v-1685671c] {
    color: #86909c;
    font-size: 13px;
    line-height: 22px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
}
.title-row[data-v-1685671c] {
  display: flex;
  margin-bottom: 8px;
}
.title[data-v-1685671c]:visited {
  color: #86909c;
}
.title[data-v-1685671c] {
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #1d2129;
  width: 100%;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.popover-box[data-v-76abb21e] {
  display: inline;
}
.thumb[data-v-1685671c] {
  flex: 0 0 auto;
  width: 120px;
  height: 80px;
  margin-left: 24px;
  background-color: #fff;
  border-radius: 2px;
}
.lazy[data-v-2a2c158c] {
  position: relative;
  -o-object-fit: cover;
  object-fit: cover;
}

.van-cell {
  padding: 0 !important;
}
</style>
