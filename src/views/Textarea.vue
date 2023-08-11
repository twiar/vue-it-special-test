<script lang="ts" setup>
import { ref, watch } from "vue";

const toggleLabel = ref(false);
const text = ref('');
const hovered = ref(false);
const focused = ref(false);
const overflown = ref(false);

const changeFocus = (bool: boolean) => {
	if (text.value === '' && !bool) toggleLabel.value = false;
	else toggleLabel.value = true;
	focused.value = bool;
}

const isOverflown = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => {
  overflown.value = scrollHeight > clientHeight || scrollWidth > clientWidth;
}

watch(() => text.value, (newVal, oldVal) => {
	isOverflown(document.querySelector('#textarea'));
});
</script>

<template>
	<div class="content">
	<RouterLink to="/">На главную</RouterLink>
		<div class="textarea-wrapper"
			@mouseenter="hovered = true"
			@mouseleave="hovered = false"
		>
			<div class="textarea" :class="{ 'focused': focused, 'hovered': (hovered && !focused) }">
			</div>
			<textarea id="textarea" name="textarea" @focusin="changeFocus(true)" @focusout=" changeFocus(false)" v-model="text">
			</textarea>
			<div class="line" :class="{ 'focused': focused, 'hovered': (hovered && !focused) }"></div>
			<div class="focus-lines" :class="{ 'focused': focused }">
				<div class="first"></div>
				<div class="second"></div>
			</div>
			<div class="fade" :class="{ 'focused': focused, 'hovered': (hovered && !focused), 'hidden': !overflown, }"></div>
			<label for="textarea" :class="{ 'focused': toggleLabel, 'hovered': (hovered && !toggleLabel) }">Label</label>
		</div>
	</div>
</template>

<style lang="scss" scoped>

	@keyframes slideLeft {
		from {
			width: 0;
			left: 50%;
		}

		to {
			width: 50%;
			left: 0;
		}
	}

	@keyframes slideRight {
		from {
			width: 0;
			left: 50%;
		}

		to {
			width: 50%;
			left: 50%;
		}
	}

	.content {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
	}

	textarea {
		min-width: 300px;
		min-height: 150px;
		border: none;
		background: transparent;
		transition: .15s opacity cubic-bezier(.4,0,.2,1);
		padding: 24px 16px 10px 16px;
		box-sizing: border-box;
		letter-spacing: .009375em;
		overflow: auto;
		resize: vertical;
		font-family: monospace;
		font-size: 1.25em;
		position: absolute;
		left: 0;
		top: 0;
		color: #333;

		&:focus, &:focus-visible {
			outline: none;
		}
	}

	.textarea {
		min-width: 300px;
		min-height: 150px;
		display: flex;
		position: relative;
		background: #eee;
		transition: .15s background cubic-bezier(.4,0,.2,1);

		&-wrapper {
			position: relative;
			overflow: hidden;
			border-radius: 4px 4px 0 0;

			label {
				position: absolute;
				left: 16px;
				top: 20px;
				font-weight: 400;
				z-index: 10;
				transition: .15s all cubic-bezier(.4,0,.2,1);
				user-select: none;
				pointer-events: none;
				color: #aaa;

				&.focused {
					transition: .15s all cubic-bezier(.4,0,.2,1);
					transform: scale(0.8) translateX(-6px) translateY(-16px);
					color: #333;
				}

				&.hovered {
					transition: .15s all cubic-bezier(.4,0,.2,1);
					color: #999;
				}
			}

			.line {
				width: 100%;
				position: absolute;
				height: 1px;
				background: #aaa;
				bottom: 0px;
				transition: .15s all cubic-bezier(.4,0,.2,1);

				&.focused {
					transition: .15s all cubic-bezier(.4,0,.2,1);
					background: #333;
				}

				&.hovered {
					transition: .15s all cubic-bezier(.4,0,.2,1);
					background: #999;
				}
			}

			.focus-lines {
				width: 100%;
				position: absolute;
				height: 1px;
				bottom: 1px;
				transition: .15s all cubic-bezier(.4,0,.2,1);

				.first {
					width: 0px;
					height: 1px;
					background: #333;
					position: absolute;
					top: 0;
					left: 50%;
					transition: .15s all cubic-bezier(.4,0,.2,1);
					animation-name: slideLeft;
					animation-iteration-count: 1;
				}

				.second {
					width: 0px;
					height: 1px;
					background: #333;
					position: absolute;
					top: 0;
					left: 50%;
					transition: .15s all cubic-bezier(.4,0,.2,1);
					animation-name: slideRight;
					animation-iteration-count: 1;
				}

				&.focused {

					.first {
						width: 50%;
						left: 0;
					}

					.second {
						width: 50%;
					}
				}

				&.hovered {
				}
			}

			.fade {
				position: absolute;
				width: 100%;
				height: 18px;
				background: #eee;
				top: 0;
				transition: .15s all cubic-bezier(.4,0,.2,1);
				opacity: 1;
				pointer-events: none;
				box-shadow: 0 1px 10px 4px #eee;


				&.focused {
					transition: .15s all cubic-bezier(.4,0,.2,1);
					box-shadow: 0 1px 10px 4px #ccc;
					background: #ccc;
				}

				&.hovered {
					transition: .15s all cubic-bezier(.4,0,.2,1);
					box-shadow: 0 1px 10px 4px #dcdcdc;
					background: #dcdcdc;
				}

				&.hidden {
					opacity: 0;
				}
			}
		}

		&.hovered {
			transition: .15s background cubic-bezier(.4,0,.2,1);
			background: #dcdcdc;
		}

		&.focused {
			background: #ccc;
			transition: .15s background cubic-bezier(.4,0,.2,1);
		}
	}
</style>