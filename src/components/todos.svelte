<script lang="ts">
	import { db } from '$lib/database';

	const { deleteTodo, updateTodo, addTodo, getTodos } = db;
	const todos = getTodos();

	const add = async (e: Event) => {
		const t = e.target as HTMLFormElement;
		const v = t.text.value;
		t.reset();
		addTodo(v);
	};
</script>

{#if $todos}
	<ol>
		{#each $todos as todo}
			<li>
				<span class={todo.completed ? 'complete' : ''}>{todo.title}</span>
				<button on:click={() => updateTodo(todo.id, !todo.completed)}>
					{todo.completed ? '✔️' : '❌'}
				</button>
				<button on:click={() => deleteTodo(todo.id)}> 🗑 </button>
			</li>
		{/each}
	</ol>
{/if}

<form on:submit|preventDefault={add}>
	<input name="text" />
	<button type="submit">Add Task</button>
</form>

<style>
	.complete {
		text-decoration: line-through;
		color: green;
	}
</style>