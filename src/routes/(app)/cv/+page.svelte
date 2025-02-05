<script lang="ts">
	import XpCard from "$lib/components/XPCard.svelte";
	import { fade } from "svelte/transition";
</script>
<XpCard top="10vh" left="10vw">
	<!-- svelte-ignore a11y-missing-attribute -->
	<iframe
		src="https://drive.google.com/file/d/111sMnlGyCAxB_1uA059P_NYDM28nSUJ9/preview"
		id="pdf"
		allow="autoplay"
	></iframe>
</XpCard>

<style>
	#pdf {
		width: 100%;
		aspect-ratio: 1 / 1.414;
	}
</style>
