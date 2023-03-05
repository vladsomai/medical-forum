<script lang="ts">
	import { goto } from '$app/navigation';
	import { medicalForumFirebaseAuth } from '$lib/firebase/firebase';
	import { user } from '$lib/stores/globalStore';
	import { signOut } from 'firebase/auth';
	import SignOutImg from '$lib/images/icons/sign-out.svg';
	import MyAccountImg from '$lib/images/icons/person-circle.svg';
	import CalendarImg from '$lib/images/icons/calendar.svg';
</script>

<div class="drawer drawer-end">
	<input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<slot />
	</div>
	<div class="drawer-side">
		<label for="my-drawer-4" class="drawer-overlay" />
		<ul class="menu p-4 w-80 bg-base-100 text-base-content">
			<li class="bg-red flex justify-end w-7 h-7 self-end m-10">
				<button
					on:click={() => {
						document.getElementById('my-drawer-4')?.click();
					}}
				>
					<svg
						class="h-7 w-7 stroke-primary"
						viewBox="0 0 1024 1024"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
						/></svg
					>
				</button>
			</li>
			<li>
				<a
					class="text-center bg-primary mb-3"
					href={$user ? '/dashboard' : '/signin'}
					on:click={() => {
						document.getElementById('my-drawer-4')?.click();
					}}
				>
					<img src={MyAccountImg} class="w-6 h-6 mr-3" alt="my account" />
					Contul meu
				</a>
			</li>

			{#if !$user}
				<li>
					<a
						class="text-center bg-primary mb-3"
						href="/appointment"
						on:click={() => {
							document.getElementById('my-drawer-4')?.click();
						}}
					>
						<img src={CalendarImg} class="w-6 h-6 mr-3" alt="sign out" />
						Programare fara cont
					</a>
				</li>
			{/if}

			{#if $user}
				<li>
					<button
						class="bg-primary mb-3"
						on:click={(e) => {
							signOut(medicalForumFirebaseAuth);
							goto('/');
							document.getElementById('my-drawer-4')?.click();
						}}
					>
						<img src={SignOutImg} class="w-6 h-6 mr-3" alt="sign out" />
						Iesi din cont
					</button>
				</li>
			{/if}
		</ul>
	</div>
</div>
