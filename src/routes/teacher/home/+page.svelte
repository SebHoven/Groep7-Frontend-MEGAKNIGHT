<script>
  import Map from '$lib/components/Map.svelte';
  import { createTask } from '$lib/helpers/taskApi.js';
</script>

<p class="text-2xl font-bold mb-4">Jouw Schoolplein</p>

<Map title="Plaats hier jouw schoolplein!" {createTask}/>
