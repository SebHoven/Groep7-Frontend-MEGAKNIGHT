<script>
  import { getContext } from 'svelte';


  // Context to share the selected task (similar to selectedClient in the teacher example)
  let allTasks = getContext('allTasks');

  const selectTask = (task) => {
    allTasks.task = task;
    console.log('Selected task updated:', allTasks);
  };
</script>
<div class="task-list grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {#each allTasks as task}
    <div class="task-card rounded-xl bg-white shadow-md p-4 flex flex-col justify-between">
      <div>
        <h2 class="text-xl font-semibold mb-2">{task.name}</h2>
        <p class="text-gray-600">{task.xp} XP</p>
      </div>
      <button
        class="mt-4 py-1 px-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onclick={() => selectTask(task)}
      >
        Select
      </button>
    </div>
  {/each}
</div>
