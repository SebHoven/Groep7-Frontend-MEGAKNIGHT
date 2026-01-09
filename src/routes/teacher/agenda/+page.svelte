<script>
  import Calendar from '$lib/components/Agenda.svelte';
  import TaskDetail from '$lib/components/TaskDetail.svelte';
  import { onMount } from 'svelte';
  import { createTask } from '$lib/helpers/taskApi.js';

  const API = 'http://localhost:3012/tasks';
  let tasksy = [];
  let showForm = false;
  let prefillDate = '';
  let statusMessage = '';
  let selectedTask = null;
  let showDetail = false;

  function openDetail(t) {
    selectedTask = t;
    showDetail = true;
  }

  function closeDetail() {
    showDetail = false;
    selectedTask = null;
  }

  async function fetchTasks() {
    try {
      const res = await fetch(API);
      const json = await res.json();
      tasksy = json.data || [];
      //console.log('Fetched tasks:', tasksy);
    } catch (err) {
      console.error(err);
    }
  }

  const handleTaskSubmit = async (taskDataEvent) => {
    statusMessage = 'Submitting...';

    try {
      const taskData = taskDataEvent && taskDataEvent.detail ? taskDataEvent.detail : taskDataEvent;
      const stepsArray = Array.isArray(taskData.steps) ? taskData.steps : [];

      const newTask = {
        name: taskData.name,
        description: taskData.description,
        xp: taskData.xp,
        date: taskData.date,
        icon: taskData.icon,
        teacherId: 1,
        steps: stepsArray.map((stepDescription) => ({ description: stepDescription })),
        assignees: taskData.assignees
      };

      console.log('newTask being sent:', newTask);
      console.log('newTask.steps:', newTask.steps);
      
      const createdTask = await createTask(newTask);
      console.log('API response:', createdTask);

      statusMessage = 'Task created! Reloading...';
      fetchTasks();
      // location.reload();
    } catch (err) {
      statusMessage = 'Error: ' + err.message;
    }
  };

  onMount(() => fetchTasks());
</script>

<Calendar
  {API}
  bind:showForm
  bind:prefillDate
  {tasksy}
  on:taskSubmit={handleTaskSubmit}
/>

<!-- Huidige taken onder kalender -->
<h2 class="text-lg font-semibold mt-6 mb-2">Huidige Taken</h2>
<div class="space-y-2">
  {#each tasksy as t}
    <div role="button" tabindex="0" on:click={() => openDetail(t)} class="p-3 bg-gray-100 rounded-lg shadow-sm flex items-center gap-2 cursor-pointer hover:bg-gray-200">
      <span class="text-2xl">{t.icon || '📌'}</span>
      <div>
        <div class="font-semibold">{t.name}</div>
        <div class="text-sm text-gray-600">{t.description}</div>
        <div class="text-xs text-gray-500">{t.date ? new Date(t.date).toLocaleDateString('nl-NL') : 'Geen datum'}</div>
      </div>
    </div>
  {/each}

  {#if tasksy.length === 0}
    <div class="text-sm text-gray-500">Geen taken gevonden.</div>
  {/if}
</div>

<!-- Laat taak details zien -->
<TaskDetail bind:open={showDetail} task={selectedTask} onClose={closeDetail} isTeacher={true} />
