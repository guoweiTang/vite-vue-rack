<script setup lang="ts">
import { ref, reactive } from 'vue';

/**
 * 父组件传入的数据及事件
 */
const props = defineProps({
  // 表单类型
  type: {
    validator(value: string) {
      return ['text', 'textarea', 'radio'].includes(value);
    },
    default: 'text',
  },
  // 当type为radio，options为必选项
  options: {
    validator(value: {label: string; value: string}[] | undefined) {
      return !value || value.every((item) => item.label && item.value);
    },
  },
  label: String,
  // 表单值
  value: {
    type: String,
    default: '',
  },
  // 确定修改回调
  confirm: Function,
  // 表单校验规则
  rules: Object,
});
const emit = defineEmits(['confirm']);

// 表单数据
const formModel = reactive({ targetProp: '' });
// 是否为编辑状态
const isEdit = ref(false);
// 编辑状态展示回调
const handleEdit = () => {
  formModel.targetProp = props.value;
  isEdit.value = true;
};
// 取消编辑
const handleCancel = () => {
  isEdit.value = false;
};
// form组件标识
const editForm = ref();
// 确定回调
const handleConfirm = () => {
  editForm.value.validate((valid: any) => {
    if (valid) {
      emit('confirm', formModel.targetProp);
      handleCancel();
    } else {
      console.log('error submit!!');
    }
  });
};
</script>
<template>
  <el-form
    label-position="left"
    :model="formModel"
    ref="editForm"
    label-width="140px"
  >
    <div class="edit-able">
      <el-form-item :label="label">
        <!-- 编辑区域 -->
        <el-form-item prop="targetProp" v-if="isEdit" :rules="rules">
          <el-input
            v-if="type === 'text' || type === 'textarea'"
            :type="type"
            autosize
            v-model="formModel.targetProp"
            autocomplete="off"
          />
          <el-radio-group
            v-else-if="type === 'radio'"
            v-model="formModel.targetProp"
          >
            <el-radio
              v-for="item in (props.options as Array<any>)"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <!-- 展示区域 -->
        <div class="preview" v-else>
          <span>{{ value }}</span>
          <i class="el-icon-edit" @click="handleEdit">修改</i>
        </div>
      </el-form-item>
      <el-form-item v-if="isEdit">
        <el-button type="primary" @click="handleConfirm">保存</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<style scoped>
.preview:hover .el-icon-edit {
  visibility: visible;
}
.el-icon-edit {
  margin-left: 10px;
  visibility: hidden;
  cursor: pointer;
  color: rgb(91, 115, 232);
}
</style>
