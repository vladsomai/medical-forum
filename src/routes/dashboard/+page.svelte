<script lang="ts">
	import { goto } from '$app/navigation';
	import { medicalForumFirebaseAuth } from '$lib/firebase/firebase';
	import { signOut } from 'firebase/auth';
</script>

<svelte:head>
	<title>Programari | Medical Forum</title>
	<meta name="description" content="Medical Forum - Recuperare parola" />
</svelte:head>

<div class="w-full h-full flex justify-center items-center">
	<button
		class="btn btn-ghost rounded-full"
		on:click={() => {
			signOut(medicalForumFirebaseAuth);
			goto('/');
		}}>Sign out</button
	>
</div>
