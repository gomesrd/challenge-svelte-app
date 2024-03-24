<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let show: boolean;
  const dispatch = createEventDispatcher();

  const closeModal = () => {
    dispatch('close');
  };
</script>

{#if show}
  <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="bg-white p-8 rounded shadow-lg">
      <button class="absolute top-0 right-0 m-4 text-gray-600" on:click={closeModal}>&times;</button>
      <slot></slot>
    </div>
  </div>
{/if}
