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
        <el-form-item prop="targetProp" v-if="visible" :rules="rules">
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
              v-for="item in options"
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
      <el-form-item v-if="visible">
        <el-button type="primary" @click="handleConfirm">保存</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
import { ref, reactive } from 'vue';

export default {
  name: 'EditableText',
  props: {
    // 表单类型
    type: {
      validator: function (value) {
        return ['text', 'textarea', 'radio'].includes(value);
      },
      default: 'text',
    },
    // 当type为radio，options为必选项
    options: {
      validator: function (value) {
        return value.every((item) => item.label && item.value) || !value;
      },
    },
    label: String,
    // 表单值
    value: {
      type: String,
      required: true,
    },
    // 确定修改回调
    confirm: Function,
    // 表单校验规则
    rules: Object,
  },
  setup(props) {
    const formModel = reactive({ targetProp: '' });
    const visible = ref(false);
    const handleEdit = () => {
      formModel.targetProp = props.value;
      visible.value = true;
    };
    const handleCancel = () => {
      visible.value = false;
    };
    return {
      visible,
      formModel,
      handleCancel,
      handleEdit,
    };
  },
  methods: {
    // 表单提交
    handleConfirm() {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          this.$emit('confirm', this.formModel.targetProp);
          this.handleCancel();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>
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
