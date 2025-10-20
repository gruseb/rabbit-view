<script>
	import RabbitForm from '$lib/components/RabbitForm.svelte';
	import { serverAddress, store } from '$lib/store.svelte.js';
	import Icon from '@iconify/svelte';

	// unser "Konstruktor" (lifecycle hook) - läuft jedesmal, wenn die Seite bzw. die Komponente geladen wird:
	$effect(() => {
		store.listRabbits();
		$inspect('🐰: ', store.rabbits);
	});
</script>

<!-- unser Template / HTML-Teil der Seite bzw. der Komponente -->
<h1 class="text-3xl">Our Rabbits</h1>

<a href="/new-rabbit">New Rabbit</a>

<div class="grid w-[200px] grid-cols-[32px_1fr_32px_32px] items-end">
	<div>ID</div>
	<div>Name</div>
	<div></div>
	<div></div>

	{#each store.rabbits as rabbit}
		<div class="pr-3 text-right">{rabbit.id}</div>
		<div class="pr-3">{rabbit.name}</div>
		<div class="pr-3">
			<button onclick={() => store.editRabbit(rabbit.id)} class="cursor-pointer"
				><Icon icon="carbon:edit" width="16" height="16" /></button
			>
		</div>
		<div>
			<button onclick={() => store.deleteRabbit(rabbit.id)} class="cursor-pointer text-red-500"
				>x</button
			>
		</div>
	{/each}
</div>

<RabbitForm></RabbitForm>
