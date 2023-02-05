<script>
	import { fade } from 'svelte/transition';
	import MedicsImg from '$lib/images/medicine.svg';
	import { onMount } from 'svelte';
	let WindowHeight = 0;
	let WindowWidth = 0;

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:window bind:innerHeight={WindowHeight} bind:innerWidth={WindowWidth} />
<svelte:head>
	<title>Home | Medical Forum</title>
	<meta name="description" content="Medical Forum - Home page" />
</svelte:head>

{#if mounted}
	<div
		class="flex flex-col items-center h-full justify-start"
		transition:fade={{ delay: 250, duration: 500 }}
	>
		<div class="text-center  my-[10%] md:my-[3%]">
			<p class="MainTextColor text-4xl xl:text-6xl">Clinica Medical Forum</p>
			<p class="SecondaryTextColor text-1xl xl:text-2xl">
				Transformam asistenta medicala, impreuna
			</p>
		</div>
		<img
			src={MedicsImg}
			alt="2 doctors with a heart"
			class="max-w-[70%] md:max-w-[40%] xl:max-w-[30%]"
		/>
		<p class="text-3xl mt-[5%]">In curand in Oradea</p>
	</div>
{/if}
