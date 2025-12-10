<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	let theme = $state('halloween');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div data-theme={theme} class=" min-h-screen p-2">
	<nav class="flex justify-between items-center">
		<a href="/" class="text-4xl">🐰</a>
		<select class="select w-[150px]" bind:value={theme}>
		<option disabled selected>Pick a theme</option>
		<option value="light">light</option>
		<option value="dark">dark</option>
		<option value="cyberpunk">cyberpunk</option>
		<option value="valentine">valentine</option>
		<option value="halloween">halloween</option>
	</select>
</nav>
<main class="flex flex-col items-center justify-center">
	{@render children?.()}
</main>
	
</div>
