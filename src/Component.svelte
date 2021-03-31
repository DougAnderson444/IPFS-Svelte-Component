<script>
	import { onMount } from "svelte";
	import * as IPFS from "./IPFS.js";

	export let ipfsNode;
	export let nodeId;

	onMount(async () => {
		ipfsNode = await IPFS.use();
		console.info({ ipfsNode });
		const { cid } = await ipfsNode.add("Hello world");
		console.info("cid", cid);
		const identity = await ipfsNode.id();
		nodeId = identity.id;
		console.info("nodeId", nodeId);
	});
</script>

{#if ipfsNode}
	<div>
		{#await ipfsNode}
			Awaiting ipfsNode
		{:then ipfsNode}
			<p>
				Success! <br />

				<b>IPFS loaded</b>
				<br />NodeId:

				{#if nodeId}
					{nodeId}
				{/if}
			</p>
		{:catch ipfsNode}Something went wrong with {ipfsNode}{/await}
	</div>
{/if}
