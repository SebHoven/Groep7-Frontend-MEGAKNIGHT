<script>
  import {setContext} from 'svelte';
  import TaskItem from '$lib/components/TaskItem.svelte';
  import { createTask, deleteTask } from '$lib/helpers/taskApi.js';

  let showForm = $state(false);
  let { data } = $props();
  
  let tasksy = $state(data.tasks);

  
  setContext('allTasks', tasksy);
  // Props from load()

  // New task form state

  let newTask = $state({
    name: '',
    description: '',
    xp: 0,
    date: '',
    icon: '',
    teacherId: 1
  });
  let statusMessage = $state('');

  function openForm() {
    showForm = true;
  }

  function closeForm() {
    showForm = false;
  }

  const addTask = async () => {
    statusMessage = 'Submitting...';

    try {
      const res = await createTask(newTask);
      console.log('API response:', res);

      statusMessage = 'Task created! Reloading...';

      // reset form
      newTask = { name: '', description: '', xp: 0, date: '', icon: '', teacherId: 1 };

      closeForm();
      // 💡 Reload the page to fetch latest tasks
      location.reload();      // <<< ✔️ simple solution
    } catch (err) {
      statusMessage = 'Error: ' + err.message;
    }
  };

  // const removeTask = async (id) => {
  const removeTask = async (id) => {
    const res = await deleteTask(id);

    if (res?.success) {
      statusMessage = '🗑️ Task deleted!';
      tasksy = tasksy.filter(t => t.id !== id);
    } else {
      statusMessage = `❌ Error deleting task`;
    }
  };
</script>
<h1>Tasks</h1>

<button
  type="button"
  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  onclick= {openForm}
>
  Add Task
</button>

{#if showForm}
  <!-- Background blur -->
  <div
    class="fixed inset-0 bg-black/50 backdrop-blur-sm"
    onclick= {closeForm}
  ></div>

  <!-- Modal -->
  <div class="fixed inset-0 flex items-center justify-center">
    <form
      onsubmit={e => { e.preventDefault(); addTask(); }}
      class="bg-white p-6 rounded-xl shadow-lg w-96"
    >
      <input
        bind:value={newTask.name}
        placeholder="Task name"
        required
        class="border w-full mb-2 p-2 rounded"
      />

      <input
        bind:value={newTask.description}
        placeholder="Description"
        class="border w-full mb-2 p-2 rounded"
      />

      <input
        bind:value={newTask.xp}
        type="number"
        placeholder="XP"
        class="border w-full mb-4 p-2 rounded"
      />

      <div class="flex justify-end gap-2">
        <button
          onclick={closeForm}
          type="button"
          class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>
    </form>
  </div>
{/if}

{#if statusMessage}
  <p>{statusMessage}</p>
{/if}

<TaskItem allTasks={data.tasks} />

// <!-- Display selected task from context -->
// <!-- {#if selectedTask.task}
//   <div class="mt-4 p-2 border rounded bg-yellow-100">
//     <h2>Selected Task:</h2>
//     <p>Name: {selectedTask.task.name}</p>
//     <p>Description: {selectedTask.task.description}</p>
//     <p>XP: {selectedTask.task.xp}</p>
//   </div>
// {/if} -->
