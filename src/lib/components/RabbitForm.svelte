<script>
	import { goto } from '$app/navigation';
	import { store, pb } from '$lib/store.svelte.js';
	let rabbit = $state({
		name: 'New Name',
		rabbithole: '',
		birthday: 'YYYY-MM-DD'
	});

	let wrongRabbitName = $derived(rabbit.name.length > 0 && rabbit.name[0] !== 'J');
	let rabbitholes = $state('');
	let { rabbitId } = $props();

	async function addRabbit() {
		await store.addRabbit(rabbit.name, rabbit.rabbithole);
		rabbit.name = '';
		rabbit.rabbithole = '';
		store.listRabbits();
	}
	async function saveChanges() {
		await store.editRabbit(rabbitId, rabbit);
		goto('/');
	}
	async function invalidBrithday() {
		if (!rabbit.birthday || rabbit.birthday === 'YYYY-MM-DD') {
			//ist disabled
			return true;
		}
		const date = new Date(rabbit.birthday);
		return isNaN(date.getTime()); //ist disabled
	}

	$effect(async () => {
		rabbitholes = await pb.collection('rabbitholes').getFullList();
		if (rabbitId) {
			rabbit = Object.assign(
				{},
				store.rabbits.find((rabbit) => rabbitId === rabbit.id)
			);
		}
	});
</script>

<div class="flex flex-col gap-2">
	{#if rabbitId}
		<h1 class="text-lg font-bold">Edit rabbit with ID {rabbitId}</h1>
	{:else}
		<h1 class="text-lg font-bold">Add a rabbit</h1>
	{/if}
	<div>
		<label for="name">Name</label>
		<input id="name" type="text" bind:value={rabbit.name} class="input" />
	</div>
	<div>
		<label for="birthday">Birthday</label>
		<input id="birthday" type="date" bind:value={rabbit.birthday} class="input" />
	</div>
	<div>
		<label for="rabbithole">rabbithole</label>
		<select class="select" bind:value={rabbit.rabbithole}>
			{#each rabbitholes as hole (hole.id)}
				<option value={hole.id}>{hole.name}</option>
			{/each}
		</select>
	</div>
	{#if rabbitId}
		<button
			class="btn btn-primary"
			onclick={saveChanges}
			disabled={wrongRabbitName || rabbit.name.length === 0 || tryBrithday()}>Save Changes!</button
		>
	{:else}
		<button
			class="btn btn-primary"
			onclick={addRabbit}
			disabled={wrongRabbitName || rabbit.name.length === 0 || tryBrithday()}>Add Rabbit!</button
		>
	{/if}
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
	{#if tryBrithday() && rabbit.birthday !== 'YYYY-MM-DD' && rabbit.birthday.length > 0}
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
			<span>Watch out! Enter a valid birth date!</span>
		</div>
	{/if}
</div>
