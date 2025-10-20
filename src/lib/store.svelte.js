export const serverAddress = '10.20.227.50';

// export {serverAddress}; -> alternative Schreibweise, wenn kein export direkt bei der Variable!

export let store = $state({
	rabbits: [],
	listRabbits: async () => {
		const response = await fetch(`http://${serverAddress}:7070/rabbits`);
		console.log('response: ', response);
		store.rabbits = await response.json();
	},
	editRabbit: async (id) => {
		let newName = prompt('New Rabbit Name:', 'neuer Name');
		let editedRabbit = {
			name: newName
		};
		try {
			const response = await fetch(`http://${serverAddress}:7070/rabbits/` + id, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(editedRabbit)
			});
		} catch (error) {
			console.log(error);
		}
		store.listRabbits();
	},
	deleteRabbit: async function (id) {
		const response = await fetch('http://' + serverAddress + ':7070/rabbits/' + id, {
			method: 'DELETE'
		});
		store.listRabbits();
	},
	addRabbit: async (name) => {
		const response = await fetch(`http://${serverAddress}:7070/rabbits`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name
			})
		});
	}
});
