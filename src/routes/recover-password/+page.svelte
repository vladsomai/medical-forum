<script lang="ts">
	import EmailIcon from '$lib/images/icons/email.svg';
	import RecoverPasswordImg from '$lib/images/forgot-password.svg';
	import { sendPasswordResetEmail } from 'firebase/auth';
	import { medicalForumFirebaseAuth } from '$lib/firebase/firebase';
	import { modalContent } from '$lib/stores/globalStore';
	import EmailSent from '$lib/components/modal/emailSent.svelte';
	import UserNotFound from '$lib/components/modal/userNotFound.svelte';

	let loading = false;
	async function recoverPassword(e: any) {
		loading = true;
		e.preventDefault();
		const email = e.target['email'].value;

		sendPasswordResetEmail(medicalForumFirebaseAuth, email)
			.then(() => {
				//@ts-ignore
				$modalContent = EmailSent;
				const modalElem = document.getElementById('modalElement');
				modalElem?.click();
				loading = false;
			})
			.catch((error) => {
				const errorCode = error.code;
				console.log(errorCode);
				let modalElem = document.getElementById('modalElement');
				switch (errorCode) {
					case 'auth/user-not-found':
						//@ts-ignore
						$modalContent = UserNotFound;
						modalElem?.click();
						break;
					default:
						//@ts-ignore
						$modalContent = GeneralError;
						modalElem?.click();
						break;
				}
				loading = false;
			});
	}
</script>

<svelte:head>
	<title>Recuperare parola | Medical Forum</title>
	<meta name="description" content="Medical Forum - Recuperare parola" />
</svelte:head>
<div class="w-full h-full flex flex-col items-center justify-center">
	<img class="w-3/6 sm:w-2/6 lg:w-1/6 mb-4" alt="recover email" src={RecoverPasswordImg} />
	<div>
		<form class="flex flex-col" on:submit={recoverPassword}>
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
			<button
				class={`btn btn-primary rounded-full ${loading ? 'loading' : ''}`}
				type="submit"
				disabled={loading}>Recupereaza parola</button
			>
		</form>
	</div>
</div>
