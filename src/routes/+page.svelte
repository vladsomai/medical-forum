<script lang="ts">
	import Drawer from '$lib/components/drawer.svelte';
	import GoogleMaps from '$lib/components/googleMaps.svelte';
	import MedicsImg from '$lib/images/medicine.svg';
	let WindowHeight = 0;
	let WindowWidth = 0;
</script>

<svelte:window bind:innerHeight={WindowHeight} bind:innerWidth={WindowWidth} />
<svelte:head>
	<title>Home | Medical Forum</title>
	<meta name="description" content="Medical Forum - Home page" />
</svelte:head>

<div class="h-[90vh] flex flex-col items-center justify-start">
	<div class="text-center px-[2%]">
		<p class="MainTextColor text-4xl xl:text-6xl">Clinica Medical Forum</p>
		<p class="SecondaryTextColor text-1xl xl:text-2xl">Transformam asistenta medicala, impreuna</p>
	</div>
	<img
		src={MedicsImg}
		alt="2 doctors with a heart"
		class="max-w-[70%] md:max-w-[40%] xl:max-w-[30%]"
	/>
	<p class="text-3xl mt-[5%]">In curand in Oradea</p>
</div>

<div class="h-[40vh] w-full flex flex-col justify-center items-center">
	<p class="text-3xl md:text-5xl xl:text-7xl mb-10 text-center">Unde ne gasesti?</p>
	<GoogleMaps />
</div>
