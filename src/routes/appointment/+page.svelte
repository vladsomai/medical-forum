<script lang="ts">
	import EmailIcon from '$lib/images/icons/email.svg';
	import NameIcon from '$lib/images/icons/person-details.svg';
	import PhoneIcon from '$lib/images/icons/telephone.svg';
	import SpecialityIcon from '$lib/images/icons/appointment-speciality.svg';
	import MedicIcon from '$lib/images/icons/medic.svg';
	import { AttributeEnum, Specialities } from '$lib/types';
	import AppointmentDone from '$lib/components/modal/Appointment/appointmentDone.svelte';
	import ChoseOneSpeciality from '$lib/components/modal/Appointment/choseOneSpeciality.svelte';
	import { modalContent } from '$lib/stores/globalStore';
	let loading = false;
	import type { UserProfile } from '$lib/types';
	import { getAllUsers } from '$lib/firebase/users';
	import { onMount } from 'svelte';
	import UnavailableMedics from '$lib/components/modal/Appointment/unavailableMedics.svelte';
	import ChoseOneMedic from '$lib/components/modal/Appointment/choseOneMedic.svelte';

	const defaultSpeciality = 'Alege specializarea';
	const unavailableMedics = 'Medici indisponibili';
	const defaultMedic = 'Alege un medic';

	let allUsers: UserProfile[] = [];
	let currentSpeciality = defaultSpeciality;
	let availableMedicsForCurrentSpeciality: UserProfile[] = [];

	$: {
		availableMedicsForCurrentSpeciality = [];
		allUsers.map((user) => {
			if (user.Attribute === AttributeEnum.Medic && user.Speciality === currentSpeciality) {
				availableMedicsForCurrentSpeciality = [...availableMedicsForCurrentSpeciality, user];
			}
		});
	}

	onMount(async () => {
		allUsers = await getAllUsers();
	});

	function handleAppointment(e: any) {
		const modalElem = document.getElementById('modalElement');

		const lastname = e.target[0].value;
		const firstname = e.target[1].value;
		const email = e.target[2].value;
		const phone = e.target[3].value;
		const speciality = e.target[4].value;
		const medic = e.target[5].value;

		if (speciality === defaultSpeciality) {
			//@ts-ignore
			$modalContent = ChoseOneSpeciality;
			modalElem?.click();
			return;
		}

		if (medic === defaultMedic) {
			//@ts-ignore
			$modalContent = ChoseOneMedic;
			modalElem?.click();
			return;
		}

		if (medic === unavailableMedics) {
			//@ts-ignore
			$modalContent = UnavailableMedics;
			modalElem?.click();
			return;
		}

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
		<form class="flex flex-col my-5 " on:submit|preventDefault={handleAppointment}>
			<div class="input input-primary mb-4 rounded-full flex justify-start items-center ">
				<img src={NameIcon} alt="last name" />
				<input
					name="lastName"
					required
					placeholder="Nume"
					class="input input-primary input-sm border-0 rounded-r-full focus:outline-none outline-none focus:bg-transparent bg-transparent active:bg-transparent ml-1"
					type="text"
				/>
			</div>
			<div class="input input-primary mb-4 rounded-full flex justify-start items-center ">
				<img src={NameIcon} alt="first name" />
				<input
					name="firstName"
					required
					placeholder="Prenume"
					class="input input-primary input-sm border-0 rounded-r-full focus:outline-none outline-none focus:bg-transparent bg-transparent active:bg-transparent ml-1"
					type="text"
				/>
			</div>
			<div class="input input-primary mb-4 rounded-full flex justify-start items-center ">
				<img src={EmailIcon} alt="email" />
				<input
					name="email"
					required
					placeholder="Email"
					class="input input-primary input-sm border-0 rounded-r-full focus:outline-none outline-none focus:bg-transparent bg-transparent active:bg-transparent ml-1"
					type="email"
				/>
			</div>
			<div class="input input-primary mb-4 rounded-full flex justify-start items-center ">
				<img src={PhoneIcon} alt="phone" />
				<input
					name="phone"
					required
					placeholder="Numar de telefon"
					class="input input-primary input-sm border-0 rounded-r-full focus:outline-none outline-none focus:bg-transparent bg-transparent active:bg-transparent ml-1"
					type="tel"
				/>
			</div>
			<div class="input input-primary mb-4 rounded-full flex justify-start items-center ">
				<img src={SpecialityIcon} alt="appointment speciality" />
				<select
					bind:value={currentSpeciality}
					class="select select-primary select-sm w-full max-w-xs border-0 rounded-r-full focus:outline-none outline-none focus:bg-transparent bg-transparent active:bg-transparent ml-1"
				>
					<option disabled selected>{defaultSpeciality}</option>
					{#each [...Specialities] as [key, value]}
						<option>{value}</option>
					{/each}
				</select>
			</div>
			<div class="input input-primary mb-4 rounded-full flex justify-start items-center ">
				<img src={MedicIcon} alt="medic" class="w-[17px] h-auto m-0 p-0" />
				<select
					class="select select-primary select-sm w-full max-w-xs border-0 rounded-r-full focus:outline-none outline-none focus:bg-transparent bg-transparent active:bg-transparent ml-1"
				>
					{#if availableMedicsForCurrentSpeciality.length === 0}
						<option disabled selected>{unavailableMedics}</option>
					{:else}
						<option disabled selected>{defaultMedic}</option>
						{#each availableMedicsForCurrentSpeciality as user}
							<option>{user.Attribute === AttributeEnum.Medic ? user.Title : ''}</option>
						{/each}
					{/if}
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
