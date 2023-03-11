<script lang="ts">
	import Users from '$lib/components/users.svelte';
    // if ($user) {
	// 		const q = query(
	// 			collection(medicalForumFirebaseFirestore, 'UserProfile'),
	// 			where('UID', '==', $user.uid)
	// 		);
	// 		const querySnapshot = await getDocs(q);
	// 		querySnapshot.forEach(async (doc) => {
	// 			const result = await updateDoc(doc.ref, {
	// 				NotificationToken: token
	// 			});
	// 		});
	// 	}
</script>

<svelte:head>
	<title>Dashboard | Medical Forum</title>
	<meta name="description" content="Medical Forum - Admin dashboard page" />
</svelte:head>

<div class="w-full h-full">
	<Users />
</div>
