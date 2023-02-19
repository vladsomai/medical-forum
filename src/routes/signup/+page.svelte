<script lang="ts">
	import PasswordNotMatch from '$lib/components/modal/Signup/passwordNotMatch.svelte';
	import AccoutAlreadyExists from '$lib/components/modal/Signup/accoutAlreadyExists.svelte';
	import { modalContent } from '$lib/stores/globalStore';
	import EmailIcon from '$lib/images/icons/email.svg';
	import PasswordIcon from '$lib/images/icons/password.svg';
	import PhoneIcon from '$lib/images/icons/telephone.svg';
	import { createUserWithEmailAndPassword, sendEmailVerification, type User } from 'firebase/auth';
	import { medicalForumFirebaseAuth, medicalForumFirebaseFirestore } from '$lib/firebase/firebase';
	import WeakPassword from '$lib/components/modal/Signup/weakPassword.svelte';
	import GeneralError from '$lib/components/modal/generalError.svelte';
	import CreateAccountImg from '$lib/images/create-account.svg';
	import VerificationEmailSent from '$lib/components/modal/Signup/verificationEmailSent.svelte';
	import { addDoc, collection } from 'firebase/firestore';
	import { AttributeEnum } from '$lib/types';
	import { goto } from '$app/navigation';
	import VerificationEmailNotSent from '$lib/components/modal/Signup/verificationEmailNotSent.svelte';

	let loading = false;
	async function handleSignup(e: any) {
		e.preventDefault();

		loading = true;

		const email = e.target['email'].value;
		const phone = e.target['phone'].value;
		const password = e.target['password'].value;
		const passwordConfirmation = e.target['passwordConfirmation'].value;
		let modalElem = document.getElementById('modalElement');

		if (password !== passwordConfirmation) {
			//@ts-ignore
			$modalContent = PasswordNotMatch;
			modalElem?.click();
		} else {
			const result = await createUserWithEmailAndPassword(
				medicalForumFirebaseAuth,
				email,
				password
			).catch((err) => err);

			if (result.code === undefined) {
				//email created, send email verification
				const res = await sendEmailVerification(medicalForumFirebaseAuth.currentUser as User).catch(
					(err) => err
				);

				if (res === undefined) {
					//res must be undefined when the email was sent
					//@ts-ignore
					$modalContent = VerificationEmailSent;
					modalElem?.click();

					//add default attributes
					try {
						const docRef = await addDoc(collection(medicalForumFirebaseFirestore, 'UserProfile'), {
							UID: medicalForumFirebaseAuth.currentUser?.uid,
							PhoneNumber: phone,
							Attribute: AttributeEnum.PowerUser
						});
						goto('/dashboard');
					} catch (e) {}
				} else {
					//the verification email was not sent

					//@ts-ignore
					$modalContent = VerificationEmailNotSent;
					modalElem?.click();
				}
			} else {
				switch (result.code) {
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
			}
		}

		loading = false;
	}
</script>

<svelte:head>
	<title>Sign up | Medical Forum</title>
	<meta name="description" content="Medical Forum - Sign up" />
</svelte:head>
<div class="w-full h-full flex flex-col items-center justify-center">
	<img class="w-4/6 sm:w-2/6 lg:w-1/6 mb-4" alt="create an account" src={CreateAccountImg} />

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
				<img src={PhoneIcon} alt="phone" />
				<input
					name="phone"
					required
					placeholder="Numar de telefon"
					class="input input-primary input-sm border-0 rounded-r-full focus:outline-none outline-none focus:bg-transparent bg-transparent active:bg-transparent ml-1"
					type="tel"
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
			<button
				class={`btn btn-primary rounded-full ${loading ? 'loading' : ''}`}
				disabled={loading}
				type="submit">Continua</button
			>
		</form>
	</div>
</div>
