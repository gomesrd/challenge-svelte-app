<script lang="ts">
	import FormComponents from '$lib/components/FormComponents.svelte';
	import { formData } from '../../domain/stores/formData';
	import { goto } from '$app/navigation';
	import { RoutesEnums } from '../../domain/helpers/enums/RoutesEnums';
	import { startChallenge } from '../../domain/stores/challengeTimer';

	let titleChallenge = 'Desafio';
	let descriptionChallenge = 'Insira seus dados para iniciar o desafio:';

	const goToCandidatePage = () => {
		goto(RoutesEnums.CANDIDATE);
	};


	function handleSubmit(event: any) {
		event.preventDefault();

		formData.update(form => ({
			...form,
			name: event.target.name.value,
			phone: event.target.phone.value,
			email: event.target.email.value
		}));
		startChallenge();
		goToCandidatePage();

	}

</script>

<main>
	<h1>{titleChallenge}</h1>
	<p>{descriptionChallenge}</p>
	<FormComponents handleSubmit={handleSubmit} />
</main>
