<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import TaskDetail from './TaskDetail.svelte';

  export let title: string = "Jouw Schoolplein";
  export let createTask: (data: any) => Promise<any>;
  // map image
  let backgroundImage = "";
  let aspect = 1;

  const API = 'http://localhost:3012/tasks';
  let tasks: any[] = [];
  const task = JSON.parse(page.state.task || '{}');

  let placing = !!task.name;
  let pin = null as null | { x: number; y: number };
  let hover = { x: 0, y: 0 };
  let selectedTask = null;
  let showDetail = false;

  function openDetail(t: any) {
    selectedTask = t;
    showDetail = true;
  }

  function closeDetail() {
    showDetail = false;
    selectedTask = null;
  }

  function isDone(t: any) {
    return t.tasksteps && t.tasksteps.every((s: any) => s.done);
  }

  function isLate(t: any) {
    return new Date(t.date) < new Date() && !isDone(t);
  }

  async function fetchTasks() {
    try {
      const res = await fetch(API);
      const json = await res.json();
      tasks = json.data || [];
    } catch (err) {
      console.error(err);
    }
  }

  function FileUpload(event: Event) {
    const input = event.target as HTMLInputElement | null;
    if (!input || !input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = e => {
      const result = e.target?.result;
      if (typeof result !== "string") return;

      backgroundImage = `url('${result}')`;

      // Werkelijke afmetingen uitlezen
      const img = new Image();
      img.onload = () => {
        aspect = img.width / img.height;
      };
      img.src = result;
    };

  reader.readAsDataURL(file);
  }

  function onMove(e: MouseEvent) {
    if (!placing) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    hover = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  function placePin(e: MouseEvent) {
    if (!placing) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    pin = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    placing = false;

    // Save the task with position
    const newTask = {
      name: task.name,
      description: task.description,
      xp: task.xp,
      date: task.date,
      icon: task.icon,
      teacherId: 1,
      steps: task.steps.map((s: string) => ({ description: s })),
      assignees: task.assignees,
      x: pin.x,
      y: pin.y
    };

    createTask(newTask).then(() => {
      console.log('Task placed and saved:', newTask);
      tasks = [...tasks, newTask];
      pin = null;
      placing = false;
    }).catch(err => {
      console.error('Error saving task:', err);
    });
  }

  onMount(() => {
    fetchTasks();
  });
</script>

<div class="bg-white rounded-xl shadow p-4">
  <h1 class="text-xl font-bold mb-4">{title}</h1>

  <!-- File input bovenaan -->
  <input 
    type="file"
    accept="image/*"
    on:change={FileUpload}
    class="mb-4 p-2 block w-full"
  />

  <!-- RESPONSIVE IMAGE CONTAINER -->
  <div
    class="relative border rounded-xl overflow-hidden bg-gray-200 w-full cursor-crosshair"
    style="
      background-image: {backgroundImage};
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      padding-top: {100 / aspect}%;
    "
    on:mousemove={onMove}
    on:click={placePin}
  >
    <!-- PIN PREVIEW -->
    {#if placing}
      <div
        class="absolute pointer-events-none"
        style="
          left: {hover.x}px;
          top: {hover.y}px;
          transform: translate(-50%, -100%);
        "
      >
        📍
      </div>
    {/if}

    {#if pin}
      <div
        class="absolute"
        style="
          left: {pin.x}px;
          top: {pin.y}px;
          transform: translate(-50%, -100%);
        "
      >
        📍
      </div>
    {/if}

    {#each tasks as t}
      {#if t.x !== undefined && t.y !== undefined}
        <div
          class="absolute cursor-pointer"
          style="
            left: {t.x}px;
            top: {t.y}px;
            transform: translate(-50%, -100%);
          "
          on:click={() => openDetail(t)}
        >
          <div class="relative">
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
              class:bg-green-500={isDone(t)}
              class:bg-red-500={isLate(t)}
              class:bg-blue-500={!isDone(t) && !isLate(t)}
            >
              {t.icon || '📌'}
            </div>
            <div class="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {t.xp}
            </div>
          </div>
        </div>
      {/if}
    {/each}
  </div>

</div>

<!-- Laat taak details zien -->
<TaskDetail bind:open={showDetail} task={selectedTask} onClose={closeDetail} />

