# IPFS-Svelte-Component

An experimental Svelte Wrapper for IPFS to easily use it in other apps.

## Hacks

Bundling IPFS with Rollup is a bit fickle. Kept getting blocked on 

```js
implementation = node(options) || browser (options)

```

...which wants cluster to be present. No matter how I tried to null out cluster, it still was a problem.

So I had to cut-and-paste the build from Gozala's [replciator](https://github.com/Gozala/replicator/tree/default/replicator/modules/ipfs-core) in order to bundle it into the component. This means it needs to be manually updated to bump versions. Not ideal, but it works in the browser.

## Use

In a svelte app:

```
// TODO
```


```
npm run build
```

The rollup build is smaller (due to treeshaking I suspect)
