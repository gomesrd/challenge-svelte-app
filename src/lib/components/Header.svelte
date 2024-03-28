<script>
	import { goto } from '$app/navigation';
	import { RoutesEnums } from '../../domain/helpers/enums/RoutesEnums';
	import { page } from '$app/stores';
	import { challengeStarted } from '../../domain/stores/challengeTimer';

	const labelHome = 'Desafio';
	const labelCandidate = 'Candidato';

	const goBackPage = () => {
		$page.url.pathname === RoutesEnums.HOME ? goto(RoutesEnums.CANDIDATE) : goto(RoutesEnums.HOME);
	};


</script>

<header class="flex justify-end">
	<button class="btn" disabled={!$challengeStarted}
					on:click={goBackPage}>{$page.url.pathname === RoutesEnums.HOME ? labelCandidate : labelHome}</button>
</header>
