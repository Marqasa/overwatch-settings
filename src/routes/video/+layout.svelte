<script lang="ts">
	import { page } from '$app/stores';
</script>

<section class="flex gap-14">
	<nav class="flex flex-col gap-1 min-w-[18%]">
		<a
			href="/video/video"
			class="bg-[#303b50] p-4 rounded"
			class:active={$page.url.pathname.includes('/video/video')}>Video</a
		>
		<a
			href="/video/graphics-quality"
			class="bg-[#303b50] p-4 rounded"
			class:active={$page.url.pathname.includes('/video/graphics-quality')}>Graphics Quality</a
		>
		<a
			href="/video/details"
			class="bg-[#303b50] p-4 rounded"
			class:active={$page.url.pathname.includes('/video/details')}>Details</a
		>
	</nav>

	<section class="flex-1">
		<slot />
	</section>
</section>

<style>
	nav {
		display: flex;
		flex-direction: column;
	}
	.active {
		background-color: #01f4f3;
		color: black;
	}
</style>
