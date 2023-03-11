<script lang="ts">
	import Modal from '$lib/components/modal/modal.svelte';
	import { fade } from 'svelte/transition';
	import Header from '$lib/components/header.svelte';
	import { page } from '$app/stores';
	import '$lib/styles/output.css';
	import Drawer from '$lib/components/drawer.svelte';
	import Footer from '$lib/components/footer.svelte';
</script>

<Drawer>
	<Modal />
	<nav class="sticky z-10 top-0 py-10 w-[99%] bg-base-100 h-[10vh]">
		<Header />
	</nav>

	{#key $page.url}
		<main class="w-full mt-[3vh] mb-[5vh] md:mt-[10vh]" in:fade={{ delay: 250, duration: 500 }}>
			<slot />
		</main>
	{/key}
	<Footer />
</Drawer>
