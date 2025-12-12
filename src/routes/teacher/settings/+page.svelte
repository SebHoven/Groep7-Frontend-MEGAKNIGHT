<div class="bg-white border border-black p-6 rounded-2xl mb-8 max-w-4xl mx-auto">
  <h2 class="text-xl font-semibold text-green-900">Nieuwe Groep Aanmaken</h2>
  <p class="text-green-800 mb-4">Maak een groep aan om leerlingen te organiseren</p>

  <div class="flex gap-3">
    <input
      type="text"
      class="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-white-400"
      placeholder="Groepsnaam (bijv. Klas 4A)"
    />

    <button
      class="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
    >
      Aanmaken
    </button>
  </div>
</div>

<div class="bg-white border border-black p-6 rounded-2xl max-w-4xl mx-auto">
  <h2 class="text-xl font-semibold text-green-900">Leerlingen Toevoegen</h2>
  <p class="text-green-800 mb-4">Voeg leerlingen toe aan een groep</p>

  <label class="block font-medium text-green-900 mb-2">Selecteer Groep</label>
  <div class="relative">
    <select
      class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 appearance-none"
    >
      <option>Kies een groep</option>
      <option>groep 1</option>
      <option>groep 2</option>
    </select>

    <!-- klein pijltje -->
    <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
      ▼
    </div>
  </div>
</div>
<br>

<section class="max-w-4xl mx-auto rounded-xl border border-black bg-white shadow-sm overflow-hidden">
  <div class="p-4">
    <h2 class="text-lg font-semibold text-gray-900">Groep A</h2>
    <p class="text-sm text-gray-600 mb-4">3 leerlingen</p>

    <ul class="space-y-2">
      <li class="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 hover:bg-gray-100">
        <span class="text-sm text-gray-800">Emma</span>
        <button class="text-red-500 hover:text-red-600">🗑️
</button>
      </li>
      <li class="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 hover:bg-gray-100">
        <span class="text-sm text-gray-800">Liam</span>
        <button class="text-red-500 hover:text-red-600">🗑️
</button>
      </li>
      <li class="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 hover:bg-gray-100">
        <span class="text-sm text-gray-800">Sophie</span>
        <button class="text-red-500 hover:text-red-600">🗑️
</button>
      </li>
    </ul>
  </div>
</section>

<br>

<section class="max-w-4xl mx-auto rounded-xl border border-black bg-white shadow-sm overflow-hidden">
  <div class="p-4">
    <h2 class="text-lg font-semibold text-gray-900">Groep B</h2>
    <p class="text-sm text-gray-600 mb-4">3 leerlingen</p>

    <ul class="space-y-2">
      <li class="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 hover:bg-gray-100">
        <span class="text-sm text-gray-800">Lebron</span>
        <button class="text-red-500 hover:text-red-600">🗑️
</button>
      </li>
      <li class="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 hover:bg-gray-100">
        <span class="text-sm text-gray-800">James</span>
        <button class="text-red-500 hover:text-red-600">🗑️
</button>
      </li>
      <li class="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 hover:bg-gray-100">
        <span class="text-sm text-gray-800">Mia</span>
        <button class="text-red-500 hover:text-red-600">🗑️
</button>
      </li>
    </ul>
  </div>
</section>
