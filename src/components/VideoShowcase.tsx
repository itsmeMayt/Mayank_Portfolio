'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import VideoPlayer from './VideoPlayer'

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  category: string
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Portfolio Showcase',
    description: 'A collection of my best video editing and filmmaking work, showcasing various styles and techniques.',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://drive.google.com/file/d/1RClCSB8PwKiiIO3O9YiBrTQu9MXKd9in/view',
    category: 'Portfolio'
  },
  {
    id: '2',
    title: 'Product Launch Campaign',
    description: 'Dynamic product showcase with modern transitions and engaging visuals for a tech startup.',
    thumbnail: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&auto=format&fit=crop&q=60',
    videoUrl: '/videos/background.mp4',
    category: 'Commercial'
  },
  {
    id: '3',
    title: 'Travel Vlog - Mountains',
    description: 'Capturing the breathtaking beauty of mountain landscapes with cinematic drone shots.',
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=60',
    videoUrl: '/videos/background.mp4',
    category: 'Travel'
  },
  {
    id: '4',
    title: 'Music Video - Indie Band',
    description: 'Creative music video featuring unique transitions and artistic visual effects.',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60',
    videoUrl: '/videos/background.mp4',
    category: 'Music'
  },
  {
    id: '5',
    title: 'Short Film - The Journey',
    description: 'A compelling narrative short film exploring themes of self-discovery and growth.',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=60',
    videoUrl: '/videos/background.mp4',
    category: 'Short Films'
  },
  {
    id: '6',
    title: 'Brand Story - Local Cafe',
    description: 'Heartwarming brand story showcasing the journey of a local cafe and its community impact.',
    thumbnail: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=60',
    videoUrl: '/videos/background.mp4',
    category: 'Commercial'
  }
]

export default function VideoShowcase() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const categories = ['All', 'Commercial', 'Short Films', 'College Events', 'Travel', 'Music']

  const filteredVideos = activeCategory === 'All'
    ? videos
    : videos.filter(video => video.category === activeCategory)

  return (
    <section className="section bg-dark-lighter">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-2 mb-12 text-center">Featured Works</h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-dark-light text-light-dim hover:bg-dark'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Video Carousel */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="video-carousel"
          >
            {filteredVideos.map((video) => (
              <SwiperSlide key={video.id}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="aspect-video rounded-lg overflow-hidden bg-dark">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 p-4">
                        <h3 className="text-lg font-bold mb-2">{video.title}</h3>
                        <p className="text-sm text-light-dim">{video.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Video Player Modal */}
      <VideoPlayer
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.videoUrl || ''}
        title={selectedVideo?.title || ''}
      />
    </section>
  )
} 