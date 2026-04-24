"use client";
import Preloader from './components/preloader';
import Pagewrapper from "./components/pagewrapper";
import Circles from "./components/circles";
import Heading from "./components/header";
import Contents from "./components/contents";
import Intro from "./components/intro";
import About from "./components/about";
import Works from "./components/works";
import Contact from "./components/contact";
import Footer from "./components/footer";
import dynamic from "next/dynamic";
const AnimatedCursor = dynamic(() => import('./components/AnimatedCursor'), { ssr: false });
const Slider = dynamic(() => import('./components/imagegallery'), { ssr: false });

export default function Home() {
  return (
<>
<Preloader />
<AnimatedCursor
  color="#fff"
  innerSize={8}
  outerSize={50}
  innerScale={1}
  outerScale={1.7}
  outerAlpha={0}

  outerStyle={{
    mixBlendMode: 'difference',
    background:"var(--color-text-dark)",
  }}
  innerStyle={{
    backgroundColor: 'var(--color-text-dark)',
    mixBlendMode:"difference"
  }}

  clickables={[
    'a',
    'input[type="text"]',
    'input[type="email"]',
    'input[type="number"]',
    'input[type="submit"]',
    'input[type="image"]',
    'label[for]',
    'select',
    'textarea',
    'button',
   '.hoverable'
  ]}
/>
<Pagewrapper>
  <Circles />
  <Heading />
  <Contents >
    <Intro />
    <About />
    <Works />
    <Slider />
    <Contact />
  </Contents>
<Footer />
</Pagewrapper>
</>
  );
}
