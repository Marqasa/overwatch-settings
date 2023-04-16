<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
</script>

<main
	class="flex flex-col gap-8 bg-slate-400 min-h-full p-16 text-white uppercase text-3xl font-sans font-bold"
>
	<div>
		<nav class="p-2 bg-[#303b50] flex max-w-min rounded">
			<a href="/video/video" class="px-8 py-4" class:active={$page.url.pathname.includes('/video')}>
				Video
			</a>
			<!-- <a href="/sound" class="px-8 py-4" class:active={$page.url.pathname.includes('/sound')}>
				Sound
			</a>
			<a href="/controls" class="px-8 py-4" class:active={$page.url.pathname.includes('/controls')}>
				Controls
			</a>
			<a href="/gameplay" class="px-8 py-4" class:active={$page.url.pathname.includes('/gameplay')}>
				Gameplay
			</a>
			<a href="/social" class="px-8 py-4" class:active={$page.url.pathname.includes('/social')}
				>Social</a
			>
			<a
				href="/accessibility"
				class="px-8 py-4"
				class:active={$page.url.pathname.includes('/accessibility')}
			>
				Accessibility
			</a> -->
		</nav>
	</div>

	<div class="pl-14 pt-10">
		<slot />
	</div>
</main>

<style>
	.active {
		background-color: #01f4f3;
		color: black;
	}
</style>
