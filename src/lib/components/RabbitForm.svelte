<script>
	import { serverAddress, store } from '$lib/store.svelte.js';

	let name = $state('');

	async function addRabbit() {
		await store.addRabbit(name);
		name = '';
		store.listRabbits();
	}
</script>

<input type="text" bind:value={name} />
<div>{name}</div>
<button class="cursor-pointer" onclick={addRabbit}>Add Rabbit!</button>
