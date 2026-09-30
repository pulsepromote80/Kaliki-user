
import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Process } from "@/components/landing/Process";
import { Stats } from "@/components/landing/Stats";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { Tryityourself } from "@/components/landing/Tryityourself";
import { Mentors } from "@/components/landing/yourmentors";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import { About } from "@/components/landing/About";
import { Markets } from "@/components/landing/Markets";
import { Careers } from "@/components/landing/Careers";
import { Contact } from "@/components/landing/Contact";
import { Curriculum } from "@/components/landing/Curriculam";


export default function HomePage() {
  return (
    <>
      <Navbar/>
      <main>
        <Hero />
        <Features />
        <Markets />
        <About />
        <Curriculum />
        <Tryityourself />
        <Mentors />
        <Process />
        <Stats />
        <Testimonials />
        <FAQ />
        <Careers />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
