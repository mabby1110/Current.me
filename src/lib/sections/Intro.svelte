<script>
	import { fade, slide } from 'svelte/transition';
	import { infoStore } from '$lib/writables';
	let title = 'A handpicked collection of software pieces that...';
	let subtitle = ' blends art, design and technology';
	let description = 'This is my road into digital experiences';
  
	// Reactive variables to control animations
	$: h1Animate = $infoStore.scrollY >= 300;
	$: backgroundAnimate = $infoStore.scrollY >= 500; // Nueva variable para el fondo
  </script>
  
  <section class="hero {backgroundAnimate ? 'background-cover-out' : 'background-cover-in'}" in:slide={{ axis: 'y', duration: 800 }}>
	<h3 in:fade={{ duration: 800, delay: 1000 }}>
	  {title}
	</h3>
	<h1 class="{h1Animate ? 'fade-in' : 'fade-out'}">
	  {subtitle}
	</h1>
	<p class="{backgroundAnimate ? 'fade-in' : 'fade-out'}">
	  {description}
	</p>
  </section>
  
  <style>
	.hero {
	  height: 100vh;
	  width: 100%;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  gap: 10vh;
	  text-align: center;
	  color: white;
	  border-style: solid;
	  border-width: 4rem;
	  border-color: black;
	  background-color: black; /* Color inicial */
	  transition: background-color 1s ease; /* Transición suave para el fondo */
	}
  
	h3 {
	  font-size: 1.5rem;
	  font-weight: 300;
	  transition:
		opacity 0.5s,
		transform 0.5s;
	  position: sticky;
	  top: 22vh;
	}
  
	h1 {
	  font-size: 3rem;
	  font-weight: 700;
	  margin: 10px 0;
	  transition:
		opacity 0.5s,
		transform 0.5s;
	  position: sticky;
	  top: 28vh;
	}
  
	p {
	  font-size: 1.2rem;
	  font-weight: 400;
	  max-width: 600px;
	  transition:
		opacity 0.5s,
		transform 0.5s;
	  position: sticky;
	  top: 38vh;
	}
  
	.fade-in {
	  opacity: 1;
	  transform: translateY(0);
	}
  
	.fade-out {
	  opacity: 0;
	  transform: translateY(-20px);
	}
  
	.background-cover-in {
	  background-color: black; /* Fondo negro inicial */
	}
  
	.background-cover-out {
	  background-color: transparent; /* Fondo transparente al llegar a 300 */
	}
  </style>