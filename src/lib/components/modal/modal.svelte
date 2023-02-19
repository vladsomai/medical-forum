<script lang="ts">
	import { modalContent } from '$lib/stores/globalStore';
</script>

<input type="checkbox" id="modalElement" class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative">
		<label for="modalElement" class="btn btn-accent btn-sm btn-circle absolute right-2 top-2">✕</label>
		<svelte:component this={$modalContent} />
	</div>
</div>
