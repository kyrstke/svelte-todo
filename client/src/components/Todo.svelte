<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let _id: string;
	export let text: string;
	export let done: boolean;

	const dispatch = createEventDispatcher();

	function handleCheckboxChange() {
		dispatch('checkboxChange', { _id, text, done });
	}

	function handleDelete() {
		dispatch('delete', { _id });
	}

</script>

<div class="flex justify-between items-center">
	<p class="ml-2 text-lg font-medium" class:done>{text}</p>
    <div class="flex items-center gap-2">
        <input type="checkbox" bind:checked={done} on:change={handleCheckboxChange} />
	    <button class="ml-auto material-symbols-outlined" on:click={handleDelete}>delete</button>
    </div>
</div>

<style>
    .done {
        text-decoration: line-through;
    }
</style>