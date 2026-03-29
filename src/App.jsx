import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Features from "./components/sections/Features";
import AppShowcase from "./components/sections/AppShowcase";
import Testimonials from "./components/sections/Testimonials";
import Pricing from "./components/sections/Pricing";
import ProductTour from "./components/sections/ProductTour";
import FAQ from "./components/sections/FAQ";
import Partners from "./components/sections/Partners";
import Blog from "./components/sections/Blog";
import CTA from "./components/sections/CTA";

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Features />
        <AppShowcase />
        <Testimonials />
        <Pricing />
        <ProductTour />
        <FAQ />
        <Partners />
        <Blog />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
