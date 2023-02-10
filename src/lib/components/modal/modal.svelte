<script lang="ts">
	import { modalContent } from '$lib/stores/globalStore';
</script>

<input type="checkbox" id="modalElement" class="modal-toggle" />
<!-- <div class="modal">
	<label for="modalElement" class="modal cursor-pointer">
		<label class="modal-box relative" for="modalElement">
			<label for="modalElement" class="btn btn-accent btn-sm btn-circle absolute right-2 top-2"
				>✕</label
			>
		</label>
	</label>
</div> -->

<div class="modal">
	<div class="modal-box relative">
		<label for="modalElement" class="btn btn-accent btn-sm btn-circle absolute right-2 top-2">✕</label>
		<svelte:component this={$modalContent} />
	</div>
</div>
