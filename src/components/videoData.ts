export interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  category: string
}

export const videos: Video[] = [
  {
    id: '1',
    title: 'Motion Ad for brand',
    description: 'A dynamic motion graphics advertisement showcasing cutting-edge technology with sleek animations and modern design elements.',
    thumbnail: 'https://images.unsplash.com/photo-1729179664878-49b8cc390d2b?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://cht36xxrzycrr1fo.public.blob.vercel-storage.com/Videos/iris_ad_final-yxm7pO07xSG1bHy78nLds7euMNBFFN.mp4',
    category: 'Motion Graphics'
  },
  {
    id: '2',
    title: 'Brand Promotion Video',
    description: 'A dynamic motion graphics advertisement showcasing cutting-edge technology with sleek animations and modern design elements.',
    thumbnail: 'https://images.unsplash.com/photo-1738533614668-0a1a2501a138?w=800&auto=format&fit=crop&q=60',
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
    title: 'Motion Graphics Reel',
    description: 'A dynamic motion graphics reel with sleek animations and modern design elements.',
    thumbnail: 'https://images.unsplash.com/photo-1605106702842-01a887a31122?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://cht36xxrzycrr1fo.public.blob.vercel-storage.com/Videos/algorithm_final-LXrRtXWsscMWHKaRUp8GlgwphLEDgE.mp4',
    category: 'Motion Graphics'
  },
  {
    id: '5',
    title: 'YT Longform',
    description: 'A dynamic motion graphics reel with sleek animations and modern design elements.',
    thumbnail: 'https://images.unsplash.com/photo-1746608942838-a484d55ffeda?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://drive.google.com/file/d/1t_aw5-imhxmUR5ZdkHLJMowsxdQ7RgYy/view?usp=drive_link',
    category: 'YT Longform'
  },
  {
    id: '6',
    title: 'Documentary',
    description: 'A documentary showcasing the journey of a person.',
    thumbnail: 'https://images.unsplash.com/photo-1686416653754-a3c5522fd922?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://cht36xxrzycrr1fo.public.blob.vercel-storage.com/Videos/Documentary_final-qVQDf4bPMqQmBBAiIAnYMsonlRs6c4.mp4',
    category: 'Documentary'
  },
  {
    id: '7',
    title: 'History Documentary',
    description: 'A documentary showcasing the old history of a place.',
    thumbnail: 'https://images.unsplash.com/photo-1582072291448-5db861a71699?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://drive.google.com/file/d/1kUichUM6LejbzrWJXU34OvUKuigXOV1U/view?usp=drive_link',
    category: 'Documentary'
  },
  {
    id: '8',
    title: 'Typography',
    description: 'A typography video showcasing the journey of a person.',
    thumbnail: 'https://images.unsplash.com/photo-1662947201279-a2e44d01831f?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://cht36xxrzycrr1fo.public.blob.vercel-storage.com/Videos/sg02-EBmLXTHkNlymB28U0HxEljnIrALIM9.mp4',
    category: 'Typography'
  },
  {
    id: '9',
    title: 'Action Edit',
    description: 'A thrilling action edit showcasing dynamic camera movements.',
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://drive.google.com/file/d/1RClCSB8PwKiiIO3O9YiBrTQu9MXKd9in/view?usp=drive_link',
    category: 'Action'
  },
  {
    id: '10',
    title: 'Short Film - The Lost Self',
    description: 'A compelling narrative short film exploring themes of self-discovery and growth.',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://youtu.be/LSWTg1fYxOw',
    category: 'Short Films'
  },
  {
    id: '11',
    title: 'College Fest Video',
    description: 'A vibrant and energetic video showcasing the excitement and energy of a college fest.',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://cht36xxrzycrr1fo.public.blob.vercel-storage.com/Videos/inci_aip_band-FE0bT4wBMlWlmta6qyAMBUna8MgLHx.mp4',
    category: 'Events'
  },
,
  {
    "id": "07feff9b-9a82-4ce7-bdd0-72aa55df75cf",
    "title": "Documentary Sample",
    "description": "How disney started, its journey shown visually",
    "thumbnail": "https://images.unsplash.com/photo-1528041119984-da3a9f8d04d1?q=80&w=1409&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "videoUrl": "https://drive.google.com/file/d/1XBgjT-ViIUuL9MzPICsMsf6Afw_yON8d/view",
    "category": "Documentary"
  },
  {
    "id": "f84c508e-2b50-4851-9431-777119cef094",
    "title": "Documentary - Sample",
    "description": "history of USA sample documentary style",
    "thumbnail": "https://images.unsplash.com/photo-1560747165-bccaec0a914f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "videoUrl": "https://drive.google.com/file/d/1q3Sm6yP9cwZRw8PoEifpaLMHyLEExGEW/view?usp=sharing",
    "category": "Documentary"
  }] 