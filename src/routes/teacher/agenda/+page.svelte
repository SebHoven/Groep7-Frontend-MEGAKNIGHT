<script>
  import AddTask from '$lib/components/AddTask.svelte';

  let open = false;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<button on:click={() => open = true}>Nieuwe Taak</button>

<AddTask
  open={open}
  onClose={() => open = false}
  on:next={(e) => console.log(e.detail)}
/>