 <script>
  import { onMount } from 'svelte';
   import Map from '$lib/components/Map.svelte';
   import { createTask } from '$lib/helpers/taskApi.js';
  import { getLoggedInTeacherId } from '$lib/helpers/teacherHelper.js';

  let teacherId = $state(null);
  let loading = $state(true);

  onMount(async () => {
    teacherId = await getLoggedInTeacherId();
    loading = false;

    if (!teacherId) {
      alert('Teacher not found. Please log out and log in again to sync your account.');
    }
  });
 </script>

<p class="text-2xl font-bold mb-4">Jouw Schoolplein</p>

{#if loading}
  <div class="p-4">Loading...</div>
{:else if teacherId}
  <Map title="Plaats hier jouw schoolplein!" {createTask} isTeacher={true} teacherId={teacherId} />
{:else}
  <div class="p-4 text-red-600">Teacher account not synced. Please log out and log in again.</div>
{/if}
