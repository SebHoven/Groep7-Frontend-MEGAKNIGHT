<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let open = false;
  export let onClose = () => {};

  const dispatch = createEventDispatcher();


  let title = "";
  let typeOptions = [
    { id: "water", label: "Water geven", icon: "💧" },
    { id: "plants", label: "Planten verzorgen", icon: "🌱" },
    { id: "trash", label: "Afval opruimen", icon: "🗑️" }
  ];
  let selectedType = typeOptions[0].id;

  let description = "";
  let steps: string[] = [""];
  let date: string | null = null;
  let xp = 10;
  let assignees: string[] = [];

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
    steps = steps.map((s, i) => (i === index ? value : s));
  }

  function addAssignee() {
    const name = `Leerling ${assignees.length + 1}`;
    assignees = [...assignees, name];
  }

  function removeAssignee(index: number) {
    assignees = assignees.filter((_, i) => i !== index);
  }

  function cancel() {
    dispatch("cancel");
    onClose();
  }

  function next() {
    const payload = {
      title,
      type: selectedType,
      description,
      steps,
      date,
      xp,
      assignees
    };
    dispatch("next", payload);
    onClose();
  }
</script>

{#if open}
<div
  class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  on:click={onClose}
>
  <div
    class="bg-white rounded-xl shadow-xl p-6 max-w-md w-full text-slate-800 overflow-y-auto max-h-[85vh]"
    on:click|stopPropagation
  >

    <h2 class="text-lg font-semibold mb-1">Nieuwe Taak Aanmaken</h2>
    <p class="text-sm text-slate-500 mb-6">Maak een nieuwe taak aan voor het schoolplein</p>

    <label for="task-title" class="block text-sm font-medium mb-1">Taak Titel</label>
    <input
      id="task-title"
      bind:value={title}
      placeholder="Bijv. Planten water geven"
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
              class="flex-1 rounded-lg border border-emerald-100 bg-emerald-50/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              bind:value={steps[i]}
              on:input={(e) => updateStep(i, (e.target as HTMLInputElement).value)}
              placeholder={"Stap " + (i + 1)}
              aria-label={"Stap " + (i + 1)}
            />
            <button
              type="button"
              class="text-slate-500 hover:text-rose-500 p-1 rounded"
              on:click={() => removeStep(i)}
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

    <button type="button" on:click={addStep} class="w-full flex items-center justify-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50/20 px-4 py-2 text-emerald-700 mb-4 hover:bg-emerald-50">
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

      {#each assignees as a, i (i)}
        <div class="flex items-center justify-between gap-3 rounded-lg border border-emerald-100 bg-emerald-50/20 px-3 py-2">
          <div class="text-sm">{a}</div>
          <button type="button" class="text-rose-500 hover:underline" on:click={() => removeAssignee(i)}>Verwijder</button>
        </div>
      {/each}

      <button type="button" on:click={addAssignee} class="w-full rounded-lg border border-emerald-100 bg-white px-4 py-2 text-emerald-700 hover:bg-emerald-50">
        + Leerling toevoegen
      </button>
    </div>

    <div class="flex items-center justify-between gap-3">
      <button type="button" on:click={cancel} class="px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700">
        Annuleren
      </button>

      <button type="button" on:click={next} class="px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700">
        Volgende: Plaats op kaart
      </button>
    </div>

  </div>
</div>
{/if}
