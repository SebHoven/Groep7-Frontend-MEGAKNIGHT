// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface PageState {
			task?: {
				name: string;
				type: string;
				description: string;
				steps: string[];
				date: string;
				xp: number;
				assignees: string[];
				icon: string;
				x: number;
				y: number;
			};
		}
		// interface Error {}
		// interface Locals {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
