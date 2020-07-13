<template>
  <el-dialog title="提示" :visible.sync="$root.open" width="300px">
    <span>可以使用提供的函数,进行关闭cancel/ok</span>
    <div>
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="ok([1,2,3,4,5])">确 定</el-button>
    </div>

    <span>也可以$root.open = false 进行关闭</span>
    <div>
      <el-button @click="$root.open = false">取 消</el-button>
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
export default class Cmt extends Modal {}
</script>