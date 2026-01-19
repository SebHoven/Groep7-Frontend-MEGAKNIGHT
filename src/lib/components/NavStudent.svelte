<script>
    import { resolve } from "$app/paths";

</script>
<nav class="fixed bottom-0 left-0 right-0 bg-white border-t shadow flex justify-around py-2">
  <a href={resolve("/student/home")} class="flex flex-col items-center text-sm">
    <span>🏡</span>
    Home
  </a>

  <a href={resolve("/student/battlepass")} class="flex flex-col items-center text-sm">
    <span>⚡</span>
    BattlePass
  </a>

  <a href={resolve("/student/avatar")} class="flex flex-col items-center text-sm">
    <span>🧍</span>
    Avatar
  </a>
</nav>
