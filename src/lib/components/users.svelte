<script lang="ts">
	import type { User, UserProfile } from 'firebase/auth';
	import { collection, getDocs } from 'firebase/firestore';
	import { medicalForumFirebaseFirestore } from '$lib/firebase/firebase';
	import { AccountType, AttributeEnum } from '$lib/types';

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
                    Email: '',
					PhoneNumber: documentData.PhoneNumber as string,
					Attribute: documentData.Attribute as AttributeEnum,
					Firstname: documentData.Firstname as string,
					Surname: documentData.Surname as string
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
				<th>Email</th>
				<th>Prenume</th>
				<th>Nume</th>
				<th>Mobil</th>
				<th>Tip cont</th>
			</tr>
		</thead>
		<tbody>
			{#each allUsers as user, index}
				<tr>
					<th>{index + 1}</th>
					<td>{user.Email}</td>
					<td>{user.Firstname}</td>
					<td>{user.Surname}</td>
					<td>{user.PhoneNumber}</td>
					<td>{AccountType.get(Number(user.Attribute))}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
