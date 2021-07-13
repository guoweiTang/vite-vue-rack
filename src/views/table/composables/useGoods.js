import { getGoods } from '../../service';
import { ref, onMounted, watch } from 'vue';

export default function useStoreRepositories(storeId) {
  const goodsRepositories = ref([]);
  const getGoodsRepositories = async () => {
    if (!storeId.value) return;
    let res;
    try {
      res = await getGoods({
        storeId: storeId.value,
      });
    } catch (e) {
      console.log(e);
    }
    if (res) {
      goodsRepositories.value = res.data.results;
    }
  };

  onMounted(getGoodsRepositories);
  watch(storeId, getGoodsRepositories);

  return {
    goodsRepositories,
    getGoodsRepositories,
  };
}
