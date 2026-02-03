<script lang="ts">
  import { completeTask, toggleTaskStep, updateTask, deleteTask } from '$lib/helpers/taskApi.js';
  import { getGroupsByTeacher, getGroupStudents } from '$lib/helpers/groupApi.js';
  import type { Task } from '$lib/types';

  interface Props {
    open: boolean;
    task?: Task | null;
    isTeacher?: boolean;
    onClose?: () => void;
    onUpdate?: () => void;
    teacherId?: number;
  }

    interface EditedTask {
    name: string;
    description: string;
    date: string;
    xp: number;
    icon: string;
  }

  let { open = $bindable(false), task = $bindable(null), isTeacher = false, onClose = () => {}, onUpdate = () => {}, teacherId = 1 }: Props = $props();

  let editMode = $state(false);
  let editedTask = $state<EditedTask>({} as EditedTask);
  let showDeleteConfirm = $state(false);
  let showAssigneeModal = $state(false);
  let editedSteps = $state<string[]>([]);
  
  // Student assignment state
  let groups = $state<Array<{id: number, name: string}>>([]);
  let selectedGroupId = $state<number | null>(null);
  let groupStudents = $state<Array<{id: number, name: string}>>([]);
  let assignees = $state<Array<{id: number, name: string, groupName: string}>>([]);

  async function completeCurrentTask() {
    if (!task) return;
    try {
      await completeTask(task.id);
      onUpdate();
      onClose();
    } catch (err) {
      console.error('Error completing task:', err);
    }
  }

  function enterEditMode() {
    if (!task) return;
    editMode = true;
    editedTask = {
      name: task.name,
      description: task.description,
      date: task.date ? new Date(task.date).toISOString().split('T')[0] : '',
      xp: task.xp || 0,
      icon: task.icon || '📌'
    };
    
    // Map current students to assignees format
    assignees = task.students?.map(s => ({
      id: s.id,
      name: s.name,
      groupName: '' // We don't have group info in task data
    })) || [];
    
    // Initialize steps
    editedSteps = task.tasksteps?.map(ts => ts.text) || [''];
    if (editedSteps.length === 0) {
      editedSteps = [''];
    }
    
    loadGroups();
  }

  function cancelEdit() {
    editMode = false;
    editedTask = {};
    assignees = [];
    editedSteps = [];
    selectedGroupId = null;
    groupStudents = [];
  }

  function addStep() {
    editedSteps = [...editedSteps, ''];
  }

  function removeStep(index: number) {
    if (editedSteps.length === 1) {
      editedSteps = [''];
      return;
    }
    editedSteps = editedSteps.filter((_, i) => i !== index);
  }

  async function saveEdit() {
    if (!task) return;
    try {
      await updateTask(task.id, {
        name: editedTask.name,
        description: editedTask.description,
        date: editedTask.date,
        xp: editedTask.xp,
        icon: editedTask.icon,
        steps: editedSteps.filter(s => s.trim() !== ''),
        assignees: assignees.map(a => a.id)
      });
      
      editMode = false;
      onUpdate();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  }

  async function confirmDelete() {
    if (!task) return;
    try {
      await deleteTask(task.id);
      showDeleteConfirm = false;
      onUpdate();
      onClose();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  }

  async function loadGroups() {
    if (!teacherId) return;
    try {
      const response = await getGroupsByTeacher(teacherId);
      groups = response.groups || [];
    } catch (error) {
      console.error('Error loading groups:', error);
      groups = [];
    }
  }

  async function loadGroupStudents(groupId: number) {
    try {
      const response = await getGroupStudents(groupId);
      groupStudents = response.students || [];
    } catch (error) {
      console.error('Error loading students:', error);
      groupStudents = [];
    }
  }

  async function handleGroupSelect(groupId: number) {
    selectedGroupId = groupId;
    await loadGroupStudents(groupId);
  }

  function addStudent(student: {id: number, name: string}) {
    const groupName = groups.find(g => g.id === selectedGroupId)?.name || '';
    
    if (!assignees.find(a => a.id === student.id)) {
      assignees = [...assignees, {
        id: student.id,
        name: student.name,
        groupName: groupName
      }];
    }
  }

  function addWholeGroup() {
    const groupName = groups.find(g => g.id === selectedGroupId)?.name || '';
    
    groupStudents.forEach(student => {
      if (!assignees.find(a => a.id === student.id)) {
        assignees = [...assignees, {
          id: student.id,
          name: student.name,
          groupName: groupName
        }];
      }
    });
  }

  function removeAssignee(id: number) {
    assignees = assignees.filter(a => a.id !== id);
  }

  function openAssigneeModal() {
    showAssigneeModal = true;
    selectedGroupId = null;
    groupStudents = [];
  }

  function closeAssigneeModal() {
    showAssigneeModal = false;
  }

  let isDisabled = !isTeacher || (task?.tasksteps && task.tasksteps.length > 0 && !task.tasksteps.every(taskstep => taskstep.completed)) || task?.completed;
</script>

{#if open}
  <aside class="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 overflow-auto p-6 rounded-l-2xl">
      <div class="flex items-start justify-between mb-4">
        <button onclick={onClose} class="text-emerald-700 font-semibold">← Terug</button>
        {#if isTeacher && !editMode}
          <div class="flex items-center gap-2">
            <button onclick={enterEditMode} class="px-3 py-1 border border-emerald-700 rounded text-emerald-700 hover:bg-emerald-50">Bewerken</button>
            <button onclick={() => showDeleteConfirm = true} class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Verwijderen</button>
          </div>
        {/if}
      </div>

    <!-- Taak details -->
    {#if task && !editMode}
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
          {#if task.students && task.students.length}
            <span class="ml-1 font-medium">{task.students.map(s => s.name).join(', ')}</span>
          {:else}
            <span class="ml-1 font-medium">Niet toegewezen</span>
          {/if}
        </div>
      </div>

      <h4 class="text-lg font-semibold mb-2">Stappen:</h4>
      <div class="space-y-3 mb-6">
        {#if task.tasksteps && task.tasksteps.length }
          {#each task.tasksteps as taskstep (taskstep.id)}
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

    <!-- Edit Mode -->
    {#if task && editMode}
      <div class="space-y-4">
        <h3 class="text-xl font-bold text-emerald-900 mb-4">Taak Bewerken</h3>

        <div>
          <label for="edit-name" class="block text-sm font-medium mb-1">Taak Naam</label>
          <input
            id="edit-name"
            type="text"
            bind:value={editedTask.name}
            class="w-full rounded-lg border border-emerald-100 bg-emerald-50/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label for="edit-icon" class="block text-sm font-medium mb-1">Icoon</label>
          <input
            id="edit-icon"
            type="text"
            bind:value={editedTask.icon}
            class="w-full rounded-lg border border-emerald-100 bg-emerald-50/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label for="edit-description" class="block text-sm font-medium mb-1">Beschrijving</label>
          <textarea
            id="edit-description"
            bind:value={editedTask.description}
            rows="4"
            class="w-full rounded-lg border border-emerald-100 bg-emerald-50/30 px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-200"
          ></textarea>
        </div>

        <!-- Steps Edit UI -->
        <fieldset class="mb-3">
          <legend class="block text-sm font-medium mb-2">Stappen</legend>
          <div class="space-y-2">  
            <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
            {#each editedSteps as step, i (i)} 
              <div class="flex items-center gap-2">
                <input
                  id={"edit-step-" + i}
                  bind:value={editedSteps[i]}
                  class="flex-1 rounded-lg border border-emerald-100 bg-emerald-50/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder={"Stap " + (i + 1)}
                  aria-label={"Stap " + (i + 1)}
                />
                <button
                  type="button"
                  class="text-slate-500 hover:text-rose-500 p-1 rounded"
                  onclick={() => removeStep(i)}
                  aria-label={"Verwijder stap " + (i + 1)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H3.5a.5.5 0 000 1H4l.5 10A2 2 0 006.5 17h7a2 2 0 001.999-1.999L16 5h.5a.5.5 0 000-1H15V3a1 1 0 00-1-1H6zm2 4a.5.5 0 01.5.5V15a.5.5 0 01-1 0V6.5A.5.5 0 018 6zm4 0a.5.5 0 01.5.5V15a.5.5 0 01-1 0V6.5A.5.5 0 0112 6z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            {/each}
          </div>
          <button type="button" onclick={addStep} class="w-full flex items-center justify-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50/20 px-4 py-2 text-emerald-700 mt-2 hover:bg-emerald-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" /></svg>
            Stap toevoegen
          </button>
        </fieldset>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="edit-date" class="block text-sm font-medium mb-1">Datum</label>
            <input
              id="edit-date"
              type="date"
              bind:value={editedTask.date}
              class="w-full rounded-lg border border-emerald-100 bg-emerald-50/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label for="edit-xp" class="block text-sm font-medium mb-1">XP</label>
            <input
              id="edit-xp"
              type="number"
              bind:value={editedTask.xp}
              class="w-full rounded-lg border border-emerald-100 bg-emerald-50/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Toegewezen aan</label>
          <div class="space-y-2 mb-3">
            {#if assignees.length === 0}
              <div class="rounded-lg border border-emerald-100 bg-emerald-50/30 px-4 py-3 text-slate-500 text-sm">Geen leerlingen geselecteerd</div>
            {/if}

            {#each assignees as a (a.id)}
              <div class="flex items-center justify-between gap-3 rounded-lg border border-emerald-100 bg-emerald-50/20 px-3 py-2">
                <div class="flex-1">
                  <div class="text-sm font-medium">{a.name}</div>
                  {#if a.groupName}
                    <div class="text-xs text-slate-500">{a.groupName}</div>
                  {/if}
                </div>
                <button type="button" class="text-rose-500 hover:underline text-sm" onclick={() => removeAssignee(a.id)}>Verwijder</button>
              </div>
            {/each}

            <button type="button" onclick={openAssigneeModal} class="w-full rounded-lg border border-emerald-100 bg-white px-4 py-2 text-emerald-700 hover:bg-emerald-50 text-sm">
              + Leerling toevoegen
            </button>
          </div>
        </div>

        <div class="flex gap-3 pt-4">
          <button 
            onclick={cancelEdit}
            class="flex-1 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          >
            Annuleren
          </button>
          <button 
            onclick={saveEdit}
            class="flex-1 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Opslaan
          </button>
        </div>
      </div>
    {/if}
  </aside>
{/if}

<!-- Delete Confirmation Modal -->
{#if showDeleteConfirm}
  <div
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
    onclick={() => showDeleteConfirm = false}
  >
    <div
      class="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full"
      onclick={(e) => e.stopPropagation()}
    >
      <h3 class="text-lg font-semibold mb-2 text-slate-900">Taak Verwijderen</h3>
      <p class="text-sm text-slate-600 mb-6">
        Weet je zeker dat je deze taak wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
      </p>
      <div class="flex gap-3">
        <button
          onclick={() => showDeleteConfirm = false}
          class="flex-1 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
        >
          Annuleren
        </button>
        <button
          onclick={confirmDelete}
          class="flex-1 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Verwijderen
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- Assignee Selection Modal -->
{#if showAssigneeModal}
<div
  class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[70] p-4"
  onclick={closeAssigneeModal}
>
  <div
    class="bg-white rounded-xl shadow-xl p-6 max-w-md w-full text-slate-800 max-h-[70vh] overflow-y-auto"
    onclick={(e) => e.stopPropagation()}
  >
    <h3 class="text-lg font-semibold mb-4">Leerlingen Selecteren</h3>

    <label for="group-select" class="block text-sm font-medium mb-1">Selecteer een groep</label>
    <select
      id="group-select"
      class="w-full rounded-lg border border-emerald-100 bg-emerald-50/30 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-200"
      onchange={(e) => handleGroupSelect(Number(e.currentTarget.value))}
    >
      <option value="">-- Kies een groep --</option>
      {#each groups as group (group.id)}
        <option value={group.id}>{group.name}</option>
      {/each}
    </select>

    {#if selectedGroupId && groupStudents.length > 0}
      <div class="mb-4">
        <button
          type="button"
          onclick={addWholeGroup}
          class="w-full rounded-lg border border-emerald-200 bg-emerald-100 px-4 py-2 text-emerald-700 font-medium hover:bg-emerald-200 mb-3"
        >
          Hele groep toevoegen
        </button>

        <div class="text-sm font-medium mb-2">Of selecteer individuele leerlingen:</div>
        <div class="space-y-2">
          {#each groupStudents as student (student.id)}
            <button
              type="button"
              onclick={() => addStudent(student)}
              class="w-full text-left rounded-lg border border-emerald-100 bg-white px-4 py-2 hover:bg-emerald-50 transition-colors"
            >
              {student.name}
            </button>
          {/each}
        </div>
      </div>
    {:else if selectedGroupId}
      <p class="text-sm text-slate-500 mb-4">Geen leerlingen gevonden in deze groep.</p>
    {/if}

    <button
      type="button"
      onclick={closeAssigneeModal}
      class="w-full px-4 py-2 rounded-full bg-slate-600 text-white hover:bg-slate-700"
    >
      Sluiten
    </button>
  </div>
</div>
{/if}