import { ref, computed } from 'vue';

export default function useRepositoryNameSearch(repositories) {
  const searchQuery = ref('');
  const repositoriesMatchingSearchQuery = computed(() => {
    return repositories.value.filter((item) => {
      let res = false;
      for (let val of Object.values(item)) {
        if (val.includes(searchQuery.value)) {
          res = true;
          break;
        }
      }
      return res;
    });
  });
  const setSearchQuery = (val) => {
    searchQuery.value = val;
  };

  return {
    searchQuery,
    repositoriesMatchingSearchQuery,
    setSearchQuery,
  };
}
