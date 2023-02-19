import type { User } from 'firebase/auth';
import { writable } from 'svelte/store';

export const modalContent = writable(null);
export const user = writable<User | null>(null);