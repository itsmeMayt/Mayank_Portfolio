'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaArrowDown } from 'react-icons/fa'
import VideoShowcase from '@/components/VideoShowcase'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import MobileNav from '@/components/MobileNav'
import BackToTop from '@/components/BackToTop'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    setIsVisible(true)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <main className="min-h-screen bg-dark">
      {/* Custom cursor */}
      {isVisible && (
        <motion.div
          className="custom-cursor"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
            mass: 0.5
          }}
        />
      )}

      {/* Landing Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/images/hero-bg.png")',
            }}
          />
          <div className="absolute inset-0 bg-dark/70 backdrop-blur-sm" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-1 mb-6">
              <span className="text-primary">Cinemayank</span>
            </h1>
            <p className="text-xl md:text-2xl text-light-dim mb-8">
              Video Editor | Filmmaker | Creative Nerd
            </p>
            <motion.button
              className="btn btn-primary group"
              onClick={scrollToContent}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discover My Edits
              <FaArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FaArrowDown className="text-light-dim text-2xl" />
        </motion.div>
      </section>

      {/* Video Showcase Section */}
      <section id="works">
        <VideoShowcase />
      </section>

      {/* About Section */}
      <section id="about">
        <AboutSection />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <ContactSection />
      </section>

      {/* Mobile Navigation */}
      <MobileNav />

      <BackToTop />
    </main>
  )
}
