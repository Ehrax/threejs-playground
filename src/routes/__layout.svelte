<script lang="ts">
	import '../app.css';
	import Icon from '@iconify/svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { modal } from '../stores/info-modal-store.js';
	import { routes } from '../utils/routes.js';

	let menuCheckbox: HTMLInputElement;

	function toggleMenuDrawer() {
		menuCheckbox.checked = !menuCheckbox.checked;
	}
</script>

<input type="checkbox" class="modal-toggle" checked={!!$modal} />
<div class="modal">
	<div class="modal-box max-w-3xl w-full h-full">
		<div class="btn btn-sm btn-circle absolute right-2 top-2" on:click={() => modal.closeModal()}>
			✕
		</div>
		{#if $modal}
			<article class="prose">
				<SvelteMarkdown source={$modal} />
			</article>
		{/if}
	</div>
</div>

<div class="drawer">
	<input bind:this={menuCheckbox} type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<div class="menu-button" on:click={() => toggleMenuDrawer()}>
			<Icon icon="ant-design:menu-outlined" />
		</div>

		<!-- Page content here -->
		<slot />
	</div>
	<div class="drawer-side">
		<div class="drawer-overlay" on:click={() => toggleMenuDrawer()} />
		<ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
			<!-- Sidebar content here -->
			{#each routes as item}
				<li class="mb-4">
					<a href={item.link} class="text-base-content" on:click={() => toggleMenuDrawer()}>
						{item.title}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.menu-button {
		@apply btn btn-circle btn-outline;
		@apply absolute;
		@apply top-4 left-4;
	}

	.modal-box {
		max-height: calc(100% - 5rem);
		@apply max-w-prose;
	}
</style>
