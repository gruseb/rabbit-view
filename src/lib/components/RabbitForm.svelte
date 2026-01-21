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
		const birthdayForDb = convertToDbFormat(rabbit.birthday);
		await store.addRabbit(rabbit.name, rabbit.rabbithole, birthdayForDb);
		rabbit.name = '';
		rabbit.rabbithole = '';
		rabbit.birthday = 'YYYY-MM-DD';
		store.listRabbits();
		goto('/');
	}
	async function saveChanges() {
		const rabbitToSave = {
			...rabbit,
			birthday: convertToDbFormat(rabbit.birthday)
		};
		await store.editRabbit(rabbitId, rabbitToSave);
		goto('/');
	}
	function isValidDate() {
		if (!rabbit.birthday || rabbit.birthday === 'YYYY-MM-DD' || rabbit.birthday.length === 0) {
			// Geburtstag ist falsch
			return false;
		}
		// Check if it's a valid date
		const date = new Date(rabbit.birthday);
		//dopelte Verneinung
		return !isNaN(date.getTime()); // gibt die Millisekunden seit 1.1.1970 zurück, somit ist es ein valides Datum
	}
	function isValidBirthday() {
		if (!isValidDate()) {
			//zuvor überprüfen ob es ein valides Datum ist
			return true; //weil dann die Fehlermeldung für ungültiges Datum angezeigt wird
		}
		// Check if birthday is not in the future
		const birthdayDate = new Date(rabbit.birthday);
		const today = new Date();

		return birthdayDate <= today;
	}

	function convertToDbFormat(dateString) {
		if (!dateString || dateString === 'YYYY-MM-DD') {
			return null;
		}
		return `${dateString} 00:00:00`;
	}
	//damit, beim editing auch das richtige Datum angezeigt
	function convertFromDbFormat(dateString) {
		if (!dateString) {
			return 'YYYY-MM-DD';
		}
		
		if (dateString.includes(' ')) {
			return dateString.split(' ')[0];
		}
		return dateString;
	}
	function howManyAreInRabbithole(rabbitholeId) {
		return store.rabbits.filter((rabbit) => rabbit.rabbithole === rabbitholeId).length;
	}

	$effect(async () => {
		rabbitholes = await pb.collection('rabbitholes').getFullList();
		if (rabbitId) {
			const foundRabbit = store.rabbits.find((rabbit) => rabbitId === rabbit.id);
			//braucht man, weil sonst wird das Datum nicht richtig angezeigt im Editiermodus
			rabbit = Object.assign({}, foundRabbit, {
				birthday: convertFromDbFormat(foundRabbit?.birthday) // das ? braucht man, dass kein Fehler aufkommt, wenn er keinen findet
			});
			//Object.assign funktioniert so: (neues Objekt erstellen, Objekt kopieren, etwas neues ins Objekt hinzufügen)
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
				<option
					disabled={rabbit.rabbithole === hole.id ||
						howManyAreInRabbithole(hole.id) >= hole.capacity}
					value={hole.id}>{hole.name}</option
				>
			{/each}
		</select>
	</div>
	{#if rabbitId}
		<button
			class="btn btn-primary"
			onclick={saveChanges}
			disabled={wrongRabbitName || rabbit.name.length === 0 || !isValidDate() || !isValidBirthday()}
			>Save Changes!</button
		>
	{:else}
		<button
			class="btn btn-primary"
			onclick={addRabbit}
			disabled={wrongRabbitName || rabbit.name.length === 0 || !isValidDate() || !isValidBirthday()}
			>Add Rabbit!</button
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
	{#if !isValidDate() || rabbit.birthday === 'YYYY-MM-DD' || rabbit.birthday.length === 0}
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
	{#if !isValidBirthday()}
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
			<span>Geburtstag kann nicht größer als das heutige Datum sein</span>
		</div>
	{/if}
</div>
