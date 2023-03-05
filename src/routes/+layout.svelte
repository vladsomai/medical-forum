<script lang="ts">
	import Modal from '$lib/components/modal/modal.svelte';
	import { fade } from 'svelte/transition';
	import Header from './Header.svelte';
	import { page } from '$app/stores';
	import '$lib/styles/output.css';
	import Drawer from '$lib/components/drawer.svelte';
	let currentDate = new Date();
</script>

<Drawer>
	<Modal />
	<nav class="fixed z-50 top-0 py-10 w-full bg-base-100 h-[10vh]">
		<Header />
	</nav>

	{#key $page.url}
		<main class="h-full w-full " in:fade={{ delay: 250, duration: 500 }}>
			<slot />
		</main>
	{/key}

	<footer class="fixed bottom-0 z-10 bg-base-100 w-full flex justify-center text-[10px]">
		<div class="flex justify-center items-center">
			<p>
				&copy; Medical Forum | {currentDate.getFullYear()} |
			</p>
			<a class="ml-1" href="https://anpc.ro/" target="_blank" rel="noreferrer"
				>Protectia consumatorilor</a
			>
		</div>
	</footer>
</Drawer>
