import '@/i18n'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Stats from '@/components/sections/Stats'
import Contact from '@/components/sections/Contact'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
