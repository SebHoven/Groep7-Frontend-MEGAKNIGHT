<script>
  import Map from '$lib/components/Map.svelte';
  import { createTask } from '$lib/helpers/taskApi.js';
</script>

<Map title="Jouw schoolplein" {createTask}/>
