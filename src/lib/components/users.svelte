<script lang="ts">
	import { AttributeEnum, type UserProfile } from '$lib/types';
	import { getAllUsers } from '$lib/firebase/users';
	import { onMount } from 'svelte';

	let allUsers: UserProfile[] = [];
	onMount(async () => {
		allUsers = await getAllUsers();
	});
</script>

<div class="overflow-x-auto mt-[5%] mx-[2%]">
	<table class="table w-full">
		<thead>
			<tr>
				<th />
				<th>Nume</th>
				<th>Email</th>
				<th>Mobil</th>
				<th>Tip cont</th>
			</tr>
		</thead>
		<tbody>
			{#each allUsers as user, index}
				<tr>
					<th>{index + 1}</th>
					<td>{user.LastName + ' ' + user.FirstName}</td>
					<td>{user.Email}</td>
					<td>{user.PhoneNumber}</td>
					<td>{AttributeEnum[Number(user.Attribute)]}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
