<script lang="ts">
  import { onMount } from 'svelte';
  import { getGroups, createGroup, deleteGroup, removeStudentFromGroup, addStudentToGroup, getUnassignedStudents } from '$lib/helpers/groupApi.js';
  import { PUBLIC_API_URL } from '$env/static/public';

  // State variables
  let groups: any[] = [];
  let students: any[] = [];
  let newGroupName = '';
  let selectedGroupId: number | null = null;
  let selectedStudentId: number | null = null;
  let teacherId = 1;
  let loading = false;
  let error = '';

  // Load groups and students on mount
  onMount(async () => {
    await fetchGroups();
    await fetchStudents();
  });

  // Fetch all groups
  async function fetchGroups() {
    try {
      loading = true;
      error = '';
      const response = await getGroups();
      groups = response.data || [];
    } catch (err) {
      error = 'Kon groepen niet laden';
      console.error('Error loading groups:', err);
    } finally {
      loading = false;
    }
  }

  // Fetch unassigned students using the getUnassignedStudents helper
  async function fetchStudents() {
    try {
      const response = await getUnassignedStudents();
      students = response.students || []; // Changed from response.data to response.students
    } catch (err) {
      console.error('Error loading students:', err);
    }
  }

  // Create a new group
  async function handleCreateGroup() {
    if (!newGroupName.trim()) {
      error = 'Voer een groepsnaam in';
      return;
    }

    try {
      loading = true;
      error = '';
      await createGroup({
        name: newGroupName,
        teacherId: teacherId
      });
      newGroupName = '';
      await fetchGroups();
    } catch (err) {
      error = 'Kon groep niet aanmaken';
      console.error('Error creating group:', err);
    } finally {
      loading = false;
    }
  }

  // Delete a group
  async function handleDeleteGroup(groupId: number) {
    if (!confirm('Weet je zeker dat je deze groep wilt verwijderen?')) {
      return;
    }

    try {
      loading = true;
      error = '';
      await deleteGroup(groupId);
      await fetchGroups();
      await fetchStudents(); // Refresh unassigned students list
    } catch (err) {
      error = 'Kon groep niet verwijderen';
      console.error('Error deleting group:', err);
    } finally {
      loading = false;
    }
  }

  // Add student to group
async function handleAddStudent() {
    if (!selectedGroupId || !selectedStudentId) {
      error = 'Selecteer een groep en leerling';
      return;
    }

    try {
      loading = true;
      error = '';
      await addStudentToGroup(selectedGroupId, selectedStudentId); // Changed from { studentId: selectedStudentId }
      selectedStudentId = null;
      await fetchGroups();
      await fetchStudents(); // Refresh unassigned students list
    } catch (err) {
      error = 'Kon leerling niet toevoegen aan groep';
      console.error('Error adding student:', err);
    } finally {
      loading = false;
    }
  }

  // Remove student from group
  async function handleRemoveStudent(groupId: number, studentId: number) {
    if (!confirm('Weet je zeker dat je deze leerling wilt verwijderen uit de groep?')) {
      return;
    }

    try {
      loading = true;
      error = '';
      await removeStudentFromGroup(groupId, studentId);
      await fetchGroups();
      await fetchStudents(); // Refresh unassigned students list
    } catch (err) {
      error = 'Kon leerling niet verwijderen uit groep';
      console.error('Error removing student:', err);
    } finally {
      loading = false;
    }
  }

  // Handle Enter key in group name input
  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      handleCreateGroup();
    }
  }
</script>

{#if error}
  <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 max-w-4xl mx-auto">
    {error}
  </div>
{/if}

<div class="bg-white border border-black p-6 rounded-2xl mb-8 max-w-4xl mx-auto">
  <h2 class="text-xl font-semibold text-green-900">Nieuwe Groep Aanmaken</h2>
  <p class="text-green-800 mb-4">Maak een groep aan om leerlingen te organiseren</p>

  <div class="flex gap-3">
    <input
      type="text"
      bind:value={newGroupName}
      on:keypress={handleKeyPress}
      class="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400"
      placeholder="Groepsnaam (bijv. Klas 4A)"
      disabled={loading}
    />

    <button
      on:click={handleCreateGroup}
      disabled={loading || !newGroupName.trim()}
      class="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Bezig...' : 'Aanmaken'}
    </button>
  </div>
</div>

<div class="bg-white border border-black p-6 rounded-2xl mb-8 max-w-4xl mx-auto">
  <h2 class="text-xl font-semibold text-green-900">Leerlingen Toevoegen</h2>
  <p class="text-green-800 mb-4">Voeg niet-toegewezen leerlingen toe aan een groep</p>

  <label class="block font-medium text-green-900 mb-2">Selecteer Groep</label>
  <div class="relative mb-4">
    <select
      bind:value={selectedGroupId}
      class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 appearance-none"
      disabled={loading || groups.length === 0}
    >
      <option value={null}>Kies een groep</option>
      {#each groups as group}
        <option value={group.id}>{group.name}</option>
      {/each}
    </select>
    <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
  </div>

  <label class="block font-medium text-green-900 mb-2">Selecteer Leerling</label>
  <div class="relative mb-4">
    <select
      bind:value={selectedStudentId}
      class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 appearance-none"
      disabled={loading || students.length === 0 || !selectedGroupId}
    >
      <option value={null}>Kies een leerling</option>
      {#each students as student}
        <option value={student.id}>{student.name}</option>
      {/each}
    </select>
    <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
  </div>

  <button
    on:click={handleAddStudent}
    disabled={loading || !selectedGroupId || !selectedStudentId}
    class="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed w-full"
  >
    {loading ? 'Bezig...' : 'Leerling Toevoegen'}
  </button>

  {#if groups.length === 0 && !loading}
    <p class="text-sm text-gray-500 mt-2">Geen groepen beschikbaar. Maak eerst een groep aan.</p>
  {:else if students.length === 0 && !loading}
    <p class="text-sm text-gray-500 mt-2">Alle leerlingen zijn al toegewezen aan een groep.</p>
  {/if}
</div>

{#if loading && groups.length === 0}
  <div class="text-center py-8">
    <p class="text-gray-600">Groepen laden...</p>
  </div>
{:else if groups.length === 0}
  <div class="text-center py-8 max-w-4xl mx-auto">
    <p class="text-gray-600">Nog geen groepen aangemaakt</p>
  </div>
{:else}
  {#each groups as group}
    <section class="max-w-4xl mx-auto rounded-xl border border-black bg-white shadow-sm overflow-hidden mb-4">
      <div class="p-4">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">{group.name}</h2>
            <p class="text-sm text-gray-600 mb-4">
              {group.students?.length || 0} leerling{group.students?.length !== 1 ? 'en' : ''}
            </p>
          </div>
          <button
            on:click={() => handleDeleteGroup(group.id)}
            class="text-red-500 hover:text-red-600 px-3 py-1 rounded hover:bg-red-50 transition"
            disabled={loading}
          >
            Verwijder groep
          </button>
        </div>

        {#if group.students && group.students.length > 0}
          <ul class="space-y-2">
            {#each group.students as student}
              <li class="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 hover:bg-gray-100">
                <span class="text-sm text-gray-800">{student.name}</span>
                <button
                  on:click={() => handleRemoveStudent(group.id, student.id)}
                  class="text-red-500 hover:text-red-600 disabled:opacity-50"
                  disabled={loading}
                  title="Verwijder leerling uit groep"
                >
                  🗑️
                </button>
              </li>
            {/each}
          </ul>
        {:else}
          <p class="text-sm text-gray-500 italic">Geen leerlingen in deze groep</p>
        {/if}
      </div>
    </section>
  {/each}
{/if}