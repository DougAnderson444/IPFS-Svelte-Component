<script>
	import { onMount } from "svelte";
	// import * as IPFS from "./IPFS.js";
	let IPFS

	export let ipfsNode;
	export let nodeId;

	onMount(async () => {

		import("./IPFS.js").then(
			async (module) => {
				IPFS = module;

				await IPFS.use();
				// console.info({ ipfs }); // avilable as a global variable
				ipfsNode = ipfs; // bind the prop to the global
				// Now you can use ipfs globally to do things like
				const identity = await ipfsNode.id();
				nodeId = identity.id;
				console.info("nodeId", nodeId);
			}
		);
	});
</script>
