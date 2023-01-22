<script lang="ts">
	import type { PageLoad } from './$types';

	export let data: PageLoad;

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{JSON.stringify(data)}
