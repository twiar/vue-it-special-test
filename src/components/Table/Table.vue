<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useRouter } from 'vue-router';

interface TableProps {
	columns: {
		title: string;
		key: string;
	};
	results: Array<unknown>;
	surname: boolean;
}

const props = defineProps<TableProps>();
</script>

<template>
	<table>
		<thead>
			<tr>
				<th 
					v-for="(column, index) in props.columns" 
					:key="index"
					:style="[
						column.key === 'surname' ? 
							props.surname ? '' : 'display: none'
						: '',
					]"
					>{{ column.title }}</th>
				<th>Действия</th>
			</tr>
		</thead>
		<tbody>
			<tr 
				v-for="(row, index) in props.results"	:key="index"
			>
				<td 
					v-for="(value, name) in row"
					:class="{ 'hidden': !props.columns.find((element: Record<string, unknown>) => element.key === name) }"
					:key="name"
					:style="[
						name === 'avatarUrl' ? 'width: 100px' : '',
						name === 'surname' ? 
							props.surname ? '' : 'display: none'
						: '',
					]"
					>
					<div class="text">{{ name === "avatarUrl" ? '' : value }}</div>
					<div class="image-wrapper" v-if="name === 'avatarUrl'">
						<img :src="value" alt="avatar" />
					</div>
				</td>
				<td style="width: 100px">
					<div class="actions">
						<button @click="$emit('editRow', index)">
							<svg class="svg-icon" style="width: 2em; height: 2em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M834.3 705.7c0 82.2-66.8 149-149 149H325.9c-82.2 0-149-66.8-149-149V346.4c0-82.2 66.8-149 149-149h129.8v-42.7H325.9c-105.7 0-191.7 86-191.7 191.7v359.3c0 105.7 86 191.7 191.7 191.7h359.3c105.7 0 191.7-86 191.7-191.7V575.9h-42.7v129.8z"  /><path d="M889.7 163.4c-22.9-22.9-53-34.4-83.1-34.4s-60.1 11.5-83.1 34.4L312 574.9c-16.9 16.9-27.9 38.8-31.2 62.5l-19 132.8c-1.6 11.4 7.3 21.3 18.4 21.3 0.9 0 1.8-0.1 2.7-0.2l132.8-19c23.7-3.4 45.6-14.3 62.5-31.2l411.5-411.5c45.9-45.9 45.9-120.3 0-166.2zM362 585.3L710.3 237 816 342.8 467.8 691.1 362 585.3zM409.7 730l-101.1 14.4L323 643.3c1.4-9.5 4.8-18.7 9.9-26.7L436.3 720c-8 5.2-17.1 8.7-26.6 10z m449.8-430.7l-13.3 13.3-105.7-105.8 13.3-13.3c14.1-14.1 32.9-21.9 52.9-21.9s38.8 7.8 52.9 21.9c29.1 29.2 29.1 76.7-0.1 105.8z"  /></svg>
						</button>
						<button @click="$emit('deleteRow', index)">
							<svg id="Flat" style="width: 2em; height: 2em;vertical-align: middle;fill: currentColor;overflow: hidden;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
							<path d="M215.99609,48H176V40a24.02718,24.02718,0,0,0-24-24H104A24.02718,24.02718,0,0,0,80,40v8H39.99609a8,8,0,0,0,0,16h8V208a16.01833,16.01833,0,0,0,16,16h128a16.01833,16.01833,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8.00917,8.00917,0,0,1,8-8h48a8.00917,8.00917,0,0,1,8,8v8H96Zm95.99609,168h-128V64h128ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"/></svg>
						</button>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<style lang="scss" scoped>
	table {
			width: 100%;
			border-collapse: collapse;
	}

	th, td {
			border: 1px solid #ccc;
			padding: 8px;
			text-align: left;
	}

	th {
			background-color: #f2f2f2;
	}

	td {
	}

	tr:nth-child(even) {
			background-color: #f2f2f2;
	}

	.image-wrapper {
		width: 100px;
		height: 100px;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: 50%;
		}
	}

	.actions {
		display: flex;
		gap: 10px;
	}

	.hidden {
		display: none;
	}
</style>
