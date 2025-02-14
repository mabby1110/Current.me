<script>
	import { infoStore } from '$lib/writables';


	// Control para animación de salida
	let shouldExitAnimate = false;

	// Solo detectamos cuando pasamos los 200px por primera vez
	$: if ($infoStore.scrollY > 200 && !shouldExitAnimate) {
		shouldExitAnimate = true;
	} else {
		shouldExitAnimate = false;
	}
</script>

<section class="hero">
    <div class="frontend">frontend</div>
    <div class="backend">backend</div>
    <div class="frameworks">frameworks</div>
    <div class="api-design">API designs</div>
    <div class="devops">DevOps</div>
    <div class="version-control">version control</div>
    <div class="Testing">Testing</div>
    <div class="soft-skills">Soft Skills</div>
</section>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100vh;
		width: 100%;
		text-align: center;
		color: white;
		display: flex;
		border-style: solid;
		border-width: 4rem;
		border-color: black;
	}

	h3 {
		font-size: 1.5rem;
		font-weight: 300;
		transition:
			opacity 0.5s,
			transform 0.5s;
	}

	h1 {
		font-size: 3rem;
		font-weight: 700;
		margin: 10px 0;
		transition:
			opacity 0.5s,
			transform 0.5s;
	}

	p {
		font-size: 1.2rem;
		font-weight: 400;
		max-width: 600px;
		transition: opacity 0.5s;
	}

	.fade-out {
		opacity: 0;
		transform: translateY(-20px);
	}
</style>
