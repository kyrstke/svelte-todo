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
