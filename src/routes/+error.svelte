<script lang="ts">
	import PageNotFoundImg from '$lib/images/page_not_found.svg';
</script>

<svelte:head>
	<title>Pagina inexistenta | Medical Forum</title>
	<meta name="description" content="Medical Forum - Home page" />
</svelte:head>
<div class="w-full h-full flex justify-center items-center">
	<div class="w-full mx-[10%] sm:w-[40%] xl:w-[30%] flex justify-center items-center flex-col">
		<img src={PageNotFoundImg} alt="page not found" />
		<p class="text-2xl sm:text-3xl mt-5 text-center">Ne pare rau, pagina pe care o cauti nu exista.</p>
	</div>
</div>
