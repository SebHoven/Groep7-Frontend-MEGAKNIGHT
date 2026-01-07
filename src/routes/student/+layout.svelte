<script>
  import Header from "$lib/components/Header.svelte";
  import NavStudent from "$lib/components/NavStudent.svelte";
</script>

<div class="min-h-screen bg-green-50 pb-16">
  <Header username="test" xp={0} role="student" />

  <slot />

  <NavStudent />
</div>
