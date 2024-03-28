<script>
	export let isModalOpen = false;
	export let message = '';
	export let onModalClose = () => {
	};

	function closeModal() {
		isModalOpen = false;
		onModalClose();
	}
</script>

{#if isModalOpen}
	<dialog id="dialog_challenge" class="modal" open>
		<div class="modal-box">
			<form method="dialog">
				<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={closeModal}>X
				</button>
			</form>
			<p class="py-4">{message}</p>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button on:click={closeModal}></button>
		</form>
	</dialog>
{/if}


