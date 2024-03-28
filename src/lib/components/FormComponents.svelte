<script lang="ts">
	import { formData } from '../../domain/stores/formData';
	import { challengeStarted } from '../../domain/stores/challengeTimer';
	import { LabelsEnums } from '../../domain/helpers/enums/LabelsEnums';
	import type { EventHandler } from 'svelte/elements';

	export let handleSubmit: any;

</script>

<form on:submit={handleSubmit} class="space-y-4">
	<div class="mb-4">
		{LabelsEnums.NAME}:
		<input type="text" name="name" value={$formData.name} required class="w-full px-3 py-2 border rounded-md">
	</div>

	<div class="mb-4">
		{LabelsEnums.PHONE}:
		<input type="tel" name="phone" value={$formData.phone} required
					 class="w-full px-3 py-2 border rounded-md">
	</div>

	<div class="mb-4">
		{LabelsEnums.EMAIL}:
		<input type="email" name="email" value={$formData.email} required
					 class="w-full px-3 py-2 border rounded-md">
	</div>

	<div>
		<button type="submit" class="btn" disabled={$challengeStarted}>{LabelsEnums.START_CHALLENGE}</button>
	</div>
</form>
