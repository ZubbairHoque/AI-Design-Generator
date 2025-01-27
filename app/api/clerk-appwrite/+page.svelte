<script>
	import { account } from '$lib/appwrite';
	import { onMount } from 'svelte';

	let user = '';
	let session = '';
	let token = '';

	let state = ['notLoggedIn', 'tokenGenerated', 'loggedIn'];
	let currentState = state[0];

	async function createToken(event) {
		try {
			event.preventDefault();

			let formData = new FormData(event.target);
			const email = formData.get('email');
			const password = formData.get('password');

			let authRequest = await fetch('/auth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			let authRequestBody = await authRequest.json();

			user = authRequestBody.user;
			token = authRequestBody.token;
			currentState = state[1];
		} catch (error) {
			console.error(error);
		}
	}

	async function createSession() {
		session = await account.createSession(user.$id, token.secret);
		currentState = state[2];
	}

	async function logout() {
		token = '';
		session = '';
		currentState = state[0];
		await account.deleteSession('current');
	}

	onMount(async () => {
		await logout();
	});
</script>

<h1>Custom Token Auth Demo</h1>

{#if currentState == state[0]}
	<div>
		<h2>Login</h2>
		<form on:submit={createToken}>
			<div>
				<label for="email">Email</label>
				<input type="email" id="email" name="email" placeholder="Enter any email id" required />
			</div>
			<div>
				<label for="password">Password (Enter code: 123456)</label>
				<input type="text" id="password" name="password" placeholder="123456" required />
			</div>
			<button type="submit">Login</button>
		</form>
	</div>
{:else if currentState == state[1]}
	<div>
		<h2>Token secret: {token.secret}</h2>
		<button on:click={createSession}>Generate session</button>
	</div>
{:else if currentState == state[2]}
	<div>
		<h2>Session details</h2>
		<pre>{JSON.stringify(session, undefined, 4)}</pre>
		<button type="submit" on:click={logout}>Logout</button>
	</div>
{/if}
