'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaHome, FaVideo, FaUser, FaEnvelope } from 'react-icons/fa'

const navItems = [
  { icon: FaHome, label: 'Home', href: '#home' },
  { icon: FaVideo, label: 'Works', href: '#works' },
  { icon: FaUser, label: 'About', href: '#about' },
  { icon: FaEnvelope, label: 'Contact', href: '#contact' }
]

export default function MobileNav() {
  const [activeSection, setActiveSection] = useState('home')

  const handleNavClick = (section: string) => {
    setActiveSection(section)
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-dark-lighter border-t border-dark-light md:hidden z-50"
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const section = item.href.replace('#', '')
          const isActive = activeSection === section

          return (
            <motion.button
              key={section}
              onClick={() => handleNavClick(section)}
              className="flex flex-col items-center justify-center w-full h-full"
              whileTap={{ scale: 0.95 }}
            >
              <Icon
                className={`text-xl ${
                  isActive ? 'text-primary' : 'text-light-dim'
                }`}
              />
              <span
                className={`text-xs mt-1 ${
                  isActive ? 'text-primary' : 'text-light-dim'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute bottom-0 w-16 h-0.5 bg-primary"
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </motion.nav>
  )
} 