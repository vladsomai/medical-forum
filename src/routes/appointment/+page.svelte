<script lang="ts">
	import EmailIcon from '$lib/images/icons/email.svg';
	import NameIcon from '$lib/images/icons/person-details.svg';
	import PhoneIcon from '$lib/images/icons/telephone.svg';
	import SpecialityIcon from '$lib/images/icons/appointment-speciality.svg';
	import { Specialities } from '$lib/types';
	import AppointmentDone from '$lib/components/modal/Appointment/appointmentDone.svelte';
	import { modalContent } from '$lib/stores/globalStore';
	let loading = false;
	
	function handleAppointment() {
		const modalElem = document.getElementById('modalElement');

		//@ts-ignore
		$modalContent = AppointmentDone;
		modalElem?.click();
	}
</script>

<svelte:head>
	<title>Programari fara cont | Medical Forum</title>
	<meta name="description" content="Medical Forum - Programare fara cont" />
</svelte:head>

<div class="w-full h-screen fixed top-0 flex justify-center items-center">
	<div class=" mx-[10%] flex flex-col justify-center items-center">
		<form class="flex flex-col my-5 " on:submit={handleAppointment}>
			<div class="input input-primary mb-4 rounded-full flex justify-between items-center ">
				<img src={NameIcon} alt="last name" />
				<input
					name="lastName"
					required
					placeholder="Nume"
					class="input input-primary input-sm border-0 rounded-r-full focus:outline-none outline-none focus:bg-transparent bg-transparent active:bg-transparent ml-1"
					type="text"
				/>
			</div>
			<div class="input input-primary mb-4 rounded-full flex justify-between items-center ">
				<img src={NameIcon} alt="first name" />
				<input
					name="firstName"
					required
					placeholder="Prenume"
					class="input input-primary input-sm border-0 rounded-r-full focus:outline-none outline-none focus:bg-transparent bg-transparent active:bg-transparent ml-1"
					type="text"
				/>
			</div>
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
				<img src={SpecialityIcon} alt="appointment speciality" />
				<select
					class="select select-primary select-sm w-full max-w-xs border-0 rounded-r-full focus:outline-none outline-none focus:bg-transparent bg-transparent active:bg-transparent ml-1"
				>
					<option disabled selected>Specializare</option>
					{#each [...Specialities] as [key, value]}
						<option>{value}</option>
					{/each}
				</select>
			</div>
			<div class="form-control mb-4 flex justify-between items-center">
				<label class="label cursor-pointer flex items-center justify-center">
					<span class="label-text mr-3 text-[16px]">Ai nevoie si de investigatii?</span>
					<input type="checkbox" checked={true} class="checkbox checkbox-primary" />
				</label>
			</div>
			<button
				class={`btn btn-primary rounded-full ${loading ? 'loading' : ''}`}
				disabled={loading}
				type="submit">Programeaza-te fara cont!</button
			>
		</form>
	</div>
</div>
