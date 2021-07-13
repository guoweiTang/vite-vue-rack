<!--
 * @Description: 扩展面板
 * @Author: tangguowei
 * @Date: 2021-05-19 19:44:29
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-05-24 00:50:22
-->
<template>
  <el-form-item>
    <el-tag @click="$emit('update:query', '零食')">零食</el-tag>
  </el-form-item>
  <slot name="first"></slot>
  <slot name="last"></slot>
  <el-form-item>
    <i>定义插槽样式，更多内容，敬请期待……</i>
  </el-form-item>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Expect',
  props: {
    query: String,
  },
  emits: ['update:query'],
});
</script>

<style lang="scss" scoped>
:slotted(.first-item) {
  .el-button {
    background: #009688;
    border-color: #009688;
  }
}
:slotted(.first-item:hover) {
  .el-button {
    background: #32c0b2;
    border-color: #32c0b2;
  }
}
.screen-modal {
  background: #fffcde;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
i {
  color: #999;
  margin-left: 16px;
}
.el-tag {
  cursor: pointer;
}
</style>
