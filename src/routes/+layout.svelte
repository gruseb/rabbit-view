<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	let theme = $state('cyberpunk');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div data-theme={theme} class=" min-h-screen p-2">
	<select class="select absolute top-2 right-2 w-[150px]" bind:value={theme}>
		<option disabled selected>Pick a theme</option>
		<option value="light">light</option>
		<option value="dark">dark</option>
		<option value="cyberpunk">cyberpunk</option>
		<option value="valentine">valentine</option>
		<option value="halloween">halloween</option>
	</select>
	{@render children?.()}
</div>
