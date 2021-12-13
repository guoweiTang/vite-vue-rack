<!--
 * @Description: 商品详情
 * @Author: tangguowei
 * @Date: 2021-05-19 20:15:47
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-13 14:26:37
-->
<script setup lang="ts">
import {
  ref,
  nextTick,
  reactive,
  computed,
} from 'vue';
import { useRouter } from 'vue-router';
import {
  mapState,
  useStore,
} from 'vuex';
import { ElMessage } from 'element-plus';
import { getGoodDetail, updateGoods } from '@/views/service';
import { Goods } from '@/views/data.d';

/**
 * 继承至父组件的属性和方法
 */
const emit = defineEmits(['handleSubmit']);

// 同步store数据
const store = useStore();
const totalCount = computed(mapState('basic-table', ['totalCount']).totalCount.bind({ $store: store }));

const router = useRouter();
const form = ref();
const visible = ref(false);
const isPreview = ref(false);
const formData = ref<Goods>({});
const rules = reactive({
  name: [{ required: true, trigger: 'blur', message: '商品名称为必填项' }],
  category: [{ required: true, trigger: 'blur', message: '商品类型为必填项' }],
  spec: [{ required: true, trigger: 'blur', message: '商品规格为必填项' }],
  saleDate: [{ required: true, trigger: 'blur', message: '发售日期为必填项' }],
  description: [{ required: true, trigger: 'blur', message: '商品介绍为必填项' }],
});
const init = async (goodsId?: string, isModalPreview?: boolean) => {
  isPreview.value = !!isModalPreview;
  visible.value = true;
  formData.value = {};
  await nextTick();
  form.value.resetFields();
  if (goodsId) {
    // 查询详情
    try {
      const { data } = await getGoodDetail(goodsId, { router });
      formData.value = data as Goods;
    } catch (e) {
      console.log(e);
    }
  }
};
const handleSubmit = () => {
  form.value.validate(async (valid: any) => {
    if (valid) {
      try {
        await updateGoods(formData.value.id as string, {
          router,
          data: formData.value,
        });
        ElMessage.success({
          message: '保存成功',
        });
        visible.value = false;
        emit('handleSubmit');
      } catch (e) {
        console.log(e);
      }
    }
  });
};
// 定义组件暴露出的属性
defineExpose({
  init,
});
</script>
<template>
  <el-dialog
    :width="560"
    :close-on-click-modal="isPreview"
    v-model="visible"
    :title="isPreview ? '商品详情' : '商品编辑'"
  >
    <el-form ref="form" :model="formData" :rules="rules">
      <el-form-item label="所有商品共查询详情次数">{{ totalCount }}次</el-form-item>
      <el-form-item label="商品图片" v-if="formData.imgUrl">
        <el-image
          hide-on-click-modal
          style="width: 100px;"
          :src="formData.imgUrl"
          :preview-src-list="[formData.imgUrl]"
        ></el-image>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <template v-if="isPreview">{{ formData.name }}</template>
        <el-input v-else v-model="formData.name" />
      </el-form-item>
      <el-form-item label="商品类型" prop="category">
        <template v-if="isPreview">{{ formData.category }}</template>
        <el-input v-else v-model="formData.category" />
      </el-form-item>
      <el-form-item label="商品规格" prop="spec">
        <template v-if="isPreview">{{ formData.spec }}</template>
        <el-input v-else v-model="formData.spec" />
      </el-form-item>
      <el-form-item label="发售日期" prop="saleDate">
        <template v-if="isPreview">{{ formData.saleDate }}</template>
        <el-date-picker
          v-else
          v-model="formData.saleDate"
          type="date"
          value-format="YYYY-MM-DD"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="商品介绍" prop="description">
        <template v-if="isPreview">{{ formData.description }}</template>
        <el-input v-else type="textarea" v-model="formData.description" :autosize="{ minRows: 2, maxRows: 4 }" />
      </el-form-item>
    </el-form>
    <template v-if="!isPreview" #footer>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </template>
  </el-dialog>
</template>
