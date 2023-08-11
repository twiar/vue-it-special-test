<script setup lang="ts">
import { ref, watch, defineProps } from "vue";

interface User {
	avatarUrl: string;
	name: string;
	surname: string;
	phone: string;
	role: string;
}

const props = defineProps<User>();

const form = ref<User>({
	avatarUrl: props.avatarUrl || "",
	name: props.name || "",
	surname: props.surname || "",
	phone: props.phone || "",
	role: props.role || "",
});

const preview = (el: Event) => {
	const elTarget = (el.target as HTMLInputElement);
	if (elTarget.files !== null) {
		console.log(elTarget.files[0]);
		getBase64(elTarget.files[0]).then((base) => {
			form.value.avatarUrl = String(base);
	
			let elem = document.createElement("img");
			elem.setAttribute("src", String(base));
			elem.style['objectFit'] = 'cover';
			elem.style['width'] = '100%';
			elem.style['height'] = '100%';
			document.querySelector('#image-wrapper')?.appendChild(elem);
		});
	}
}

const getBase64 = (file: Blob) => {
	return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
	});
};

watch(() => form.value.role, (newVal, oldVal) => {
	if (newVal === "Начальник") form.value.phone = "";
});
</script>

<template>
	<div class="wrapper">
		<div class="modal">
			<div class="form-wrapper">
				<div class="form-example avatar">
					<div id="image-wrapper" class="image-wrapper">
						<img :src="props.avatarUrl" alt="avatar" v-if="props.avatarUrl !== '' && props.avatarUrl !== undefined" />
					</div>
					<input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg"  @change="preview" />
				</div>
				<div class="form-example">
					<label for="name">Имя: </label>
					<input type="text" name="name" id="name" placeholder="Иван"  v-model="form.name" />
				</div>
				<div class="form-example">
					<label for="surname">Фамилия: </label>
					<input type="text" name="surname" id="surname" placeholder="Иванов"  v-model="form.surname"/>
				</div>
				<div class="form-example">
					<label for="role">Роль: </label>
					<select name="role" id="role" v-model="form.role" :disabled="props.role !== '' && props.role !== undefined">
						<option value="">Выберите роль</option>
						<option value="Начальник">Начальник</option>
						<option value="Работник">Работник</option>
					</select>
				</div>
				<div class="form-example" v-if="form.role === 'Начальник'">
					<label for="phone">Номер телефона: </label>
					<input type="phone" name="phone" id="phone" placeholder="+7 (999) 999-99-99"  v-model="form.phone"/>
				</div>
				<div class="form-example">
					<input type="submit" :value="props.role !== '' && props.role !== undefined ? 'Сохранить' : 'Создать'" @click="$emit('getForm', form)" />
					<span class="button" @click="$emit('close', false)">Закрыть</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.wrapper {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.5);

	display: flex;
	justify-content: center;
	align-items: center;
}

.modal {
	background-color: #fff;
	padding: 20px;
	min-width: 400px;
}

.avatar {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.image-wrapper {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	overflow: hidden;
	background: #ccc;
	position: relative;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}

.form-wrapper {
	& > * {
		margin-bottom: 10px;

		&:last-child {
			margin-bottom: 0;
			margin-top: 20px;
		}
	}

	.form-example {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
	}
}

input {
	min-width: 200px;
	box-sizing: border-box;
	padding: 6px;
}

select {
	padding: 8px 3px;
	min-width: 200px;
}

.button {
	border: 1px solid rgba(0, 0, 0, 0.5); 
	padding: 7px 10px;
	cursor: pointer;
	opacity: 0.75;
	border-radius: 2px;
	font-size: 14px;
}
</style>