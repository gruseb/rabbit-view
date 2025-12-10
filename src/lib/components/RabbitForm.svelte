<script>
	import { store, pb } from '$lib/store.svelte.js';

	let name = $state('');
	let rabbithole = $state('');
	let wrongRabbitName = $derived(name.length > 0 && name[0] !== 'J');
	let rabbitholes = $state('');

	async function addRabbit() {
		await store.addRabbit(name, rabbithole);
		name = '';
		rabbithole = '';
		store.listRabbits();
	}
	$effect(async () => {
		rabbitholes = await pb.collection('rabbitholes').getFullList();
	});
	//35:13
</script>

<div>
	<label for="name">Name</label>
	<input id="name" type="text" bind:value={name} class="input" />
</div>
<div>
	<label for="rabbithole">rabbithole</label>
	<select class="select" bind:value={rabbithole}>
		{#each rabbitholes as hole (hole.id)}
			<option value={hole.id}>{hole.name}</option>
		{/each}
	</select>
</div>
<button class="btn btn-primary" onclick={addRabbit} disabled={wrongRabbitName || name.length === 0}
	>Add Rabbit!</button
>
{#if wrongRabbitName}
	<div role="alert" class="mt-4 alert alert-error">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 shrink-0 stroke-current"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
		<span>Watch out! Rabbit names must start with "J"!</span>
	</div>
{/if}
