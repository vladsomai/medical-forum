<script lang="ts">
	import type { User, UserProfile } from 'firebase/auth';
	import { collection, getDocs } from 'firebase/firestore';
	import { medicalForumFirebaseFirestore } from '$lib/firebase/firebase';
	import { AttributeEnum } from '$lib/types';

	let allUsers: UserProfile[] = [];
	getAllUsers();

	async function getAllUsers() {
		const querySnapshot = await getDocs(collection(medicalForumFirebaseFirestore, 'UserProfile'));
		let count = 0;
		let users: UserProfile[] = [];
		await new Promise((resolve: Function) => {
			if (querySnapshot.size == 0) resolve();

			querySnapshot.forEach(async (doc) => {
				//we must convert data form unix like to js date object
				const documentData = doc.data();

				users.push({
					UID: documentData.UID as string,
					LastName: documentData.LastName as string,
					FirstName: documentData.FirstName as string,
					Email: documentData.Email,
					PhoneNumber: documentData.PhoneNumber as string,
					Attribute: documentData.Attribute as AttributeEnum
				} as UserProfile);

				count += 1;

				if (count == querySnapshot.size) {
					allUsers = users;
					resolve();
				}
			});
		});
	}
</script>

<div class="overflow-x-auto mt-[10%] mx-[2%]">
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
