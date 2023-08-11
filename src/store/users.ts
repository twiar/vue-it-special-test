import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
	const userData = ref([]);

  return {
    userData,
  };
});