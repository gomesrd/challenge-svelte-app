import { writable } from 'svelte/store';

export const formData = writable({
	name: '',
	phone: '',
	email: ''
});
