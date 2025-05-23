'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaVideo, FaFilm, FaTools } from 'react-icons/fa'

const experiences = [
  {
    year: '2023',
    title: 'Senior Video Editor',
    company: 'Creative Studios',
    description: 'Leading video production for major brand campaigns'
  },
  {
    year: '2022',
    title: 'Freelance Editor',
    company: 'Independent',
    description: 'Working with diverse clients on various video projects'
  },
  {
    year: '2021',
    title: 'Junior Editor',
    company: 'Media House',
    description: 'Started journey in professional video editing'
  }
]

const tools = [
  { name: 'Adobe Premiere Pro', icon: '🎬' },
  { name: 'After Effects', icon: '✨' },
  { name: 'DaVinci Resolve', icon: '🎨' },
  { name: 'Photoshop', icon: '🖼️' },
  { name: 'Illustrator', icon: '✏️' },
  { name: 'Audition', icon: '🎧' }
]

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className="section bg-dark">
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="heading-2 mb-6">About Me</h2>
            <p className="text-xl text-light-dim max-w-2xl mx-auto">
              A passionate video editor and filmmaker with a keen eye for storytelling
              and a love for creating engaging visual content.
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="heading-3 mb-8 text-center">Experience</h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.year}
                  className="relative pl-8 border-l-2 border-primary"
                  variants={itemVariants}
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                  <div className="mb-2 text-primary font-bold">{exp.year}</div>
                  <h4 className="text-xl font-bold mb-1">{exp.title}</h4>
                  <div className="text-light-dim mb-2">{exp.company}</div>
                  <p className="text-light-dim">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tools & Skills */}
          <motion.div variants={itemVariants}>
            <h3 className="heading-3 mb-8 text-center">Tools & Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {tools.map((tool) => (
                <motion.div
                  key={tool.name}
                  className="bg-dark-lighter p-4 rounded-lg text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl mb-2">{tool.icon}</div>
                  <div className="font-medium">{tool.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 