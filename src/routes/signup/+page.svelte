<script lang="ts">
	import PasswordNotMatch from '$lib/components/modal/Signup/passwordNotMatch.svelte';
	import AccoutAlreadyExists from '$lib/components/modal/Signup/accoutAlreadyExists.svelte';
	import { modalContent } from '$lib/stores/globalStore';
	import { onMount } from 'svelte';
	import EmailIcon from '$lib/images/icons/email.svg';
	import PasswordIcon from '$lib/images/icons/password.svg';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { medicalForumFirebaseAuth } from '$lib/firebase/firebase';
	import WeakPassword from '$lib/components/modal/Signup/weakPassword.svelte';
	import GeneralError from '$lib/components/modal/generalError.svelte';

	async function handleSignup(e: any) {
		e.preventDefault();

		const email = e.target['email'].value;
		const password = e.target['password'].value;
		const passwordConfirmation = e.target['passwordConfirmation'].value;

		if (password !== passwordConfirmation) {
			//@ts-ignore
			$modalContent = PasswordNotMatch;
			const modalElem = document.getElementById('modalElement');
			modalElem?.click();
			return;
		}

		const res = await createUserWithEmailAndPassword(medicalForumFirebaseAuth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
			})
			.catch((error) => {
				const errorCode = error.code;
				let modalElem = document.getElementById('modalElement');
				switch (errorCode) {
					case 'auth/weak-password':
						//@ts-ignore
						$modalContent = WeakPassword;
						modalElem?.click();
						break;
					case 'auth/email-already-in-use':
						//@ts-ignore
						$modalContent = AccoutAlreadyExists;
						modalElem?.click();
						break;
					default:
						//@ts-ignore
						$modalContent = GeneralError;
						modalElem?.click();
						break;
				}

				return;
			});
	}

	onMount(() => {});
</script>

<svelte:head>
	<title>Sign up | Medical Forum</title>
	<meta name="description" content="Medical Forum - Sign up" />
</svelte:head>
<div class="w-full h-full flex flex-col items-center justify-center">
	<p class="text-6xl my-10 text-center">Creeaza un cont</p>
	<div>
		<form class="flex flex-col" on:submit={handleSignup}>
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
			<div class="input input-primary mb-4 rounded-full flex justify-between items-center ">
				<img src={PasswordIcon} alt="confirm password" />
				<input
					name="passwordConfirmation"
					required
					placeholder="Confirma parola"
					class="input input-primary input-sm border-0 rounded-r-full focus:outline-none outline-none focus:bg-transparent bg-transparent active:bg-transparent ml-1"
					type="password"
				/>
			</div>
			<button class="btn btn-primary rounded-full" type="submit">Continua</button>
		</form>
	</div>
</div>
