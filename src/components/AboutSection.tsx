'use client'

import { motion } from 'framer-motion'
import { FaCamera, FaEdit } from 'react-icons/fa'

const skills = [
  {
    title: 'Video Editing',
    description: 'Professional video editing with Adobe Premiere Pro and After Effects',
    icon: <FaEdit className="text-4xl text-primary" />
  },
  {
    title: 'Cinematography',
    description: 'Capturing stunning visuals with advanced camera techniques',
    icon: <FaCamera className="text-4xl text-primary" />
  }
]

const timeline = [
  {
    year: '2023',
    title: 'Senior Video Editor',
    company: 'Creative Studios',
    description: 'Leading video production for major clients'
  },
  {
    year: '2022',
    title: 'Video Editor',
    company: 'Digital Media Agency',
    description: 'Created engaging content for social media platforms'
  },
  {
    year: '2021',
    title: 'Freelance Editor',
    company: 'Self-employed',
    description: 'Worked with various clients on diverse projects'
  }
]

export default function AboutSection() {
  return (
    <section className="section bg-dark">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-2 mb-12 text-center">About Me</h2>

          {/* Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {skills.map((skill) => (
              <motion.div
                key={skill.title}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-lg bg-dark-light"
              >
                <div className="mb-4">{skill.icon}</div>
                <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                <p className="text-light-dim">{skill.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20" />
            {timeline.map((item) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative mb-8"
              >
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-primary">{item.company}</p>
                    <p className="text-light-dim">{item.description}</p>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
                  <div className="w-1/2 pl-8">
                    <span className="text-2xl font-bold text-primary">{item.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 