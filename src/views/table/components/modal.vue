<!--
 * @Description: 编辑服务弹窗
 * @Author: tangguowei
 * @Date: 2021-05-19 20:15:47
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-05-19 20:29:28
-->
<template>
  <el-dialog v-model="visible" title="编辑">
    <el-form ref="modalForm" :model="formData" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input v-model="formData.version" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { updateService } from '@/views/service';

export default {
  name: 'Modal',
  emits: ['handleEditSuccess'],
  data() {
    return {
      visible: false,
      formData: {},
      rules: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        version: [{ required: true, message: '版本不能为空', trigger: 'blur' }],
      },
    };
  },
  methods: {
    handleConfirm() {
      this.$refs['modalForm'].validate((valid) => {
        if (valid) {
          updateService(
            {
              serviceId: this.formData.id,
            },
            {
              title: this.formData.title,
              version: this.formData.version,
            }
          ).then(() => {
            this.visible = false;
            this.$emit('handleEditSuccess', this.formData);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>
