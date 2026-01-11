<script>
  // @ts-nocheck
  import { goto } from '$app/navigation';
  import TaskModal from '$lib/components/AddTask.svelte';
  import { onMount, createEventDispatcher } from 'svelte';

  export let API;
  export let tasksy = [];
  export let showForm = false;
  export let prefillDate = '';

  const dispatch = createEventDispatcher();
  let statusMessage = '';
  let currentDate = new Date();
  let monthGrid = [];
  let monthLabel = '';

  // Note: tasks are provided by the parent via the `tasksy` prop.
  // Normalization helper for various date formats
  function pad(n) {
    return n.toString().padStart(2, '0');
  }

  function normalizeDateString(s) {
    if (!s) return null;
    // already YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    // ISO with time
    if (/^\d{4}-\d{2}-\d{2}T/.test(s)) return s.slice(0, 10);
    const parts = s.split(/[-\/]/);
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        const [y, m, d] = parts; return `${y}-${pad(m)}-${pad(d)}`;
      } else if (parts[2].length === 4) {
        const [d, m, y] = parts; return `${y}-${pad(m)}-${pad(d)}`;
      }
    }
    const dt = new Date(s);
    if (!isNaN(dt)) return `${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}`;
    return null;
  }

  // -------- CALENDAR GRID ----------
  function isoDate(d) {
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  }

  function buildMonthGrid() {
    const grid = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const startDay = firstOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthLast = new Date(year, month, 0).getDate();

    for (let i = 0; i < 42; i++) {
      let cell = { date: '', day: '', inMonth: false, tasks: [] };
      const dayIndex = i - startDay + 1;

      let d;
      if (i < startDay) {
        d = new Date(year, month - 1, prevMonthLast - (startDay - 1 - i));
      } else if (dayIndex <= daysInMonth) {
        d = new Date(year, month, dayIndex);
        cell.inMonth = true;
      } else {
        d = new Date(year, month + 1, dayIndex - daysInMonth);
      }

      cell.date = isoDate(d);
      cell.day = d.getDate();
      grid.push(cell);
    }

    const map = {};
    tasksy.forEach(t => {
      if (!t.date) return;
      const nd = normalizeDateString(t.date);
      if (!nd) return;
      if (!map[nd]) map[nd] = [];
      map[nd].push(t);
    });

    grid.forEach(c => c.tasks = map[c.date] || []);
    monthGrid = grid;
  }

  function prevMonth() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    buildMonthGrid();
  }

  function nextMonth() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    buildMonthGrid();
  }

  function openNewTaskFor(date) {
    prefillDate = date;
    showForm = true;
  }

  $: monthLabel = currentDate.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' });

  // Rebuild the month grid whenever the incoming tasks change
  $: if (tasksy) buildMonthGrid();

  onMount(() => {
    buildMonthGrid();
  });
</script>

<div class="p-6">
  <!-- Calendar header -->
  <div class="flex items-center mb-4">
    <div class="flex items-center gap-3">
      <button class="w-8 h-8 rounded-full border" on:click={prevMonth}>‹</button>
      <div class="font-semibold text-lg">{monthLabel}</div>
      <button class="w-8 h-8 rounded-full border" on:click={nextMonth}>›</button>
    </div>
    <div class="ml-auto">
      <button class="bg-green-600 text-white px-4 py-2 rounded-full" on:click={() => { prefillDate = isoDate(new Date()); showForm = true; }}>+ Nieuwe Taak</button>
    </div>
  </div>

  <!-- Calendar weekdays -->
  <div class="grid grid-cols-7 gap-2 text-sm text-gray-600 mb-1">
    <div class="text-center">Zo</div>
    <div class="text-center">Ma</div>
    <div class="text-center">Di</div>
    <div class="text-center">Wo</div>
    <div class="text-center">Do</div>
    <div class="text-center">Vr</div>
    <div class="text-center">Za</div>
  </div>

  <!-- Calendar grid -->
  <div class="grid grid-cols-7 gap-2">
    {#each monthGrid as cell}
      <div
        class="min-h-[70px] rounded-lg border p-2 bg-white hover:shadow cursor-pointer flex flex-col"
        class:bg-gray-50={!cell.inMonth}
        on:click={() => openNewTaskFor(cell.date)}
      >
        <div class="flex justify-between items-start">
          <div class="text-xs font-medium">{cell.day}</div>
        </div>

        <div class="mt-1 flex-1 space-y-1">
          {#each cell.tasks.slice(0, 2) as t}
            <div class="text-xs bg-green-50 text-green-800 rounded px-2 py-1 flex items-center gap-2 cursor-pointer"
                 on:click|stopPropagation={() => dispatch('openTask', t)}
            >
              <span class="text-lg">{t.icon || '📌'}</span>
              <div class="truncate">{t.name}</div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  {#if statusMessage}
    <p class="mt-3 text-sm">{statusMessage}</p>
  {/if}
  
  <TaskModal
    bind:open={showForm}
    onClose={() => showForm = false}
    onSubmit={(data) => {
      showForm = false;
      goto('/teacher/home', {
        state: {
          task: JSON.stringify(data)
        }
      });
    }}
    {prefillDate}
  />
</div>
