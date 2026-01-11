<script lang="ts">
  import { getGroupsByTeacher, getGroupStudents } from '$lib/helpers/groupApi.js'; // Adjust path as needed

  interface Props {
    open?: boolean;
    onClose?: () => void;
    onSubmit?: (task: any) => void;
    prefillDate?: string;
    teacherId: number; // Add teacherId prop
  }

  let { 
    open = $bindable(false), 
    onClose = () => {}, 
    onSubmit = () => {}, 
    prefillDate = "",
    teacherId 
  }: Props = $props();

  $effect(() => {
    if (prefillDate) {
      date = prefillDate;
    }
  });

  // Load groups when modal opens
  $effect(() => {
    if (open && teacherId) {
      loadGroups();
    }
  });

  let title = $state("");
  let typeOptions = $state([
    { id: "water", label: "Water geven", icon: "💧" },
    { id: "plants", label: "Planten verzorgen", icon: "🌱" },
    { id: "trash", label: "Afval opruimen", icon: "🗑️" }
  ]);
  let selectedType = $state(typeOptions[0].id);
  let description = $state("");
  let steps = $state<string[]>([""]);
  let date = $state<string>("");
  let xp = $state(10);
  let assignees = $state<Array<{id: number, name: string, groupName: string}>>([]);
  
  // New state for groups and students
  let groups = $state<Array<{id: number, name: string}>>([]);
  let selectedGroupId = $state<number | null>(null);
  let groupStudents = $state<Array<{id: number, name: string}>>([]);
  let showAssigneeModal = $state(false);

  async function loadGroups() {
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
    
    // Check if student is already assigned
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

  function addStep() {
    steps = [...steps, ""];
  }

  function removeStep(index: number) {
    if (steps.length === 1) {
      steps = [""];
      return;
    }
    steps = steps.filter((_, i) => i !== index);
  }

  function updateStep(index: number, value: string) {
    steps[index] = value;
  }

  function cancel() {
    // Reset form
    title = "";
    selectedType = typeOptions[0].id;
    description = "";
    steps = [""];
    date = "";
    xp = 10;
    assignees = [];
    
    open = false;
    onClose();
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    
    const payload = {
      name: title,
      type: selectedType,
      description,
      steps: steps.filter(s => s.trim() !== ""),
      date,
      xp,
      assignees: assignees.map(a => a.id), // Send only student IDs
      icon: typeOptions.find(t => t.id === selectedType)?.icon || ""
    };
    
    onSubmit(payload);
    
    // Reset form
    title = "";
    selectedType = typeOptions[0].id;
    description = "";
    steps = [""];
    date = "";
    xp = 10;
    assignees = [];
    
    open = false;
  }

  function handleBackdropClick() {
    open = false;
    onClose();
  }
</script>

{#if open}
<div
  class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  onclick={handleBackdropClick}
>
  <form
    class="bg-white rounded-xl shadow-xl p-6 max-w-md w-full text-slate-800 overflow-y-auto max-h-[85vh]"
    onclick={(e) => e.stopPropagation()}
    onsubmit={handleSubmit}
  >
    <h2 class="text-lg font-semibold mb-1">Nieuwe Taak Aanmaken</h2>
    <p class="text-sm text-slate-500 mb-6">Maak een nieuwe taak aan voor het schoolplein</p>

    <label for="task-title" class="block text-sm font-medium mb-1">Taak Titel</label>
    <input
      id="task-title"
      bind:value={title}
      placeholder="Bijv. Planten water geven"
      required
      class="w-full rounded-lg border border-emerald-100 bg-emerald-50/30 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-200"
    />

    <label for="task-type" class="block text-sm font-medium mb-1">Type Taak</label>
    <div class="relative mb-4">
      <select
        id="task-type"
        bind:value={selectedType}
        class="w-full appearance-none rounded-lg border border-emerald-100 bg-emerald-50/30 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-200"
      >
        {#each typeOptions as t}
          <option value={t.id}>{t.icon} {t.label}</option>
        {/each}
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <label for="task-description" class="block text-sm font-medium mb-1">Beschrijving</label>
    <textarea
      id="task-description"
      bind:value={description}
      placeholder="Beschrijf wat er gedaan moet worden..."
      rows="4"
      class="w-full rounded-lg border border-emerald-100 bg-emerald-50/30 px-4 py-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-200"
    ></textarea>

    <fieldset class="mb-3">
      <legend class="block text-sm font-medium mb-2">Stappen</legend>
      <div class="space-y-2">
        {#each steps as step, i (i)}
          <div class="flex items-center gap-2">
            <input
              id={"step-" + i}
              bind:value={steps[i]}
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
    </fieldset>

    <button type="button" onclick={addStep} class="w-full flex items-center justify-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50/20 px-4 py-2 text-emerald-700 mb-4 hover:bg-emerald-50">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" /></svg>
      Stap toevoegen
    </button>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label for="task-date" class="block text-sm font-medium mb-1">Datum</label>
        <div class="relative">
          <input
            id="task-date"
            type="date"
            bind:value={date}
            class="w-full rounded-lg border border-emerald-100 bg-emerald-50/30 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
      </div>

      <div>
        <label for="task-xp" class="block text-sm font-medium mb-1">XP voor voltooiing</label>
        <input
          id="task-xp"
          type="number"
          min="0"
          bind:value={xp}
          class="w-full rounded-lg border border-emerald-100 bg-emerald-50/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
      </div>
    </div>

    <div class="block text-sm font-medium mb-2">Toegewezen aan</div>
    <div class="space-y-2 mb-6" role="group" aria-label="Toegewezen aan">
      {#if assignees.length === 0}
        <div class="rounded-lg border border-emerald-100 bg-emerald-50/30 px-4 py-3 text-slate-500">Geen leerlingen geselecteerd</div>
      {/if}

      {#each assignees as a (a.id)}
        <div class="flex items-center justify-between gap-3 rounded-lg border border-emerald-100 bg-emerald-50/20 px-3 py-2">
          <div class="flex-1">
            <div class="text-sm font-medium">{a.name}</div>
            <div class="text-xs text-slate-500">{a.groupName}</div>
          </div>
          <button type="button" class="text-rose-500 hover:underline text-sm" onclick={() => removeAssignee(a.id)}>Verwijder</button>
        </div>
      {/each}

      <button type="button" onclick={openAssigneeModal} class="w-full rounded-lg border border-emerald-100 bg-white px-4 py-2 text-emerald-700 hover:bg-emerald-50">
        + Leerling toevoegen
      </button>
    </div>

    <div class="flex items-center justify-between gap-3">
      <button type="button" onclick={cancel} class="px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700">
        Annuleren
      </button>

      <button type="submit" class="px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700">
        Taak Toevoegen
      </button>
    </div>
  </form>
</div>
{/if}

<!-- Assignee Selection Modal -->
{#if showAssigneeModal}
<div
  class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
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
      {#each groups as group}
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
          {#each groupStudents as student}
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