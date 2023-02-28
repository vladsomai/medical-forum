<script lang="ts">
	import { error } from '@sveltejs/kit';
	import { AttributeEnum } from '$lib/types';
	import { browser } from '$app/environment';
	import { user } from '$lib/stores/globalStore';
	import { onMount } from 'svelte';
	import { modalContent } from '$lib/stores/globalStore';
	import { goto } from '$app/navigation';
	import SigninFirst from '$lib/components/modal/Signin/signinFirst.svelte';
	import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
	import { medicalForumFirebaseAuth, medicalForumFirebaseFirestore } from '$lib/firebase/firebase';
	import type { User } from 'firebase/auth';
	import GeneralError from '$lib/components/modal/generalError.svelte';
	let loadingUser = true;

	let redirectTimeout: NodeJS.Timeout;
	redirectTimeout = setTimeout(() => {
		//wait max 2s for firebase to send us the current user
		if (!$user) {
			redirect();
		}
	}, 3000);

	async function determineUserType(user: User | null) {
		try {
			if (user) {
				//check what attribute the user has
				clearTimeout(redirectTimeout);

				const q = query(
					collection(medicalForumFirebaseFirestore, 'UserProfile'),
					where('UID', '==', user.uid)
				);

				const querySnapshot = await getDocs(q);
				const profile = querySnapshot.docs[0].data();

				switch (profile.Attribute) {
					case AttributeEnum.Medic:
						await goto('/dashboard/medic');
						break;
					case AttributeEnum.Admin:
						await goto('/dashboard/admin');
						break;
					default:
						await goto('/dashboard');
						break;
				}
				loadingUser = false;
			}
		} catch (error) {
			if (browser) {
				const modalElem = document.getElementById('modalElement');
				//@ts-ignore
				$modalContent = GeneralError;
				modalElem?.click();
				goto('/signin');
			}
			loadingUser = false;
		}
	}
	$: determineUserType($user);

	async function redirect() {
		if (browser) {
			const modalElem = document.getElementById('modalElement');
			//@ts-ignore
			$modalContent = SigninFirst;
			modalElem?.click();
			goto('/signin');
		}
	}
	onMount(() => {
		return () => {
			clearTimeout(redirectTimeout);
		};
	});
</script>

{#if loadingUser}
	<div class="fixed w-screen h-screen flex justify-center items-center top-0">
		<div class="text-center flex flex-col justify-center items-center">
			<div class="w-[50px] h-[50px] rounded-full bg-accent animate-ping" />
			<p class="mt-10 text-3xl">Loading...</p>
		</div>
	</div>
{:else}
	{#if $user && !$user.emailVerified}
		<div class=" flex justify-center items-center mt-10 w-full">
			<div
				class="alert alert-warning shadow-lg max-w-[80%] md:max-w-[60%] lg:max-w-[60%] xl:max-w-[25%]"
			>
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current flex-shrink-0 h-10 w-10"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/></svg
					>
					<span
						>Pentru a putea face actiuni pe platforma, te rugam sa iti confirmi adresa de email.</span
					>
				</div>
			</div>
		</div>
	{/if}

	<slot />
{/if}
