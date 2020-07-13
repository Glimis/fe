基于Vue + elementUI

## 原生方式 【4-5步】
1. 设置视图
2. 引入组件
3. 增加vm
4. 增加回调
5. 特殊回调


`el-dialog-cmp`组件,参考`el-dialog`
```vue
<template>
    <div>
    <el-button type="text" @click="dialogVisible = true">
        点击打开 Dialog
    </el-button>
    <!-- 1. 增加视图 -->
    <el-dialog-cmp :visible.sync="dialogVisible" @ok="ok"><el-dialog-cmp>
</div>
</template>
<script>
export default {
  components:{
    // 2. 引入组件
   "el-dialog-cmp":require('./el-dialog-cmp').default
  },
  data(){
    return {
        // 3. 增加vm
        dialogVisible:false
    }
  },
  methods:{
      // 4.添加回调
      ok(){}
  },
  watch:{
      // 5.特殊回调
      dialogVisible(){}
  }
};
</script>
<style lang="less" scoped="">

</style>
```
## js调用 【2步】
核心:
1. 原生弹出层本身不依赖视图 【alert/confirm/prompt】
2. 主流弹出层实现,通常为body的子元素 【定位】

使用函数式【如原生,alert/confirm/prompt】是更加的体验,关键是如何封装/自定义视图

```vue
<template>
    <div>
    <el-button type="text" @click="onClick">
        点击打开 Dialog
    </el-button>
</div>
</template>
<script>
// 1. 引入
import {elDialogCmp }from './Modal'

export default {
  methods:{
      // 2. 回调
      async onClick(){
           try{
               //   如果习惯 confirm 函数风格,也可以使用elDialogCmp()
              let res = await elDialogCmp.show(params)
               
              console.log('ok',res)
            }catch(e){
                console.log('点击取消')
            }
       }
  }
};
</script>
<style lang="less" scoped="">

</style>
```
## 实现
核心：
1. 如何生成弹框 

new Vue,需要注意通用组件的加载,如store,router等
针对生成,有分缓存与非缓存两种 【是否每次展示弹出层都会产生new Vue】
2. 传递调用参数 

参考onLoad进行启动
3. 传递返回参数 

调用show函数,返回`promise`
回调参数,最终通过`reslove(params)`执行
3. 传递返回参数 reject

对于关闭,尤其是无意义的关闭
最终通过`reject()`执行 【此处会使用promise执行一次reslove/reject的特性】
```javascript
import Vue from 'vue';
class Modal {
    static count =0
    // 是否已加载
    init = false
    // 挂在div
    el
    // vue实例
    $vue
    vm = {
        open: false,
        // 返回值
        resolve: undefined,
        reject: undefined,
    }


    constructor(vueComponent) {
        this.vueComponent = vueComponent;
        this.id = 'modal_' + Modal.count++;
    }

  
    show(props) {
        if (!this.init) {
            this.el = document.createElement('div');
            document.body.append(this.el);
            this.init = true;
            let config = {
                render: h => h(this.vueComponent, {
                    // props
                }),
                data: this.vm,
                methods: {
                    $close(data) {
                        this.open = false;
                        this.resolve(data);
                    }
                },
                watch: {
                    'open': (v) => {
                        if (!v) { this.vm.reject(); }
                    }
                }
            };
            this.$vue = new Vue(config).$mount(this.el);

        }
        this.vm.open = true;

        if (this.vueComponent.onLoad) {
            this.vueComponent.onLoad.call(this.$vue.$children[0], props);
        } else if (this.vueComponent.extendOptions && this.vueComponent.extendOptions.onLoad) {
            this.vueComponent.extendOptions.onLoad.call(this.$vue.$children[0], props);
        }


        return new Promise((resolve, reject) => {
            this.vm.resolve = resolve;
            this.vm.reject = reject;
        });
    }
}

```
