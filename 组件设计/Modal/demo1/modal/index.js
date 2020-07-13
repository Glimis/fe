import Vue from 'vue';

class Modal {
    // 是否已加载
    init = false
    // 挂在div
    el
    // vue实例
    $vue



    constructor(vueComponent) {
        this.vueComponent = vueComponent;
    }


    show(props) {
        if (!this.init) {
            this.el = document.createElement('div');
            document.body.append(this.el);
            this.init = true;


            let config = {
                data() {
                    return {
                        open: false,
                        // 返回值
                        resolve: undefined,
                        reject: undefined,
                    }
                },
                watch: {
                    open: (v) => {
                        if (!v) {
                            // 关闭,执行cancel,此处利用promise 只执行一次的特性
                            this.$vue.reject();
                        }
                    }
                },
                render: h => h(this.vueComponent, {
                    on: {
                        cancel: () => {
                            this.$vue.open = false;
                            this.$vue.reject();
                        },
                        ok: (data) => {
                            this.$vue.open = false;
                            this.$vue.resolve(data);
                        }
                    }
                })
            };
            this.$vue = new Vue(config).$mount(this.el);
            // 挂载其他引入实例,如router,store等

        }
        this.$vue.open = true;

        if (this.vueComponent.onLoad) {
            this.vueComponent.onLoad.call(this.$vue.$children[0], props);
        } else if (this.vueComponent.extendOptions && this.vueComponent.extendOptions.onLoad) {
            this.vueComponent.extendOptions.onLoad.call(this.$vue.$children[0], props);
        }


        return new Promise((resolve, reject) => {
            this.$vue.resolve = resolve;
            this.$vue.reject = reject;
        });
    }
}


export const CancelModal = new Modal(require('./CancelModal.vue').default)
export const CityModal = new Modal(require('./CityModal.vue').default)