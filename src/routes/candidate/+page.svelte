<script lang="ts">
	import { goto } from '$app/navigation';
	import Modal from '$lib/components/Modal.svelte';
	import {
		challengeFinished, challengeStarted, countdown,
		resetCountDown
	} from '../../domain/stores/challengeTimer';
	import { RoutesEnums } from '../../domain/helpers/enums/RoutesEnums';
	import { formData } from '../../domain/stores/formData';
	import { onMount } from 'svelte';
	import { LabelsEnums } from '../../domain/helpers/enums/LabelsEnums';

	let messageChallengeFail = 'Desafio finalizado com falha!';
	let messageChallengeSuccess = 'Desafio finalizado com sucesso!';
	let timeLeft = 'Tempo Restante';
	let seconds = 'segundos';

	onMount(() => {
		if (!$challengeStarted) {
			goto(RoutesEnums.HOME);
		}
	});

	function handleSendChallenge() {
		challengeFinished.set(true);
		countdown.set(0);
	}

	const goBackPage = () => {
		goto(RoutesEnums.HOME);
	};

	const resetChallenge = () => {
		resetCountDown();
		goBackPage();
	};


</script>

<h1>{LabelsEnums.CANDIDATE}</h1>

<div>
	<h2>{LabelsEnums.NAME}: {$formData.name}</h2>
	<p>{LabelsEnums.PHONE}: {$formData.phone}</p>
	<p>{LabelsEnums.EMAIL}: {$formData.email}</p>
</div>
<div>
	<p>{timeLeft}: {$countdown} {seconds}</p>
</div>

{#if $countdown === 0 && !$challengeFinished}
	<Modal isModalOpen={true} message={messageChallengeFail} onModalClose={resetChallenge} />
{/if}

{#if $challengeFinished}
	<Modal isModalOpen={true} message={messageChallengeSuccess} onModalClose={resetChallenge} />
{/if}


<button class="btn" on:click={handleSendChallenge}>{LabelsEnums.SEND}</button>
