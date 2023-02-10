<script lang="ts">
	import favicon from '$lib/images/favicon.png';
    import ContulMeuImg from "$lib/images/icons/person-circle.svg"
</script>

<div class="flex h-full w-full justify-around items-center">
	<a href="/">
		<div class="flex flex-col justify-center items-center">
			<img src={favicon} height="40" width="40" alt="logo" />
			<p class="MainTextColor text-md">Medical Forum</p>
		</div>
	</a>
	<div>
		<a href="/signin" class="btn btn-ghost border-solid border-3 border-primary rounded-full"><img src={ContulMeuImg} class="w-6 h-6 mr-3" alt="my account"> Contul meu </a>
	</div>
</div>
