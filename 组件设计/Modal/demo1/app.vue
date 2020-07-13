<template>
  <div class="container">
    text
    <button @click="click1">同步操作</button>

    <button @click="click2">异步操作</button>
  </div>
</template>
<script>
import { CancelModal, CityModal } from "./modal/index";

export default {
  methods: {
    async click1() {
      try {
        let data = await CancelModal.show("调用参数");
        console.log(data, "获取参数");
      } catch (e) {
        console.log(e, "无参关闭");
      }
    },
    async click2() {
      try {
        let data = await CityModal.show("调用参数");
        console.log(data, "获取参数");
      } catch (e) {
        console.log(e, "无参关闭");
      }
    }
  }
};
</script>  