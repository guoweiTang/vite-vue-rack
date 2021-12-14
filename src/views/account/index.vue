<!--
 * @Description: 个人详细信息
 * @Author: tangguowei
 * @Date: 2021-05-19 19:44:29
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-10 16:12:16
-->
<script setup lang="ts">
import { computed, reactive } from 'vue';
import {
  useStore,
  mapState,
  mapActions,
} from 'vuex';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import EditableText from '@/components/editable-text/index.vue';
import { uploadFile } from '@/views/service';

const store = useStore();
const router = useRouter();
// 同步store数据
const userInfo: any = computed(mapState('admin/user', ['userInfo']).userInfo.bind({ $store: store }));
const setUserInfo = mapActions('admin/user', ['setUserInfo']).setUserInfo.bind({ $store: store });

const rulesOfCommon = reactive([
  { required: true, message: '内容不能为空', trigger: 'blur' },
]);
// 图片上传
const handleAvatarChange = async ({ size, raw: file } : { size: number; raw: any}) => {
  const isJPG = file.type === 'image/jpeg';
  const isPNG = file.type === 'image/png';
  const isLt2M = size / 1024 / 1024 < 2;

  if (!isJPG && !isPNG) {
    ElMessage.error('上传头像图片只能是JPG或PNG格式!');
  } else if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!');
  } else {
    const {
      data: { avatarUrl },
    } : any = await uploadFile({
      router,
      data: {
        file,
      },
    });
    setUserInfo({ avatarUrl });
    ElMessage.success('上传成功');
  }
};
</script>

<template>
  <el-card>
    <el-alert
      :closable="false"
      title="该页面只有普通用户能看到"
      style="margin-bottom: 20px"
      type="warning"
    />
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :on-change="handleAvatarChange"
      :auto-upload="false"
    >
      <el-image
        v-if="userInfo.avatarUrl"
        class="avatar"
        :src="userInfo.avatarUrl"
      >
        <template #error>
          <div class="image-slot">
            <i class="el-icon-picture-outline" />
          </div>
        </template>
      </el-image>
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
      />
    </el-upload>
    <editable-text
      label="用户名"
      :value="userInfo.name"
      :rules="rulesOfCommon"
      @confirm="(value) => setUserInfo({ name: value })"
    />
    <editable-text
      type="radio"
      :options="[
        { label: '管理员', value: '管理员' },
        { label: '普通用户', value: '普通用户' },
      ]"
      label="你的权限"
      :value="userInfo.role"
      @confirm="(value) => setUserInfo({ role: value })"
    />
    <editable-text
      type="radio"
      :options="[
        { label: '男', value: '男' },
        { label: '女', value: '女' },
      ]"
      label="性别"
      :value="userInfo.gender"
      @confirm="(value) => setUserInfo({ gender: value })"
    />
    <editable-text
      label="一句话介绍"
      :value="userInfo.summary"
      :rules="rulesOfCommon"
      @confirm="(value) => setUserInfo({ summary: value })"
    />
    <editable-text
      type="textarea"
      label="个人简介"
      :value="userInfo.description"
      :rules="rulesOfCommon"
      @confirm="(value) => setUserInfo({ description: value })"
    />
  </el-card>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
    .image-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #f5f7fa;
      font-size: 30px;
    }
  }
}
</style>
<style lang="scss">
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
}
</style>
