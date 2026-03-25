import Scene from './components/canvas/Scene'
import Ticker from './components/Ticker'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import './index.css'

export default function App() {
  return (
    <>
      {/* Fixed R3F background canvas */}
      <div id="r3f-canvas-container">
        <Scene />
      </div>

      {/* Scrollable HTML content */}
      <div id="content">
        <Ticker />
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </>
  )
}
