# Overview

This is an implementation of a todo list web app built using the Svelte framework. It includes functionality to fetch the todo items from an API endpoint, create new todo items, mark todo items as done, and delete todo items. The list of todo items can be filtered based on their done status: all, todo, or done.

The app contains a simple HTML form that allows a user to add a new todo item to a list. It has a text input field and an "Add" button. When the user submits the form (either by clicking the "Add" button or pressing Enter while focused on the text input), a JavaScript handleSubmit function is called.

# Spec

## Dependencies

- The svelte package is required to build and run the code.
- The svelte app uses an API client called client to fetch, create, update and delete todos. This client is implemented outside the scope of this code.

## Variables

- title: The title of the page, which is rendered as an h1 element.
- filter: A string representing the currently selected filter: all, todo, or done.
- todos: An array of todo objects that is updated when todos are fetched or modified.

## Functions

- fetchTodos(): An asynchronous function that fetches all the todos from the API upon component mount. It stores the response data in the todos array.
- handleNewTodo(): An asynchronous function that adds a new todo item to the todos list when a CustomEvent is emitted.
- handleCheckboxChange(): An asynchronous function that updates the done status of a todo item when a CustomEvent is emitted. It then replaces that todo item in the todos array with an updated copy.
- handleDelete(): An asynchronous function that removes a todo item from the todos array when a CustomEvent is emitted.
- handleSubmit(): An asynchronous function that is called when the form to create a new todo item is submitted. It prevents the default form submission behavior, and creates a new todo item with a default done status of false. If the creation is successful, the new todo is added to the todos array.

## Svelte Components

- Todo: A custom Svelte component that represents a single todo item in the list. It has a checkbox input to toggle the done status of the todo item, and a button to delete the todo item.

The HTML form has the following attributes and children:

- on:submit={handleSubmit}: An event listener that calls the handleSubmit function when the form is submitted
- <input>: A text input field where the user can type their new todo item
- type="text": Specifies that this input field should accept text input
- name="text": Associates the input field with the name "text". This is useful when submitting the form to a server, as the server would expect the input field's value to be sent with the name "text".
- placeholder="Add a new todo...": Specifies the text to display inside the input field when it's empty
- class="rounded p-2": Applies two CSS classes to the input field. rounded specifies that the corners of the input field should be rounded, and p-2 adds some padding to the input field's content.
- <button>: A button that, when clicked, submits the form
- type="submit": Specifies that this button should submit the form when clicked
- class="button": Applies a CSS class to the button. This is likely a custom class defined elsewhere in the codebase.

## Suggestions for improvement

- The use of console.log() for debugging purposes should be avoided in production code to prevent exposing sensitive information. Instead, developers should use a dedicated logging system such as console.error() and console.warn().

- Functions are defined asynchronously, consider using Promise.all() so that multiple API fetches can happen in parallel. This can help to improve performance.

- The filtering logic can be refactored to use a computed property which returns a filtered version of the todos array based on the filter value.

- The component can be improved to show the user a loading spinner when the todos are being fetched from the api. This can be done either through the use of svelte built-in directives (e.g. {#await promise}) or by defining an isLoading boolean variable in the component and changing it based on the status of the API request (loading, successful or failed).

- It would be useful to define the handleSubmit function somewhere in the codebase so that the form can actually do something when submitted. Without it, the form will reload the page by default, which will clear any existing todo list items.

- Consider adding some sort of id or class to the form element so that it's easily selectable by other JavaScript code. For example, if you wanted to disable or remove the form later on, having an id or class would make it easier to select and manipulate the form.

- When submitting the form, it might be better to use an HTTP request to add the new todo item to a database or server rather than simply appending it to a list in JavaScript. This would allow multiple users to access the same todo list and ensure that the state of the todo list is persisted across page loads.
