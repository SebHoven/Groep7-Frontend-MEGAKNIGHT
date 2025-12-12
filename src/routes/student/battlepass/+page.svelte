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

	// sample rewards list (replace with real data)
	const rewards = [
		{ title: 'Rode Hoed', desc: 'Rode Hoed voor je karakter', xp: 50, level: 1, icon: '🎩' },
		{ title: 'Bloem Hoed', desc: 'Bloem Hoed voor je karakter', xp: 100, level: 2, icon: '🌸' },
		{ title: 'Blauw Shirt', desc: 'Blauw Shirt voor je karakter', xp: 100, level: 2, icon: '👕' },
		{ title: 'Strik', desc: 'Strik voor je karakter', xp: 150, level: 3, icon: '🎀' },
		{ title: 'Roze Shirt', desc: 'Roze Shirt voor je karakter', xp: 150, level: 3, icon: '👚' },
		{ title: 'Paarse Broek', desc: 'Paarse Broek voor je karakter', xp: 150, level: 3, icon: '👖' }
	];
</script>

<div class="max-w-6xl mx-auto px-4 py-8">
	<!-- Battle Pass summary (inserted above leaderboard) -->
	<section class="rounded-2xl border-2 border-emerald-300 bg-gradient-to-b from-emerald-50 to-emerald-100 p-6 shadow-sm mb-6">
		<div class="flex flex-col md:flex-row md:items-start md:gap-6 gap-4">
			<div class="flex-1">
				<div class="flex items-center justify-between">
					<div>
						<div class="flex items-center gap-2">
							<span class="text-amber-700">⭐</span>
							<h3 class="font-semibold text-2xl text-emerald-900">Battle Pass</h3>
						</div>
						<p class="text-sm text-emerald-800/80 mt-1">Verzamel XP en ontgrendel beloningen!</p>
					</div>
					<div class="text-amber-600">
						<!-- small lightning icon to match screenshot -->
						<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="currentColor"/></svg>
					</div>
				</div>

				<!-- Level + progress -->
				<div class="mt-5">
					<div class="flex items-baseline justify-between">
						<div>
							<div class="text-2xl font-bold text-emerald-900">Level 1</div>
							<div class="text-xs text-emerald-600">0 / 100 XP</div>
						</div>
						<div class="text-sm text-amber-700 font-semibold">Op Level 2
							<br />
							<span class="text-xs text-emerald-700 font-normal">100 XP tot slot</span>
						</div>
					</div>

					<div class="mt-3 h-3 bg-emerald-50 rounded-full border border-emerald-100 overflow-hidden">
						<div class="h-3 bg-emerald-300 rounded-full" style="width: 20%"></div>
					</div>

					<!-- Current reward shown under the progress bar -->
					<div class="mt-4">
						<div class="rounded-lg bg-white border-2 border-amber-200 p-4">
							<div class="flex items-center gap-3">
								<div class="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center border border-pink-100">🌸</div>
								<div class="flex-1">
									<div class="font-semibold text-emerald-900">Bloem Hoed</div>
									<div class="text-xs text-emerald-600">Bloem Hoed voor je karakter</div>
								</div>
								<div class="text-right text-xs text-amber-700">100 XP</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- Secondary header for the leaderboard/tiles -->
	<div class="mb-4">
		<h4 class="text-lg font-semibold text-emerald-900">Alle Beloningen</h4>
	</div>

	<!-- Rewards grid (under 'Alle Beloningen') -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
		{#each rewards as r}
			<div class="rounded-xl bg-white border border-emerald-100 shadow-sm p-5 flex items-start gap-4">
				<div class="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 text-lg">{r.icon}</div>
				<div class="flex-1">
					<div class="flex items-start justify-between">
						<div>
							<div class="font-semibold text-emerald-900">{r.title}</div>
							<div class="text-xs text-emerald-600">{r.desc}</div>
						</div>
						<div class="text-xs text-emerald-700">Level {r.level}</div>
					</div>
					<div class="mt-4 text-sm text-amber-700">XP nodig: <span class="font-semibold text-emerald-900">{r.xp}</span></div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Battle Pass Ranglijst callout (above leaderboard) -->
	<section class="rounded-xl border-2 border-amber-300 bg-gradient-to-r from-amber-100 to-emerald-50 p-4 shadow-sm mb-6">
		<div class="flex items-center gap-3">
			<span class="text-amber-700">🏆</span>
			<div>
				<div class="font-semibold text-emerald-900">Battle Pass Ranglijst</div>
				<div class="text-sm text-amber-800/80">Wie is het verst met de battle pass?</div>
			</div>
		</div>
	</section>

	<!-- Leaderboard (after rewards) -->
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
