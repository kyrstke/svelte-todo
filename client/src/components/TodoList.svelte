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

    async function handleNewTodo(event: CustomEvent<ResponseAPI>) {
        const newTodo = event.detail;
        todos = [...todos, newTodo];
    }

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

    async function handleSubmit(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const input = form.elements.namedItem('text') as HTMLInputElement;
        const inputValue = input.value.trim();
        if (!inputValue) {
            alert('Please enter a todo item');
            return;
        }
        const newTodo = {
            text: inputValue,
            done: false
        };
        try {
            const response = await client.post('', newTodo);
            todos = [...todos, response.data];
            input.value = '';
        } catch (error) {
            console.error(error);
            alert('Error creating todo');
        }
    }

    onMount(fetchTodos);
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

<form on:submit={handleSubmit}>
	<input type="text" name="text" placeholder="Add a new todo..." class="rounded p-2" />
	<button type="submit" class="button">Add</button>
</form>
