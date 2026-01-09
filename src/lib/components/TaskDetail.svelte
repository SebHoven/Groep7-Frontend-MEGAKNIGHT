<script lang="ts">
  import { completeTask, toggleTaskStep, updateTask } from '$lib/helpers/taskApi.js';

  interface Props {
    open?: boolean;
    task?: any;
    isTeacher?: boolean;
    onClose?: () => void;
  }

  let { open = $bindable(false), task = $bindable(null), isTeacher = false, onClose = () => {} }: Props = $props();

  async function completeCurrentTask() {
    if (!task) return;
    try {
      await completeTask(task.id);
      onClose();
    } catch (err) {
      console.error('Error completing task:', err);
    }
  }

  let isDisabled = !isTeacher || (task?.tasksteps && task.tasksteps.length > 0 && !task.tasksteps.every(taskstep => taskstep.completed)) || task?.completed;
</script>

{#if open}
  <aside class="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 overflow-auto p-6 rounded-l-2xl">
      <div class="flex items-start justify-between mb-4">
        <button onclick={onClose} class="text-emerald-700 font-semibold">← Terug</button>
        {#if isTeacher}
          <div class="flex items-center gap-2">
            <button class="px-3 py-1 border rounded text-emerald-700">Bewerken</button>
            <button class="px-3 py-1 bg-red-600 text-white rounded">Verwijderen</button>
          </div>
        {/if}
      </div>

    <!-- Taak details -->
    {#if task}
      <div class="flex items-center gap-4 mb-4">
        <div class="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-2xl">{task.icon || '📌'}</div>
        <div>
          <h3 class="text-2xl font-bold text-emerald-900">{task.name}</h3>
          <div class="text-sm text-gray-600">{task.description}</div>
        </div>
        <div class="ml-auto text-sm text-amber-700 font-semibold">+{task.xp || 0} ⭐</div>
      </div>

      <div class="text-sm text-gray-700 mb-4">
        <div class="flex items-center gap-2 mb-2"><span class="text-gray-500">📅</span> Datum: <span class="ml-1 font-medium">{task.date ? new Date(task.date).toLocaleDateString('nl-NL') : 'Geen datum'}</span></div>
        <div class="flex items-center gap-2"><span class="text-gray-500">👤</span> Toegewezen aan: 
          {#if task.taskstudent && task.taskstudent.length}
            <span class="ml-1 font-medium">{task.taskstudent.map((ts: any) => ts.student.name).join(', ')}</span>
          {:else}
            <span class="ml-1 font-medium">Niet toegewezen</span>
          {/if}
        </div>
      </div>

      <h4 class="text-lg font-semibold mb-2">Stappen:</h4>
      <div class="space-y-3 mb-6">
        {#if task.tasksteps && task.tasksteps.length}
          {#each task.tasksteps as taskstep}
            <label class="flex items-center gap-3 bg-emerald-50 p-3 rounded-lg">
              <input type="checkbox" checked={taskstep.completed} onchange={async () => { taskstep.completed = !taskstep.completed; await toggleTaskStep(taskstep.id); }} />
              <span class="text-sm">{taskstep.text}</span>
            </label>
          {/each}
        {:else}
          <div class="text-sm text-gray-500">Geen stappen opgegeven.</div>
        {/if}
      </div>

      <button 
        class="w-full py-3 rounded-lg text-white {isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600'}"
        disabled={isDisabled}
        onclick={completeCurrentTask}
      >
        {#if !task.completed}{#if isTeacher}Voltooi taak{/if}{#if !isTeacher}Alleen leraar kan voltooien{/if}{/if}{#if task.completed}Taak is voltooid!{/if}
      </button>
    {/if}
  </aside>
{/if}