<script lang="ts">
	import LoginImg from '$lib/images/login.svg';
	import EmailIcon from '$lib/images/icons/email.svg';
	import PasswordIcon from '$lib/images/icons/password.svg';

	function handleSignin(e: any) {
		e.preventDefault();
	}
</script>

<svelte:head>
	<title>Sign in | Medical Forum</title>
	<meta name="description" content="Medical Forum - Sign in" />
</svelte:head>
<div class="w-full h-full flex flex-col items-center justify-center">
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
			<button class="btn btn-primary rounded-full" type="submit">Intra in cont</button>
		</form>
		<div class="flex flex-col justify-center items-center">
			<a class="link link-primary text-xl mt-2" href="/recover-password">Ai uitat parola?</a>
			<p class="mt-3">sau</p>
			<a class="link link-primary text-xl " href="/signup">Creeaza un cont</a>
		</div>
	</div>
</div>
