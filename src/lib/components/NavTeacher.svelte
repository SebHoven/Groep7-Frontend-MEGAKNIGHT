<script>
    import { resolve } from "$app/paths";

</script>
<nav class="fixed bottom-0 left-0 right-0 bg-white border-t shadow flex justify-around py-2">
  <a href={resolve("/teacher/home")} class="flex flex-col items-center text-sm">
    <span>🏡</span>
    Home
  </a>

  <a href={resolve("/teacher/agenda")} class="flex flex-col items-center text-sm">
    <span>📅</span>
    Agenda
  </a>

  <a href={resolve("/teacher/settings")} class="flex flex-col items-center text-sm">
    <span>⚙️</span>
    Settings
  </a>
</nav>
