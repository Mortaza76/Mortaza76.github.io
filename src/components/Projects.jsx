import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import useDarkMode from '../hooks/useDarkMode';

const Projects = () => {
  const { isDark } = useDarkMode();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Parallax effect for Projects background
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1200], [0, 240]);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'web', name: 'Web Apps' },
    { id: 'ai', name: 'AI & ML' },
    { id: 'game', name: 'Games' },
    { id: 'research', name: 'Research' }
  ];

  const projects = [
    {
      id: 1,
      title: 'United Chatbot',
      description: 'An intelligent chatbot system designed to provide seamless customer support and automated responses using advanced NLP techniques.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      category: 'ai',
      technologies: ['Python', 'NLP', 'Machine Learning', 'Flask'],
      link: '#',
      github: 'https://github.com/Mortaza76/United-chatbot'
    },
    {
      id: 2,
      title: 'Sentiment Dashboard',
      description: 'A comprehensive sentiment analysis dashboard that processes and visualizes emotional data from various sources with real-time analytics.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      category: 'ai',
      technologies: ['React', 'Python', 'D3.js', 'Sentiment Analysis'],
      link: '#',
      github: 'https://github.com/Mortaza76/sentiment-dashboard'
    },
    {
      id: 3,
      title: 'Flappy Bird Game',
      description: 'A modern recreation of the classic Flappy Bird game with enhanced graphics, smooth animations, and responsive controls.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop',
      category: 'game',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Canvas API'],
      link: '#',
      github: 'https://github.com/Mortaza76/flappybirdgame'
    },
    {
      id: 4,
      title: 'DE Project',
      description: 'A data engineering project focused on building robust data pipelines, ETL processes, and data warehousing solutions.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      category: 'web',
      technologies: ['Python', 'Apache Spark', 'Docker', 'AWS'],
      link: '#',
      github: 'https://github.com/Mortaza76/DE-project'
    },
    {
      id: 5,
      title: 'Chess Game',
      description: 'A fully functional chess game with AI opponent, move validation, and beautiful UI featuring classic chess pieces and board.',
      image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=600&h=400&fit=crop',
      category: 'game',
      technologies: ['JavaScript', 'React', 'Chess.js', 'AI Algorithms'],
      link: '#',
      github: 'https://github.com/Mortaza76/chess'
    },
    {
      id: 6,
      title: 'IR Project',
      description: 'An information retrieval system that implements advanced search algorithms and document processing techniques.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      category: 'ai',
      technologies: ['Python', 'Information Retrieval', 'Search Algorithms', 'NLP'],
      link: '#',
      github: 'https://github.com/Mortaza76/IR-project'
    },
    {
      id: 7,
      title: 'FYP Main',
      description: 'My final year project showcasing innovative solutions and comprehensive research in advanced software development.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
      category: 'research',
      technologies: ['Full Stack', 'Research', 'Innovation', 'Advanced Tech'],
      link: '#',
      github: 'https://github.com/Mortaza76/FYP-main'
    },
    {
      id: 8,
      title: 'DevOps Final',
      description: 'A comprehensive DevOps project demonstrating CI/CD pipelines, containerization, and cloud infrastructure automation.',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop',
      category: 'web',
      technologies: ['Docker', 'Kubernetes', 'Jenkins', 'AWS'],
      link: '#',
      github: 'https://github.com/Mortaza76/DEVops-final'
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18
      }
    },
    exit: {
      opacity: 0,
      y: -40,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden select-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Video Backgrounds with Smooth Transition */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          src="/white2.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: isDark ? 0 : 1, transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1)' }}
        />
        <video
          src="/dark2.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: isDark ? 1 : 0, transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1)' }}
        />
        {/* Overlay for text clarity */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'linear-gradient(120deg, rgba(0,0,0,0.60) 0%, rgba(30,30,34,0.60) 100%)'
              : 'linear-gradient(120deg, rgba(255,255,255,0.60) 0%, rgba(240,240,240,0.60) 100%)',
            zIndex: 1,
          }}
        />
      </div>
      {/* Parallax Background Layer */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          y: parallaxY,
          background: 'linear-gradient(120deg, rgba(59,130,246,0.07) 0%, rgba(236,72,153,0.10) 100%)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, type: 'spring', stiffness: 120, damping: 18 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            A showcase of my recent work and creative solutions
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer select-none ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                  : 'bg-white/10 dark:bg-gray-800/10 text-gray-300 dark:text-gray-400 hover:bg-white/20 dark:hover:bg-gray-800/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-interactive="true"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group relative rounded-2xl p-6 text-center cursor-pointer select-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg card"
                whileHover={{ y: -10, transition: { type: 'spring', stiffness: 120, damping: 18 } }}
                whileTap={{ scale: 0.98 }}
                data-interactive="true"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image + (project.image.includes('unsplash.com') ? '&auto=format&fit=crop&w=600&q=80' : '')}
                    alt={project.title}
                    loading="lazy"
                    width="600"
                    height="400"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Overlay with Links */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      <motion.a
                        href={project.link}
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300 cursor-pointer select-none icon-animate"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        data-interactive="true"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.a>
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300 cursor-pointer select-none icon-animate"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        data-interactive="true"
                      >
                        <FaGithub className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>
                </div>
                {/* Project Title & Description */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects; 