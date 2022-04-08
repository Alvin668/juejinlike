<template>
  <ul class="tag-list">
    <li
      class="tag-item"
      :class="{ active: $index == 0 }"
      v-for="(tag, $index) in tagList"
      :key="tag.tag_id"
      :data-id="tag.tag_id"
      :data-name="categoryName"
      @click="clickTag(tag.tag_id)"
    >
      {{ tag.tag_name }}
    </li>
  </ul>
</template>

<script>
import http from "../api/http";
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    cateId: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
    },
  },
  setup(props, ctx) {
    const store = useStore();
    let tagList = ref([]);
    const { url, cateId } = props;
    http
      .post(url, {
        cateId: cateId,
      })
      .then((res) => {
        tagList.value = res.data;
        tagList.value.unshift({ tag_id: "", tag_name: "全部" });
      });
    const clickTag = function (tagId) {
      const { categoryName } = props;
      const tags = document.querySelectorAll(
        `.tag-item[data-name='${categoryName}']`
      );
      tags.forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("data-id") == tagId) {
          item.classList.add("active");
        }
      });
      let api_url = tagId
        ? "/juejin/recommend_cate_tag_feed"
        : "/juejin/recommend_cate_feed";
      store.commit("setUrl", api_url);
      store.commit("setTagId", tagId);
      store.state.refreshList();
    };
    return {
      tagList,
      clickTag,
    };
  },
};
</script>

<style lang="less">
li {
  list-style: none;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  height: auto;
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  height: 20px;
  overflow: hidden;
  & .tag-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    border: 1px solid #1e80ff;
    border-radius: 1rem;
    font-size: 14px;
    color: #1e80ff;
    padding: 0 8px;
    margin-right: 8px;
    margin-bottom: 8px;
    position: relative;
    cursor: pointer;
  }
  & .tag-item.active {
    background: #1e80ff;
    color: #fff;
  }
}
</style>