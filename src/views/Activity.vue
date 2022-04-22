<template>
  <van-nav-bar title="活动" left-arrow @click-left="toBack" />
  <van-tabs @click-tab="switchCity">
    <van-tab
      :title="c.city_name"
      :name="c.city_alias"
      v-for="c in cityList"
      :key="c.city_alias"
    >
      <event-list :city="c.city_alias" />
    </van-tab>
  </van-tabs>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import api from "../api/juejinapi";
import { useRouter } from "vue-router";
import EventList from "./EventList.vue";
import { useStore } from "vuex";
export default {
  components: { EventList },
  setup() {
    const state = reactive({
      cityList: [],
    });
    const router = useRouter();
    const store = useStore();

    const toBack = () => {
      router.back();
    };
    api.citys().then((res) => {
      state.cityList = res.data.banner_citys;
      state.cityList.unshift({ city_alias: "", city_name: "全部" });
      state.cityList.push({ city_alias: "buxian", city_name: "其他" });
    });
    const switchCity = (tab) => {
      store.state.refreshList();
    };
    return {
      ...toRefs(state),
      toBack,
      switchCity,
    };
  },
};
</script>

<style></style>
