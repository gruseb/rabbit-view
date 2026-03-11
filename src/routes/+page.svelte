<script>
	import RabbitForm from '$lib/components/RabbitForm.svelte';
	import UserAuth from '$lib/components/UserAuth.svelte';
	import { store, pb } from '$lib/store.svelte.js';
	import Icon from '@iconify/svelte';

	let currentRabbitId = $state();
	let newName = $state('');
	let wrongRabbitName = $derived(newName[0] !== 'J' && newName.length > 0);

	//Funktion zum Bearbeiten eines Kaninchens
	// Weil in einer anonymen Funktion kann man nur einen Befehl schreiben, deshalb hier eine benannte Funktion:
	async function editRabbit() {
		if (newName[0] === 'J') {
			await store.editRabbit(currentRabbitId, newName);
			newName = '';
		} else {
		}
	}

	// unser "Konstruktor" (lifecycle hook) - läuft jedesmal, wenn die Seite bzw. die Komponente geladen wird:
	$effect(() => {
		store.listRabbits();
		$inspect('🐰: ', store.rabbits);
	});
</script>


	<!-- unser Template / HTML-Teil der Seite bzw. der Komponente -->
	<h1 class="text-3xl">Our Rabbits</h1>

	<div class="grid w-[250px] grid-cols-[32px_1fr_1fr_1fr_32px_32px] items-end">
		<div>Nr.</div>
		<div>Name</div>
		<div>Hasenbau</div>
		<div>birthday</div>
		<div></div>
		<div></div>

		{#each store.rabbits as rabbit, index (rabbit.id)}
			<div class="pr-3 text-right">{index + 1}</div>
			<div class="pr-3">{rabbit.name}</div>
			{#if rabbit.expand.rabbithole}
				<div>{rabbit.expand.rabbithole.name}</div>
			{:else}
				<div></div>
			{/if}
			{#if rabbit.birthday}
				<div class="pr-3">{rabbit.birthday}</div>
			{:else}
				<div></div>
			{/if}
			<a href={'/' + rabbit.id}>
				<div class="pr-3">
					<button class="cursor-pointer"><Icon icon="carbon:edit" width="16" height="16" /></button>
				</div>
			</a>
			<div>
				<button onclick={() => store.deleteRabbit(rabbit.id)} class="cursor-pointer text-red-500"
					>x</button
				>
			</div>
		{/each}
	</div>

	<button class="btn btn-primary"><a href="/add">New Rabbit</a></button>

