import { writable } from 'svelte/store';

function createModal() {
	const { subscribe, set, update } = writable();

	return {
		subscribe,
		showModal: (modalData) => update(() => modalData),
		closeModal: () => set(undefined)
	};
}

export const modal = createModal();
