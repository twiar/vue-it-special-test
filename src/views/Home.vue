<script setup lang="ts">
import { ref, onBeforeMount, watch, computed } from "vue";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
// import { useRouter } from 'vue-router';
import { useUserStore } from "@/store/users";

const store = useUserStore();
// const router = useRouter();

const show = ref(false);
const showSurname = ref(true);
const editForm = ref({});
const props = ref({
  columns: [
    {
      title: "Аватар",
      key: "avatarUrl",
    },
    {
      title: "Имя",
      key: "name",
    },
    {
      title: "Фамилия",
      key: "surname",
    },
    {
      title: "Роль",
      key: "role",
    },
  ],
  results: [],
  surname: computed(() => showSurname.value),
});

const closeModal = (val: boolean) => {
  show.value = val;
}

const addUser = (val: Record<string, unknown>) => {
  if (!val.avatarUrl || !val.role || !val.name || !val.surname)  {
    let required = [];
    if (!val.avatarUrl) required.push("Аватар");
    if (!val.name) required.push("Имя");
    if (!val.surname) required.push("Фамилия");
    if (!val.role) required.push("Роль"); 
    alert("Заполните поля: "
     + required.join(", ")
    )
  } else {
    let users = 
      localStorage.getItem("users") ? 
      JSON.parse(localStorage.getItem("users") || '{}') : [];
    users.push(val);
    localStorage.setItem("users", JSON.stringify(users));
    show.value = false;
    
    props.value.results = localStorage.getItem("users") ? 
      JSON.parse(localStorage.getItem("users") || '{}') : [];
  }
}

const editUser = (val: number) => {
  editForm.value = props.value.results[val];
  show.value = true;
}

const deleteUser = (val: number) => {
  const users = props.value.results.filter((el, index) => index !== val);
  localStorage.setItem("users", JSON.stringify(users));
  props.value.results = localStorage.getItem("users") ? 
      JSON.parse(localStorage.getItem("users") || '{}') : [];
}

watch(() => show.value, (newVal, oldVal) => {
  if (!newVal) editForm.value = {};
});

onBeforeMount(() => {
  props.value.results = localStorage.getItem("users") ? 
      JSON.parse(localStorage.getItem("users") || '{}') : [];
});
</script>

<template>
  <div class="row">
    <button @click="show = !show">Добавить пользователя</button>
    
    <div>
      <label for="surname">Показывать фамилии</label>
      <input type="checkbox" name="surname" id="surname" v-model="showSurname" />
    </div>
  </div>
  <Table v-bind="props" @delete-row="deleteUser" @edit-row="editUser" />
  
  <Transition>
    <Modal v-if="show" @get-form="addUser" @close="closeModal" v-bind="editForm" />
  </Transition>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
