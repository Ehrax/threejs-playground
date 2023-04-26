<script lang="ts">
	import Icon from '@iconify/svelte';
	import { modal } from '../stores/info-modal-store.js';

	export let src: string;

	async function handleShowModal() {
		const text = await fetchMarkdown();
		modal.showModal(text);
	}

	async function fetchMarkdown() {
		const mdFile = await fetch(src);
		const mdText = await mdFile.text();

		return mdText;
	}
</script>

<button class="btn btn-circle absolute top-20 left-4" on:click={() => handleShowModal()}>
	<Icon icon="bx:help-circle" style="font-size: 24px;" />
</button>
