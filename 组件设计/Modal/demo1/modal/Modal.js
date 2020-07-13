/**
 * 同步弹框
 * 点击回调,不涉及异步交互
 */
import { Vue, Component, Watch, Emit } from "vue-property-decorator";

@Component
export default class Modal extends Vue {
    @Emit
    ok(data) {
        this.$emit("ok", data);
    }

    @Emit
    cancel() {
        this.$emit("cancel");
    }
}