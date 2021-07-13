/*
 * @Description: file content
 * @Author: tangguowei
 * @Date: 2021-07-09 15:12:33
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-07-09 15:12:33
 */
import { getStores } from '../../service';
import { ref, onMounted } from 'vue';

export default function useStoreRepositories() {
  const storeId = ref('');
  const storeRepositories = ref([]);
  const getStoreRepositories = async () => {
    let res;
    try {
      res = await getStores();
    } catch (e) {
      console.log(e);
    }
    if (res) {
      storeId.value = res.data.results[0].id;
      storeRepositories.value = res.data.results;
    }
  };

  onMounted(getStoreRepositories);

  return {
    storeId,
    storeRepositories,
    getStoreRepositories,
  };
}
