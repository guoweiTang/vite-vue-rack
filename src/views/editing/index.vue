<!--
 * @Description: 图片编辑
 * @Author: tangguowei
 * @Date: 2022-04-08 17:10:16
 * @LastEditors: tangguowei
 * @LastEditTime: 2022-04-08 17:26:55
-->
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import 'tang-image-editor/index.css';
import TangImageEditor from 'tang-image-editor';

const urls = ref([
  'https://scaleflex.cloudimg.io/v7/demo/river.png',
  'https://scaleflex.cloudimg.io/v7/demo/spencer-davis-unsplash.jpg',
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
]);
const instance = ref();
const dialogVisible = ref(false);
const currentIndex = ref(0);
onMounted(() => {
  new TangImageEditor('#drawingArea', {
    imgSrc: urls.value[0],
    color: '#f00',
    lineWidth: 2,
    maxWidth: 600,
    maxHeight: 500,
  });
})
// 保存修改后的图片
async function handleSave() {
  try {
    const url = await instance.value.toDataURL();
    urls.value[currentIndex.value] = url;
    dialogVisible.value = false;
  } catch (e) {
    console.log(e);
  }
}
// 展示图片编辑器弹窗
async function handleShowImage(index) {
  currentIndex.value = index;
  const url = this.urls[index];
  dialogVisible.value = true;
  await nextTick();
  if (!instance.value) {
    instance.value = new TangImageEditor('#drawingBoard', {
      imgSrc: url,
      color: '#F56C6C',
      lineWidth: 5,
      maxWidth: 500,
      maxHeight: 500,
    });
  } else {
    instance.value.setImageSrc(url);
  }
}

</script>

<template>
  <el-card>
    <div
      id="drawingArea"
      style="margin: 0 auto;"
    />
  </el-card>
  <el-card
    header="学生答案"
    style="margin-top: 20px;"
  >
    <el-image
      v-for="(url, index) in urls"
      :key="url"
      :src="url"
      style="width: 100px; height: 100px; margin-left: 20px;"
      fit="cover"
      @click="handleShowImage(index)"
    />
  </el-card>
  <el-dialog
    v-model="dialogVisible"
    title="图片编辑"
    :width="540"
  >
    <div id="drawingBoard" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="handleSave"
        >确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
