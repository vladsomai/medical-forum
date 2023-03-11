<script lang="ts">
	import { doc, getDoc, getDocs, limit, updateDoc } from 'firebase/firestore';
	import Modal from '$lib/components/modal/modal.svelte';
	import { fade } from 'svelte/transition';
	import Header from '$lib/components/header.svelte';
	import { page } from '$app/stores';
	import '$lib/styles/output.css';
	import Drawer from '$lib/components/drawer.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { getMessaging, getToken, onMessage } from 'firebase/messaging';
	import { user } from '$lib/stores/globalStore';
	import { medicalForumFirebaseApp, medicalForumFirebaseFirestore } from '$lib/../hooks.client';
	import { browser } from '$app/environment';
	import { collection, query, where } from 'firebase/firestore';

	let permissionGranted = false;
	async function registerTokenIfUser(token: string) {
		if ($user) {
			const q = query(
				collection(medicalForumFirebaseFirestore, 'UserProfile'),
				where('UID', '==', $user.uid)
			);
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach(async (doc) => {
				const result = await updateDoc(doc.ref, {
					NotificationToken: token
				});
			});
		}
	}

	async function getMessagingToken() {
		const messaging = getMessaging(medicalForumFirebaseApp);
		const token = await getToken(messaging, {
			vapidKey:
				'BOsatuWkytI_dmyxUZHGEIPYfBNMCr_380rbOW3yHYNlXcKWTLLZKxdRI0X2SULIsRDxBRws-pgl1G2JlawpvXM'
		});
		registerTokenIfUser(token);
		onMessage(messaging, (payload) => {});
	}

	if (browser) {
		Notification.requestPermission().then((permission) => {
			if (permission == 'granted') {
				permissionGranted = true;
			}
		});
	}

	$: {
		if (permissionGranted && $user) {
			getMessagingToken();
		}
	}
</script>

<Drawer>
	<Modal />
	<nav class="sticky z-10 top-0 py-10 w-[99%] bg-base-100 h-[10vh]">
		<Header />
	</nav>

	{#key $page.url}
		<main class="w-full mt-[3vh] mb-[5vh] md:mt-[10vh]" in:fade={{ delay: 250, duration: 500 }}>
			<slot />
		</main>
	{/key}
	<Footer />
</Drawer>
