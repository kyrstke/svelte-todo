<script lang="ts">
	import { onMount } from 'svelte';
	import { client } from '../api/client';
	import Todo from './Todo.svelte';
	import type { ResponseAPI } from '../types/ResponseAPI';

	let title = 'Svelte Todo List';
	let filter = 'all';
	let todos: ResponseAPI[] = [];

	async function fetchTodos() {
		const response = await client.get('');
		console.log(response);
		todos = response.data;
		console.log(todos);
	}

	onMount(fetchTodos);

	async function handleCheckboxChange(event: CustomEvent<ResponseAPI>) {
		const todoToUpdate = event.detail;
        await client.put(`/${todoToUpdate._id}`, { done: todoToUpdate.done });
        const updatedTodos = todos.map((todo) => {
            if (todo._id === todoToUpdate._id) {
                return todoToUpdate;
            }
            return todo;
        });
        todos = updatedTodos;

	}

	async function handleDelete(event: CustomEvent<{ _id: string }>) {
		const todoToDelete = event.detail;
        await client.delete(`/${todoToDelete._id}`);
		const updatedTodos = todos.filter((todo) => todo._id !== todoToDelete._id);
		todos = updatedTodos;
	}
</script>

<h1 class="text-5xl font-bold mb-10">{title}</h1>
<div class="flex justify-center gap-3">
	<button class="button" on:click={() => (filter = 'all')}>All</button>
	<button class="button" on:click={() => (filter = 'todo')}>Todo</button>
	<button class="button" on:click={() => (filter = 'done')}>Done</button>
</div>
<div class="my-8">
	{#each todos as todo (todo._id)}
		{#if filter === 'all' || (filter === 'todo' && !todo.done) || (filter === 'done' && todo.done)}
			<Todo
				_id={todo._id}
				text={todo.text}
				done={todo.done}
				on:checkboxChange={handleCheckboxChange}
				on:delete={handleDelete}
			/>
		{/if}
	{/each}
</div>
