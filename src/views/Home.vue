<template>
	<div class="home">
		<RouterLink to="/task1" class="link">Задача 1</RouterLink>
		<RouterLink to="/task2" class="link">Задача 2</RouterLink>
	</div>
</template>

<style lang="scss" scoped>
	.home {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		gap: 20px;
		flex-direction: column;
	}

	.link {
		font-weight: bold;
		font-size: 30px;
		text-decoration: none;
		color: #555;

		&:hover {
			color: #111;
		}
	}
</style>