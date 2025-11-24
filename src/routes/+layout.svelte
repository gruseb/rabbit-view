<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	let theme = $state('dark');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<!-- rechts oben das Theme, zum auswählen des Designs -->
<div data-theme={theme} class="min-h-screen p-2">
	<select class="select w-[150px] absolute top-2 right-2">
		<option disabled selected>Pick a theme</option>
		<option value="light" onclick={() => (theme = 'light')}>Light</option>
		<option value="dark" onclick={() => (theme = 'dark')}>dark</option>
		<option value="cyberpunk" onclick={() => (theme = 'cyberpunk')}>cyberpunk</option>
	</select>
	{@render children?.()}
</div>
