<script>
  export let user = { username: "test", role: "Leerling", xp: 0 };
</script>

<header class="w-full bg-green-700 text-white px-4 py-2 flex items-center justify-between">
  <!-- LEFT: LOGO + TITLE -->
  <div class="flex items-center gap-3">
    <img src="/plant-icon.png" alt="logo" class="w-8 h-8">
    <h1 class="font-semibold text-lg">Groen Schoolplein</h1>
  </div>

  <!-- RIGHT: USER INFO -->
  <div class="flex items-center gap-3">
    <div class="flex flex-col text-right leading-tight">
      <span class="font-semibold">{user.username}</span>
      <span class="text-xs opacity-90">{user.role}</span>
    </div>

    <!-- XP BADGE -->
    <div class="bg-orange-500 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
      <span>⭐</span>
      <span>{user.xp} XP</span>
    </div>

    <!-- LOGOUT ICON -->
    <button class="text-xl opacity-90 hover:opacity-100">
      ⏏
    </button>
  </div>
</header>
