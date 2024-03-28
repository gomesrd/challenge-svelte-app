<script>
	import 'tailwindcss/tailwind.css';
	import Header from '$lib/components/Header.svelte';

</script>

<div class="container mx-auto m-2 prose">
	<Header />
	<slot />
</div>
