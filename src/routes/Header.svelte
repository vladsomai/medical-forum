<script lang="ts">
	import favicon from '$lib/images/favicon.png';
	import MyAccountImg from '$lib/images/icons/person-circle.svg';
	import CalendarImg from '$lib/images/icons/calendar.svg';
	import { medicalForumFirebaseAuth } from '$lib/firebase/firebase';
	import { user } from '$lib/stores/globalStore';
	import { signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';
</script>

<div class="flex h-full w-full justify-around items-center">
	<a href="/" class="flex flex-col justify-center items-center w-[50%] md:w-auto">
		<img src={favicon} height="40" width="40" alt="logo" />
		<p class="MainTextColor text-md text-center">Medical Forum</p>
	</a>
	<div class="dropdown dropdown-end w-[50%] md:w-auto md:hidden text-right pr-[15%]">
		<button class="btn btn-ghost btn-circle">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-7 w-7 stroke-primary"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h7"
				/></svg
			>
		</button>
		<ul
			class="menu menu-compact dropdown-content mt-3 mr-[10%] p-2 shadow rounded-box w-[70%]  items-center bg-primary font-bold"
		>
			<li>
				<a href={$user ? '/dashboard' : '/signin'}> Contul meu </a>
			</li>
			{#if $user}
				<li>
					<button
						on:click={() => {
							signOut(medicalForumFirebaseAuth);
							goto('/');
						}}>Sign out</button
					>
				</li>
			{/if}
		</ul>
	</div>
	<div class="hidden md:flex">
		{#if $user}
			<button
				class="btn btn-ghost border-solid border-3 border-primary rounded-full mr-4"
				on:click={() => {
					signOut(medicalForumFirebaseAuth);
					goto('/');
				}}>Sign out</button
			>
		{/if}
		<a
			href={$user ? '/dashboard' : '/signin'}
			class="btn btn-ghost border-solid border-3 border-primary rounded-full"
			><img src={MyAccountImg} class="w-6 h-6 mr-3" alt="my account" />
			Contul meu
		</a>
	</div>
</div>
