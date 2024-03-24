<script lang="ts">
  import {onDestroy} from 'svelte';
  import {readable, writable} from 'svelte/store';
  import {goto} from '$app/navigation';
  import Countdown from '$lib/components/Timer.svelte';
  import Modal from '$lib/components/Modal.svelte';

  let showCandidatePage = false;
  let showModal = false;
  let countdownRunning = false;
  let countdownTimeout: NodeJS.Timeout;

  const timer = readable(15, (set) => {
    let remaining = 15;
    set(remaining);

    countdownTimeout = setInterval(() => {
      remaining -= 1;
      set(remaining);
      if (remaining <= 0) {
        clearInterval(countdownTimeout);
        showModal = true;
      }
    }, 1000);

    onDestroy(() => {
      clearInterval(countdownTimeout);
    });
  });

  const startChallenge = () => {
    countdownRunning = true;
    showCandidatePage = true;
  };

  const finishChallenge = () => {
    countdownRunning = false;
    clearInterval(countdownTimeout);
    showModal = true;
  };

  const goToCandidatePage = () => {
    goto('/candidate');
  };

  $: if (showModal) {
    clearInterval(countdownTimeout);
  }
</script>

<h1>Desafio</h1>

{#if countdownRunning}
  <Countdown {timer}/>
{/if}

{#if showCandidatePage}
  <button on:click={finishChallenge}>Enviar</button>
{/if}

<button on:click={startChallenge}>Iniciar Desafio</button>
<button on:click={goToCandidatePage}>Candidato</button>

<Modal bind:show={showModal}>
  {#if countdownRunning}
    Desafio finalizado com falha!
  {:else}
    Desafio finalizado com sucesso!
  {/if}
</Modal>
