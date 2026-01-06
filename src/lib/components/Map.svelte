<script lang="ts">
  import { onMount } from 'svelte';

  let backgroundImage = '';
  let mapId: number | null = null;

  async function loadMap() {
    const res = await fetch('http://localhost:3012/maps/latest');
    const map = await res.json();

    if (map) {
      mapId = map.id;
      backgroundImage = `url(http://localhost:3012${map.imageUrl})`;
    }
  }

  async function FileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const formData = new FormData();
    formData.append('file', input.files[0]);
    formData.append('name', 'Schoolplein');

    const res = await fetch('http://localhost:3012/maps', {
      method: 'POST',
      body: formData
    });

    const map = await res.json();
    mapId = map.id;
    backgroundImage = `url(http://localhost:3012${map.imageUrl})`;
  }

  onMount(loadMap);
</script>

<!-- File input -->
<input 
  type="file" 
  accept="image/*" 
  on:change={FileUpload} 
  class="mb-4 p-2 w-full"
/>

<!-- Image container -->
<div class="w-full h-[400px] rounded-xl shadow-lg overflow-hidden border border-gray-300 bg-gray-200">
  <div
    class="w-full h-full bg-center bg-contain bg-no-repeat"
    style="background-image: {backgroundImage};"
  ></div>
</div>
