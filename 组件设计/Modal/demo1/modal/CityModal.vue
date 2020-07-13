<template>
  <el-dialog title="提示" :visible.sync="$root.open" width="300px">
    <span>点击确定后,依赖回调</span>
    <div>
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="sure" :loading="loading">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { Vue, Component, Watch, Emit } from "vue-property-decorator";
import Modal from "./Modal";

@Component({
  onLoad(params) {
    console.log("onLoad", params);
  }
})
export default class Cmt extends Modal {
  loading = false;
  @Emit
  sure() {
    this.loading = true;
    setTimeout(() => {
      if (Math.random() > 0.5) {
        this.ok([1, 2, 3, "传递ok"]);
      } else {
        console.error("模拟保存");
      }
      this.loading = false;
    }, 1000);
  }
}
</script>