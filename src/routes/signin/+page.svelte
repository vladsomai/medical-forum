<script lang="ts">
	import LoginImg from '$lib/images/login.svg';
	import EmailIcon from '$lib/images/icons/email.svg';
	import PasswordIcon from '$lib/images/icons/password.svg';
	import { modalContent, user } from '$lib/stores/globalStore';
	import {
		signInWithEmailAndPassword,
	} from 'firebase/auth';
	import { medicalForumFirebaseAuth } from '$lib/firebase/firebase';
	import GeneralError from '$lib/components/modal/generalError.svelte';
	import UserNotFound from '$lib/components/modal/Signin/userNotFound.svelte';
	import WrongPassword from '$lib/components/modal/Signin/wrongPassword.svelte';
	import AccountBlocked from '$lib/components/modal/Signin/accountBlocked.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	let loading = false;
	async function handleSignin(e: any) {
		e.preventDefault();

		loading = true;

		const email = e.target['email'].value;
		const password = e.target['password'].value;

		const result = await signInWithEmailAndPassword(
			medicalForumFirebaseAuth,
			email,
			password
		).catch((err) => err);

		let modalElem = document.getElementById('modalElement');

		if (result.code === undefined) {
			//ok the user is authenticated
			if (browser && $user) {
				goto('/dashboard');
			}
		} else {
			switch (result.code) {
				case 'auth/user-not-found':
					//@ts-ignore
					$modalContent = UserNotFound;
					modalElem?.click();
					break;
				case 'auth/wrong-password':
					//@ts-ignore
					$modalContent = WrongPassword;
					modalElem?.click();
					break;
				case 'auth/too-many-requests':
					//@ts-ignore
					$modalContent = AccountBlocked;
					modalElem?.click();
					break;
				default:
					//@ts-ignore
					$modalContent = GeneralError;
					modalElem?.click();
					break;
			}
		}

		loading = false;
	}
</script>

<svelte:head>
	<title>Sign in | Medical Forum</title>
	<meta name="description" content="Medical Forum - Sign in" />
</svelte:head>

<div class="w-full fixed top-0 h-screen flex flex-col items-center justify-center">
	<img class="w-4/6 sm:w-2/6 lg:w-1/6 mb-4" alt="login" src={LoginImg} />
	<div>
		<form class="flex flex-col" on:submit={handleSignin}>
			<div class="input input-primary mb-4 rounded-full flex justify-between items-center ">
				<img src={EmailIcon} alt="email" />
				<input
					name="email"
					required
					placeholder="Email"
					class="input input-primary input-sm border-0 rounded-r-full focus:outline-none outline-none focus:bg-transparent bg-transparent active:bg-transparent ml-1"
					type="email"
				/>
			</div>
			<div class="input input-primary mb-4 rounded-full flex justify-between items-center ">
				<img src={PasswordIcon} alt="password" />
				<input
					name="password"
					required
					placeholder="Parola"
					class="input input-primary input-sm border-0 rounded-r-full focus:outline-none outline-none focus:bg-transparent bg-transparent active:bg-transparent ml-1"
					type="password"
				/>
			</div>
			<button
				class={`btn btn-primary rounded-full ${loading ? 'loading' : ''}`}
				disabled={loading}
				type="submit">Intra in cont</button
			>
		</form>
		<div class="flex flex-col justify-center items-center">
			<a class="link link-primary text-xl mt-2 link-hover" href="/recover-password">Ai uitat parola?</a>
			<p class="mt-3">sau</p>
			<a class="link link-primary text-xl link-hover" href="/signup">Creeaza un cont</a>
		</div>
	</div>
</div>
