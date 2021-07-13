<!--
 * @Description: 卡片列表
 * @Author: tangguowei
 * @Date: 2021-05-19 16:58:40
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-07-08 17:44:50
-->
<template>
  <el-alert
    :closable="false"
    title="该页面只有管理员能看到"
    style="margin-bottom: 20px"
    type="warning"
  >
  </el-alert>
  <div class="card-table">
    <el-row :gutter="10">
      <el-col
        class="service-col"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        v-for="item in allServices"
        :key="item.id"
      >
        <el-card shadow="hover">
          <img :src="item.imgUrl" class="card-picture" />
          <div class="card-main">
            <div class="card-header">{{ item.title }}</div>
            <div class="card-content">
              <div class="sub-title">{{ item.version }}</div>
              <el-button-group class="service-options">
                <el-button
                  type="text"
                  icon="el-icon-edit"
                  @click="handleEdit(item)"
                />
                <el-button type="text" icon="el-icon-share" />
                <el-popconfirm
                  title="确定删除该服务吗？"
                  @confirm="confirmDelete(item)"
                >
                  <template #reference>
                    <el-button type="text" icon="el-icon-delete" />
                  </template>
                </el-popconfirm>
              </el-button-group>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <Modal ref="serviceModal" @handle-edit-success="getDataByPage" />
</template>

<script>
import Modal from './components/modal.vue';
import { getAllServices, deleteService } from '../service';
export default {
  name: 'CardTable',
  components: {
    Modal,
  },
  data() {
    return {
      allServices: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 12,
      },
    };
  },
  mounted() {
    this.getDataByPage();
  },
  methods: {
    // 编辑
    handleEdit(item) {
      const target = this.$refs['serviceModal'];
      target.formData = { ...item };
      target.visible = true;
    },
    // 删除
    async confirmDelete(item) {
      let res;
      try {
        res = await deleteService({
          serviceId: item.id,
        });
      } catch (e) {
        console.log(e);
      }
      if (res) {
        this.getDataByPage();
      }
    },
    // 获取详细信息
    async getDataByPage() {
      let res;
      try {
        res = await getAllServices({
          current: this.pagination.current,
          page_size: this.pagination.pageSize,
        });
      } catch (e) {
        console.error(e);
        this.$message.error('获取服务错误！');
      }
      if (res) {
        this.allServices = res.data.results;
      }
    },
  },
};
</script>

<style scoped>
.card-picture {
  width: 100%;
}
.service-col {
  margin-bottom: 10px;
}
.card-main {
  margin-top: 14px;
}
.card-header {
  width: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-footer {
  display: flex;
}
.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sub-title {
  color: #999;
  font-size: 14px;
}
.service-options {
  width: 88px;
}
.service-options button:not(:last-child)::after {
  content: '';
  margin: 0 10px;
}
</style>
