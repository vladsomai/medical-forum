<script>
	import Header from './Header.svelte';
	import '$lib/styles/output.css';
	let currentDate = new Date();
</script>

<div class="w-screen h-screen">
	<main class="h-[97vh] w-full">
		<slot />
	</main>

	<footer class="h-[2vh] w-full flex justify-center text-[13px]">
		<div class="flex">
			Copyright
			<p>
				&nbsp; &copy; {currentDate.getFullYear()}&nbsp;
			</p>
			<a href="https://svgdev.net/" target="_blank" rel="noreferrer">Svg Development</a>
		</div>
	</footer>
</div>
