<script>
	import { onMount } from "svelte";
	import * as IPFS from "./IPFS.js";

	export let ipfsNode;
	export let nodeId;

	onMount(async () => {
		await IPFS.use();
		console.info({ ipfs }); // avilable as a global variable
		ipfsNode = ipfs; // bind the prop to the global
		console.info({ ipfsNode });
		const identity = await ipfsNode.id();
		nodeId = identity.id;
		console.info("nodeId", nodeId);
	});
</script>
