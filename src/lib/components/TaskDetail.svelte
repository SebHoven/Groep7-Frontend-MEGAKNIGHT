<script lang="ts">
  interface Props {
    open?: boolean;
    task?: any;
    onClose?: () => void;
  }

  let { open = $bindable(false), task = null, onClose = () => {} }: Props = $props();
</script>

{#if open}
  <aside class="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 overflow-auto p-6 rounded-l-2xl">
    <div class="flex items-start justify-between mb-4">
      <button on:click={onClose} class="text-emerald-700 font-semibold">← Terug</button>
      <div class="flex items-center gap-2">
        <button class="px-3 py-1 border rounded text-emerald-700">Bewerken</button>
        <button class="px-3 py-1 bg-red-600 text-white rounded">Verwijderen</button>
      </div>
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
          {#each task.tasksteps as s, idx}
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