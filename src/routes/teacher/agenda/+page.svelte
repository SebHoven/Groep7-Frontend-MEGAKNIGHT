<script>
  import TaskModal from '$lib/components/AddTask.svelte';
  import { createTask } from '$lib/helpers/taskApi.js';

  let { data } = $props();
  let tasksy = $state(data.tasks);
  let showForm = $state(false);
  let statusMessage = $state('');

  function openForm() {
    showForm = true;
  }

  function closeForm() {
    showForm = false;
  }

  const handleTaskSubmit = async (taskData) => {
    statusMessage = 'Submitting...';

    try {
      const newTask = {
        name: taskData.name,
        description: taskData.description,
        xp: taskData.xp,
        date: taskData.date,
        icon: taskData.icon,
        teacherId: 1,
        steps: taskData.steps.map((stepDescription) => ({
          description: stepDescription
        }))
      };

            console.log('newTask being sent:', newTask);
      console.log('newTask.steps:', newTask.steps);
      
      const createdTask = await createTask(newTask);
      console.log('API response:', createdTask);

      statusMessage = 'Task created! Reloading...';
      // location.reload();
    } catch (err) {
      statusMessage = 'Error: ' + err.message;
    }
  };
</script>

<h1>Tasks</h1>

<button
  type="button"
  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  onclick={openForm}
>
  Add Task
</button>

<TaskModal 
  bind:open={showForm}
  onClose={closeForm}
  onSubmit={handleTaskSubmit}
/>

{#if statusMessage}
  <p>{statusMessage}</p>
{/if}