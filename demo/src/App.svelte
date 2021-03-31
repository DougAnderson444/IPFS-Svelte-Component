<script>
	import IPFSComp from "ipfs-svelte-component";
	let ipfsNode;
</script>

<main>
	<h1>Hello {ipfsNode ? true : false}!</h1>
	{#if ipfsNode}
		<div>
			{#await ipfsNode.id()}
				Awaiting ipfsNode
			{:then identity}
				<p>
					Success! <br />

					<b>IPFS loaded</b>
					<br />NodeId:

					{#if identity && identity.id}
						{identity.id}
					{/if}
				</p>
			{:catch ipfsNode}Something went wrong with {ipfsNode}{/await}
		</div>
	{/if}
</main>
<IPFSComp bind:ipfsNode />

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
