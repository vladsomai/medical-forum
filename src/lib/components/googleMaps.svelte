<script context="module" lang="ts">
	async function loadMap() {
		const { Loader } = await import('@googlemaps/js-api-loader');

		const loader = new Loader({
			apiKey: 'AIzaSyB5mDP4GOnzATO3QU4fl9ca0xG0GKsYE9k',
			version: 'weekly',
			libraries: ['places']
		});
		const uluru = { lat: 47.0530445165218, lng: 21.9398204429961 };
		const google = await loader.load();
		const map = new google.maps.Map(document.getElementById('google-maps') as HTMLElement, {
			center: uluru,
			zoom: 15
		});

		// The marker, positioned at Uluru
		const marker = new google.maps.Marker({
			position: uluru,
			map: map
		});
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		loadMap();
	});
</script>

<div class="h-[30vh] w-[70vw]" id="google-maps" />
