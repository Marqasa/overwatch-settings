<script lang="ts">
	export let width: number = 16;
	export let height: number = 16;
	export let rotation: number = 0;
</script>

<div
	class="flex justify-center align-middle"
	style={`transform: rotate(${rotation}deg); width: ${width}px; height: ${height}px;`}
>
	<svg viewBox="0 0 515.1 220.3">
		<path
			fill="#000000"
			d="m1.5.7 256 219 256-219-37 4s-185.6 79.2-219 80c-33.5.7-215-80-215-80Z"
		/>
	</svg>
</div>
