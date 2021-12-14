<!--
 * @Description: 基础列表
 * @Author: tangguowei
 * @Date: 2021-05-19 16:58:40
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-14 15:19:37
-->
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  mapState,
  useStore,
  mapMutations,
} from 'vuex';
import Expect from './components/expect.vue';
import useGoods from './composables/useGoods';
import useGoodsSearch from './composables/useGoodsSearch';
import Operateodal from './components/operate-modal.vue';
import { deleteGoods } from '@/views/service';
import { Goods } from '@/views/data.d';

const operateModal = ref();
const router = useRouter();
const store = useStore();

// 同步store数据
const setTotalCount = mapMutations('basic-table', ['setTotalCount']).setTotalCount.bind({ $store: store });
const totalCount = computed(mapState('basic-table', ['totalCount']).totalCount.bind({ $store: store }));

const {
  goodsRepositories,
  getGoodsRepositories,
  page,
  size,
  total,
} = useGoods();
const { searchQuery, repositoriesMatchingSearchQuery: tableData } = useGoodsSearch(goodsRepositories);
const handleOperateModal = (id: string, isPreview?: boolean) => {
  // 如果操作为查询详情，则记录次数
  if (isPreview) {
    setTotalCount(totalCount.value + 1);
  }
  operateModal.value.init(id, isPreview);
};
const handleDeleteModal = async (item: Goods) => {
  try {
    await ElMessageBox.confirm(
      `确定删除商品《${item.name}》吗？`,
      '提示',
      {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      },
    );
    await deleteGoods(item.id as string, {
      router,
    });
    ElMessage.success({
      message: '删除成功',
    });
    getGoodsRepositories();
  } catch (e) {
    console.log(e);
  }
};
// 组件装载
onMounted(getGoodsRepositories);
</script>

<template>
  <el-card
    class="search-card"
    shadow="never"
  >
    <el-form
      :inline="true"
      :model="{}"
    >
      <el-form-item label="查询词">
        <el-input
          v-model="searchQuery"
          placeholder="例：零食"
        />
      </el-form-item>
      <Expect v-model:query="searchQuery">
        <template #first>
          <el-form-item class="first-item">
            <el-button type="primary">
              插槽按钮
            </el-button>
          </el-form-item>
        </template>
      </Expect>
    </el-form>
  </el-card>
  <el-card shadow="never">
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column
        prop="name"
        label="商品名称"
      />
      <el-table-column
        prop="category"
        label="商品类型"
      />
      <el-table-column
        prop="spec"
        label="商品规格"
      />
      <el-table-column
        prop="saleDate"
        label="发售日期"
      />
      <el-table-column
        prop="description"
        label="商品介绍"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="150"
      >
        <template #default="{ row }">
          <el-button
            type="text"
            size="small"
            @click="handleOperateModal(row.id, true)"
          >
            详情
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleOperateModal(row.id)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleDeleteModal(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="page"
      style="text-align: center; margin-top: 16px;"
      layout="total, prev, pager, next"
      :page-size="size"
      :total="total"
    />
  </el-card>
  <Operateodal
    ref="operateModal"
    @handle-submit="getGoodsRepositories"
  />
</template>

<style lang="scss" scoped>
.search-card {
  margin-bottom: 16px;
  .el-input {
    max-width: 380px;
  }
  span:nth-of-type(n + 2) {
    margin-left: 16px;
  }
}
:global(.search-card .el-form-item) {
  margin-bottom: 0;
}
</style>
<style>

</style>
