<script>
  import Header from "$lib/components/Header.svelte";
  import NavTeacher from "$lib/components/NavTeacher.svelte";
</script>

<div class="min-h-screen bg-green-50 pb-16">
  <Header username="teacher" role="teacher" />

  <main class="p-4">
    <slot />
  </main>

  <NavTeacher />
</div>
