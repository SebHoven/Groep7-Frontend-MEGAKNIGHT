<div class="bg-white border border-black p-6 rounded-2xl mb-8 max-w-4xl mx-auto text-center">
  <h2 class="text-4xl font-semibold text-green-600">Maak je avatar aan</h2>
  <br>

    <br>
    <br>
        <div id="avatar" class="mx-auto w-40 flex flex-col items-center">
  <!-- Haar -->
  <div
    id="hair"
    class="w-32 h-12 rounded-t-full {hairColor} relative z-10"
  ></div>

  <!-- Hoofd -->
  <div
    id="head"
    class="w-24 h-24 rounded-full {skinColor} shadow-lg z-20"
  ></div>

  <!-- Nek -->
  <div class="w-8 h-4 {skinColor} rounded-t-full -mt-2"></div>

  <!-- Shirt -->
  <div
    id="shirt"
    class="w-28 h-20 {shirtColor} rounded-t-lg shadow-md -mt-1"
  ></div>

  <!-- Broek -->
  <div
    id="pants"
    class="w-20 h-16 {pantsColor} rounded-t shadow-inner -mt-1"
  ></div>

  <!-- Schoenen -->
  <div
    id="shoes"
    class="w-20 h-6 {shoeColor} rounded-b-full shadow-md -mt-1"
  ></div>
</div>
<br>
<br>
<br>
    <br>
<h2 class="text-1xl font-semibold text-green-600 text-left">Kies je shirt:</h2>

<!-- keuze menu voor shirts -->
     <div class="flex flex-wrap gap-3">
  <button class="px-6 py-2 rounded-full bg-white text-green-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setShirtColor('bg-green-500')}>Groen</button>
  <button class="px-6 py-2 rounded-full bg-white text-green-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setShirtColor('bg-blue-500')}>Blauw</button>
  <button class="px-6 py-2 rounded-full bg-white text-green-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setShirtColor('bg-rose-500')}>Roze</button>
  <button class="px-6 py-2 rounded-full bg-white text-green-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setShirtColor('bg-red-500')}>Rood</button>
  <button class="px-6 py-2 rounded-full bg-white text-green-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setShirtColor('bg-yellow-500')}>Geel</button>
</div>

<br>
<br>
    <br>
<h2 class="text-1xl font-semibold text-green-600 text-left">Kies je broek:</h2>

<!-- keuze menu voor de broek -->
     <div class="flex flex-wrap gap-3">
  <button class="px-6 py-2 rounded-full bg-white text-green-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition"  on:click={() => setPantsColor('bg-green-500')}>Groen</button>
  <button class="px-6 py-2 rounded-full bg-white text-green-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setPantsColor('bg-blue-500')}>Blauw</button>
  <button class="px-6 py-2 rounded-full bg-white text-green-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setPantsColor('bg-rose-500')}>Roze</button>
  <button class="px-6 py-2 rounded-full bg-white text-green-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setPantsColor('bg-red-500')}>Rood</button>
  <button class="px-6 py-2 rounded-full bg-white text-green-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setPantsColor('bg-yellow-500')}>Geel</button>
</div>

<br>
<br>
    <br>
<h2 class="text-1xl font-semibold text-green-600 text-left">Kies je schoenen:</h2>

<!-- keuze menu voor schoenen -->
     <div class="flex flex-wrap gap-3">
  <button class="px-6 py-2 rounded-full bg-white text-green-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setShoeColor('bg-green-500')}>Groen</button>
  <button class="px-6 py-2 rounded-full bg-white text-green-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setShoeColor('bg-blue-500')}>Blauw</button>
  <button class="px-6 py-2 rounded-full bg-white text-green-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setShoeColor('bg-rose-500')}>Roze</button>
  <button class="px-6 py-2 rounded-full bg-white text-green-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setShoeColor('bg-red-500')}>Rood</button>
  <button class="px-6 py-2 rounded-full bg-white text-green-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setShoeColor('bg-yellow-500')}>Geel</button>
  <button class="px-6 py-2 rounded-full bg-white text-green-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setShoeColor('bg-black')}>zwart</button>
</div>

<br>
<br>
<br>
    <br>
<h2 class="text-1xl font-semibold text-green-600 text-left">Kies je haar kleur:</h2>

<!-- keuze menu voor haar kleur -->
     <div class="flex flex-wrap gap-3">
  <button class="bg-yellow-800 px-6 py-2 rounded-full text-white border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setHairColor('bg-yellow-800')}>Bruin</button>
  <button class="bg-yellow-200 px-6 py-2 rounded-full text-white-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setHairColor('bg-yellow-500')}>Geel</button>
  <button class="bg-stone-900 px-6 py-2 rounded-full text-white border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setHairColor('bg-black')}>Zwart</button>
  <button class="bg-orange-600 px-6 py-2 rounded-full text-white-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setHairColor('bg-orange-500')}>Oranje</button>
</div>

<br>
<br>
    <br>
<h2 class="text-1xl font-semibold text-green-600 text-left">Kies je haar huidskleur:</h2>

<!-- keuze menu voor huidskleur -->
     <div class="flex flex-wrap gap-3">
  <button class="bg-blue-200 px-6 py-2 rounded-full text-white-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setSkinColor('bg-blue-200')}>blauw</button>
  <button class="bg-yellow-200 px-6 py-2 rounded-full text-white-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setSkinColor('bg-yellow-500')}>Geel</button>
  <button class="bg-red-600 px-6 py-2 rounded-full text-white border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setSkinColor('bg-red-600')}>Rood</button>
  <button class="bg-orange-600 px-6 py-2 rounded-full text-white-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setSkinColor('bg-orange-500')}>Oranje</button>
  <button class="bg-green-600 px-6 py-2 rounded-full text-white-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setSkinColor('bg-green-600')}>Groen</button>
  <button class="bg-purple-300 px-6 py-2 rounded-full text-white-700 border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition" on:click={() => setSkinColor('bg-purple-300')}>Paars</button>
</div>
</div>

<script lang="ts">

  let hairColor: string = "bg-yellow-800";
  let skinColor: string = "bg-green-200";
  let shirtColor: string = "bg-green-500";
  let pantsColor: string = "bg-blue-500";
  let shoeColor: string = "bg-black";

  function setHairColor(color: string): void {
    hairColor = color;
  }

  function setSkinColor(color: string): void {
    skinColor = color;
  }

  function setShirtColor(color: string): void {
    shirtColor = color;
  }

  function setPantsColor(color: string): void {
    pantsColor = color;
  }

  function setShoeColor(color: string): void {
    shoeColor = color;
  }
</script>


