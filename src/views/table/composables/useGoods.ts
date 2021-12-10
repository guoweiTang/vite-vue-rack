/*
 * @Description: 查询商品
 * @Author: tangguowei
 * @Date: 2021-12-07 16:20:15
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-10 16:18:50
 */
import {
  ref,
  reactive,
  watch,
  toRefs,
} from 'vue';
import { useRouter } from 'vue-router';
import { getGoods } from '@/views/service';

export default function useStoreRepositories() {
  const router = useRouter();
  // 分页
  const pageData = reactive({
    page: 1,
    size: 10,
    total: 0,
  });
  const goodsRepositories = ref([]);
  const getGoodsRepositories = async () => {
    const { page, size } = pageData;
    try {
      const { data } = await getGoods({
        router,
        params: {
          page,
          size,
        },
      });
      goodsRepositories.value = (data as any).results || [];
      pageData.total = (data as any).total;
    } catch (e) {
      console.log(e);
    }
  };
  const { page: currentPage } = toRefs(pageData);
  watch(currentPage, getGoodsRepositories);

  return {
    goodsRepositories,
    getGoodsRepositories,
    ...toRefs(pageData),
  };
}
