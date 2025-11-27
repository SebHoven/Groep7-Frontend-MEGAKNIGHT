<script lang="ts">
  export let title: string = "Jouw Schoolplein";

  let backgroundImage = "";
  let aspect = 1; // width / height verhouding van de gekozen afbeelding

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
    class="border rounded-xl overflow-hidden bg-gray-200 w-full"
    style="
      background-image: {backgroundImage};
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      padding-top: {100 / aspect}%;
    "
  ></div>
</div>

