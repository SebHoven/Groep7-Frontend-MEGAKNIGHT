<script lang="ts">
	// Vervang met echte data
	const entries = [
		{ name: 'Emma', xp: 100 },
		{ name: 'Liam', xp: 10 },
		{ name: 'Sophie', xp: 50 },
		{ name: 'Lucas', xp: 1000 }
	];

    // Sorteer XP
	$: sortedEntries = [...entries].sort((a, b) => b.xp - a.xp);

	// Medaille per rang
	function medalFor(index: number) {
		if (index === 0) return { text: '🏆', bg: 'bg-amber-50', textClass: 'text-amber-700' };
		if (index === 1) return { text: '🥈', bg: 'bg-gray-100', textClass: 'text-gray-600' };
		if (index === 2) return { text: '🥉', bg: 'bg-orange-50', textClass: 'text-orange-600' };
		return { text: `#${index + 1}`, bg: 'bg-emerald-50', textClass: 'text-emerald-600' };
	}
</script>

<div class="max-w-6xl mx-auto px-4 py-8">
	<section class="rounded-xl border-2 border-amber-300 bg-gradient-to-r from-amber-100 to-emerald-50 p-6 shadow-sm mb-6">
		<div class="flex items-center gap-3">
			<p>🏆</p>
			<div>
				<h2 class="font-semibold text-lg text-amber-900">Battle Pass Ranglijst</h2>
				<p class="text-sm text-amber-800/80">Wie is het verst met de battle pass?</p>
			</div>
		</div>
	</section>

	<div class="space-y-6">
		{#each sortedEntries as entry, i}
			<article class="rounded-xl bg-white border border-emerald-100 shadow-sm p-6">
				<div class="flex items-center justify-between gap-4">
					<div class="flex items-center gap-4">
						<div class="w-12 h-12 rounded-full flex items-center justify-center border border-emerald-100 {medalFor(i).bg}">
							<span class="{medalFor(i).textClass} font-semibold text-sm">{medalFor(i).text}</span>
						</div>
						<div>
							<div class="font-semibold text-emerald-900">{entry.name}</div>
							<div class="text-xs text-emerald-600">{entry.xp} XP</div>
						</div>
					</div>

					<div class="flex items-center gap-3">
						<div class="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">Level 1</div>
					</div>
				</div>

				<div class="mt-4">
					<div class="h-2 bg-emerald-50 rounded-full border border-emerald-100">
						<div class="h-2 bg-emerald-200 rounded-full" style="width: 12%"></div>
					</div>
				</div>
			</article>
		{/each}
	</div>
</div>
