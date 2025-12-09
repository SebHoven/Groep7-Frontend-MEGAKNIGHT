<script lang="ts">
  type Task = { title: string };
  type Day = { date: string; label: string; tasks: Task[] };

  const today = new Date();
  let currentDate: Date = today;
  let week: Day[] = [];
  let selectedDay: string;
  let title = "";

  const updateWeek = (date: Date) => {
    const weekStart = new Date(date);
    const dayOfWeek = weekStart.getDay() || 7;
    weekStart.setDate(weekStart.getDate() - dayOfWeek + 1);

    week = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return {
        date: d.toISOString().slice(0, 10),
        label: d.toLocaleDateString("nl-NL", { weekday: "short", day: "numeric" }),
        tasks: [],
      };
    });

    selectedDay = week[0].date;
  };

  updateWeek(currentDate);

  const monthLabel = () => currentDate.toLocaleDateString("nl-NL", { month: "long", year: "numeric" });

  const addTask = () => {
    if (!title) return;
    week = week.map((d) =>
      d.date === selectedDay ? { ...d, tasks: [...d.tasks, { title }] } : d
    );
    title = "";
  };

  const prevWeek = () => {
    currentDate.setDate(currentDate.getDate() - 7);
    updateWeek(currentDate);
  };
  const nextWeek = () => {
    currentDate.setDate(currentDate.getDate() + 7);
    updateWeek(currentDate);
  };
  const jumpToDate = (v: string) => {
    const d = new Date(v);
    if (!isNaN(d.getTime())) {
      currentDate = d;
      updateWeek(d);
    }
  };
  const selectDay = (date: string) => (selectedDay = date);
</script>

<div class="p-4 font-sans text-slate-900">
  <h1 class="text-xl font-semibold mb-4">Selecteer week</h1>

  <div class="flex items-center gap-3 mt-2">
    <div class="flex items-center gap-2">
      <button class="bg-blue-600 text-white px-3 py-1 rounded font-semibold active:translate-y-[1px]" on:click={prevWeek}>‹ Vorige</button>
      <button class="bg-blue-600 text-white px-3 py-1 rounded font-semibold active:translate-y-[1px]" on:click={nextWeek}>Volgende ›</button>
      <input type="date" class="px-2 py-1 border rounded" on:change={e => jumpToDate((e.target as HTMLInputElement).value)} />
    </div>
    <div class="text-lg font-semibold ml-1">{monthLabel()}</div>
    <div class="ml-auto text-right text-sm text-slate-600">
      Week: {week[0].label} — {week[6].label}
    </div>
  </div>
<h2 class="mt-4 font-semibold">Taak toevoegen</h2>
  <form class="flex gap-2 flex-wrap mt-3" on:submit|preventDefault={addTask}>
  <input 
    type="text" 
    placeholder="Taak" 
    bind:value={title} 
    class="px-2 py-1 border rounded min-w-[120px] max-w-[200px]"
  />
  <select bind:value={selectedDay} class="px-2 py-1 border rounded">
    {#each week as day}
      <option value={day.date}>{day.label}</option>
    {/each}
  </select>
  <button type="submit" class="bg-blue-600 text-white px-3 py-1 rounded font-semibold">+</button>
</form>

<div class="grid grid-cols-7 gap-2 mt-3">
  {#each week as day}
    <button
      type="button"
      class="flex flex-col items-start border rounded-lg p-2 min-h-[120px] bg-white shadow-sm hover:shadow-md transition transform cursor-pointer text-left"
      class:selected={day.date === selectedDay}
      on:click={() => selectDay(day.date)}
    >
      <strong class="text-sm text-slate-900">{day.label}</strong>
      {#each day.tasks as t}
        <div class="bg-blue-100 text-slate-900 text-sm px-2 py-1 rounded mb-1">{t.title}</div>
      {/each}
    </button>
  {/each}
</div>

</div>
