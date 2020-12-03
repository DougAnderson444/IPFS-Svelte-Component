<script>
	import { onMount } from "svelte";
	import * as IPFS from "ipfs-core";

	export let ipfsNode
	export let nodeId

	onMount(async () => {
		const ipfsNode = await IPFS.create();
		const identity = await ipfsNode.id();
		nodeId = identity.id
		console.info('nodeId', nodeId);
	});
</script>

<style>
	h3 {
		color: purple;
	}
</style>

<h3>Hello {nodeId}!</h3>
