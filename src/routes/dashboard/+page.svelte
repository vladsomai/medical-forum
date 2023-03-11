<script lang="ts">
	import { goto } from '$app/navigation';
	import { medicalForumFirebaseAuth } from '$lib/../hooks.client';
	import { signOut } from 'firebase/auth';
</script>

<svelte:head>
	<title>Dashboard | Medical Forum</title>
	<meta name="description" content="Medical Forum - User dashboard page" />
</svelte:head>

<div class="w-full h-full flex justify-center items-center" />
