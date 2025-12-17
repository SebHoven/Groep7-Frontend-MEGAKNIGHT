<script>
  import Calendar from '$lib/components/Agenda.svelte';
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
        steps: stepsArray.map((stepDescription) => ({ description: stepDescription }))
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
{#if showDetail}
  <aside class="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 overflow-auto p-6 rounded-l-2xl">
    <div class="flex items-start justify-between mb-4">
      <button on:click={closeDetail} class="text-emerald-700 font-semibold">← Terug</button>
      <div class="flex items-center gap-2">
        <button class="px-3 py-1 border rounded text-emerald-700">Bewerken</button>
        <button class="px-3 py-1 bg-red-600 text-white rounded">Verwijderen</button>
      </div>
    </div>

    <!-- Taak details -->
    {#if selectedTask}
      <div class="flex items-center gap-4 mb-4">
        <div class="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-2xl">{selectedTask.icon || '📌'}</div>
        <div>
          <h3 class="text-2xl font-bold text-emerald-900">{selectedTask.name}</h3>
          <div class="text-sm text-gray-600">{selectedTask.description}</div>
        </div>
        <div class="ml-auto text-sm text-amber-700 font-semibold">+{selectedTask.xp || 0} ⭐</div>
      </div>

      <div class="text-sm text-gray-700 mb-4">
        <div class="flex items-center gap-2 mb-2"><span class="text-gray-500">📅</span> Datum: <span class="ml-1 font-medium">{selectedTask.date ? new Date(selectedTask.date).toLocaleDateString('nl-NL') : 'Geen datum'}</span></div>
        <div class="flex items-center gap-2"><span class="text-gray-500">👤</span> Toegewezen aan: 
          {#if selectedTask.taskstudent && selectedTask.taskstudent.length}
            <span class="ml-1 font-medium">{selectedTask.taskstudent.map(ts => ts.student.name).join(', ')}</span>
          {:else}
            <span class="ml-1 font-medium">Niet toegewezen</span>
          {/if}
        </div>
      </div>

      <h4 class="text-lg font-semibold mb-2">Stappen:</h4>
      <div class="space-y-3 mb-6">
        {#if selectedTask.tasksteps && selectedTask.tasksteps.length}
          {#each selectedTask.tasksteps as s, idx}
            <label class="flex items-center gap-3 bg-emerald-50 p-3 rounded-lg">
              <input type="checkbox" bind:checked={s.done} />
              <span class="text-sm">{s.text}</span>
            </label>
          {/each}
        {:else}
          <div class="text-sm text-gray-500">Geen stappen opgegeven.</div>
        {/if}
      </div>

      <button class="w-full bg-emerald-600 text-white py-3 rounded-lg">Voltooi alle stappen eerst</button>
    {/if}
  </aside>
{/if}
