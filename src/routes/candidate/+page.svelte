<script lang="ts">
  import { goto } from '$app/navigation';

  const goBack = () => {
    goto('/');
  };
</script>

<h1>Candidato</h1>

<button on:click={goBack}>Voltar para o desafio</button>
