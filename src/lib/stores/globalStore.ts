import type { User } from 'firebase/auth';
import type { SvelteComponent } from 'svelte';
import { writable } from 'svelte/store';

export const modalContent = writable<SvelteComponent|null|undefined>(null);
export const user = writable<User | null>(null);