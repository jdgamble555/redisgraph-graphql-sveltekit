<script lang="ts">
	import Todos from '../components/todos.svelte';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	const user = derived<typeof page, any>(page, (page, set) => set(page.data.session?.user ?? null));
</script>

<h2>SvelteKit + AuthJS + RedisGraph + GraphQL</h2>

<svelte:head>
	<title>SvelteKit + AuthJS + RedisGraph + GraphQL</title>
</svelte:head>

<section>
	{#if $user}
		<h3>Hi {$user.name}!</h3>
		<img src={$user.image} width="100" alt="user avatar" />
		<button on:click={signOut}>Logout</button>
		<hr />
		<h1>Realtime Todos</h1>
		<Todos />
	{:else}
		<button on:click={() => signIn('google')}>Signin with Google</button>
	{/if}
</section>
