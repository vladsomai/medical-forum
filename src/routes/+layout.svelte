<script lang="ts">
	import Modal from '$lib/components/modal/modal.svelte';
	import { fade } from 'svelte/transition';
	import Header from './Header.svelte';
	import { page } from '$app/stores';
	import '$lib/styles/output.css';
	let currentDate = new Date();
</script>

<Modal />
<div class="w-screen h-screen ">
	<nav class="h-[10vh] pt-4">
		<Header />
	</nav>
	{#key $page.url}
		<main class="h-[88vh] overflow-auto w-full" in:fade={{ delay: 250, duration: 500 }}>
			<slot />
		</main>
	{/key}

	<footer class="h-[2vh] w-full flex justify-center text-[10px]">
		<div class="flex">
			<p>
				&copy; Medical Forum | {currentDate.getFullYear()} |
			</p>
			<a class="ml-1" href="https://anpc.ro/" target="_blank" rel="noreferrer"
				>Protectia consumatorilor</a
			>
		</div>
	</footer>
</div>
