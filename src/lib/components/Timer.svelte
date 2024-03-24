<script lang="ts">
  import { tick } from 'svelte';
  import {type Readable, readable} from 'svelte/store';

  export let timer: Readable<number>;
  let minutes: number;
  let seconds: number;

  $: {
    minutes = Math.floor($timer / 60);
    seconds = $timer % 60;
  }
</script>

<div>
  {#if minutes < 10}
    0{minutes}
  {:else}
    {minutes}
  {/if}:
  {#if seconds < 10}
    0{seconds}
  {:else}
    {seconds}
  {/if}
</div>
