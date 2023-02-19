<script lang="ts">
	import type { User } from 'firebase/auth';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let users: User[] = [];

</script>

<div class="w-full h-ful">
	{#each data.users as user}
		<p>{user}</p>
	{/each}
</div>
