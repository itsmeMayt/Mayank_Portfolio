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
    title: 'Motion Ad for brand',
    description: 'A dynamic motion graphics advertisement showcasing cutting-edge technology with sleek animations and modern design elements.',
    thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://cht36xxrzycrr1fo.public.blob.vercel-storage.com/Videos/iris_ad_final-yxm7pO07xSG1bHy78nLds7euMNBFFN.mp4',
    category: 'Motion Graphics'
  },
  {
    id: '2',
    title: 'Brand Promotion Video',
    description: 'A dynamic motion graphics advertisement showcasing cutting-edge technology with sleek animations and modern design elements.',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
    videoUrl: '/videos/background.mp4',
    category: 'Motion Graphics'
  },
  {
    id: '3',
    title: 'Motion Intro for a Short Film',
    description: 'An eye-catching motion graphics intro that sets the tone for the short film with dynamic typography and 3D movements.',
    thumbnail: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://cht36xxrzycrr1fo.public.blob.vercel-storage.com/Videos/The%20Lost%20Self%20_%20Short%20Film%20_%20Announcement%20Video-N0FSAmZiLWhO1HGLsfLx1PVCXLJI4B.mp4',
    category: 'Motion Graphics'
  },
  {
    id: '4',
    title: 'Action Edit',
    description: 'A thrilling action edit showcasing dynamic camera movements.',
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://drive.google.com/file/d/1RClCSB8PwKiiIO3O9YiBrTQu9MXKd9in/view?usp=drive_link',
    category: 'Action'
  },
  {
    id: '5',
    title: 'Short Film - The Lost Self',
    description: 'A compelling narrative short film exploring themes of self-discovery and growth.',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://youtu.be/LSWTg1fYxOw',
    category: 'Short Films'
  },
  {
    id: '6',
    title: 'College Fest Video',
    description: 'A vibrant and energetic video showcasing the excitement and energy of a college fest.',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://cht36xxrzycrr1fo.public.blob.vercel-storage.com/Videos/inci_aip_band-FE0bT4wBMlWlmta6qyAMBUna8MgLHx.mp4',
    category: 'Events'
  }
]

export default function VideoShowcase() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const categories = ['All','Motion Graphics','Action','Typography','Events','Short Films','Others']

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