<!--
 * @Description: 扩展面板
 * @Author: tangguowei
 * @Date: 2021-05-19 19:44:29
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-08 11:54:59
-->
<script setup lang="ts">
/**
 * 继承至父组件的属性和方法
 */
defineProps<{
  query: string;
}>();
defineEmits(['update:query']);
</script>
<template>
  <el-form-item>
    <el-tag @click="$emit('update:query', '零食')">
      零食
    </el-tag>
  </el-form-item>
  <slot />
  <el-form-item>
    <i>定义插槽样式，更多内容，敬请期待……</i>
  </el-form-item>
</template>

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
i {
  color: #999;
  margin-left: 16px;
}
.el-tag {
  cursor: pointer;
}
</style>
