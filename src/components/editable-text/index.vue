<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Edit } from '@element-plus/icons-vue';

/**
 * 父组件传入的数据及事件
 */
const props = defineProps<{
  type?: 'text'|'textarea'|'radio';
  // 当type为radio，options为必选项
  options?: Array<{
    label: string;
    value: string;
  }>;
  label: string;
  // 表单值
  value: string;
  // 确定修改回调
  confirm?: () => void;
  // 表单校验规则
  rules?: Array<Record<string, any>>;
}>();
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
    ref="editForm"
    label-position="left"
    :model="formModel"
    label-width="140px"
  >
    <div class="edit-able">
      <el-form-item :label="label">
        <!-- 编辑区域 -->
        <el-form-item
          v-if="isEdit"
          prop="targetProp"
          :rules="rules"
        >
          <el-input
            v-if="!type || type === 'text' || type === 'textarea'"
            v-model="formModel.targetProp"
            :type="type || 'text'"
            autosize
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
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 展示区域 -->
        <div
          v-else
          class="preview"
        >
          <span>{{ value }}</span>
          <el-icon
            color=" rgb(91, 115, 232)"
            class="el-icon--right el-icon-edit"
            @click="handleEdit"
          >
            <Edit />
          </el-icon>
        </div>
      </el-form-item>
      <el-form-item v-if="isEdit">
        <el-button
          type="primary"
          @click="handleConfirm"
        >
          保存
        </el-button>
        <el-button @click="handleCancel">
          取消
        </el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<style scoped>
.preview:hover .el-icon-edit {
  visibility: visible;
}
.el-icon-edit {
  visibility: hidden;
  cursor: pointer;
}
</style>
