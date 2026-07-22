import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1200], [0, 240]);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'ai', name: 'AI & ML' },
    { id: 'data', name: 'Data Engineering' },
    { id: 'automation', name: 'Automation' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Image Extractor',
      description: 'Production dual-model OCR pipeline using DeepSeek-OCR and Qwen3-VL to extract structured JSON from driver licenses, insurance cards, and documents with confidence scoring.',
      category: 'ai',
      technologies: ['Python', 'DeepSeek-OCR', 'Qwen3-VL', 'Computer Vision'],
      github: 'https://github.com/Mortaza76/Image-Extractor'
    },
    {
      id: 2,
      title: 'NeuroPersona MoE',
      description: 'Mixture-of-Experts conversational AI with neural persona routing, emotion-aware gating, per-persona memory, and a Streamlit dashboard for routing analytics.',
      category: 'ai',
      technologies: ['PyTorch', 'Qwen2.5', 'Sentence Transformers', 'Streamlit'],
      github: 'https://github.com/Mortaza76/NeuroPersona-MoE'
    },
    {
      id: 3,
      title: 'AutoML Platform (FYP)',
      description: 'End-to-end machine learning automation platform with interactive EDA, automated feature engineering, model selection, SHAP explainability, and downloadable trained models.',
      category: 'ai',
      technologies: ['Python', 'AutoML', 'SHAP', 'H2O.ai'],
      github: 'https://github.com/Mortaza76/FYP-MAIN'
    },
    {
      id: 4,
      title: 'Traffic Data Platform',
      description: 'Real-time traffic data engineering system with Kafka ingestion, PostgreSQL storage, MinIO archival, Airflow orchestration, Flask API, and a React analytics dashboard.',
      category: 'data',
      technologies: ['Apache Kafka', 'Airflow', 'PostgreSQL', 'React'],
      github: 'https://github.com/Mortaza76/DE-Project'
    },
    {
      id: 5,
      title: 'Sentiment Dashboard',
      description: 'Real-time sentiment analysis dashboard for Twitter and news feeds, with transformer-based scoring, interactive visualizations, FastAPI backend, and Streamlit UI.',
      category: 'ai',
      technologies: ['FastAPI', 'Streamlit', 'Transformers', 'NLP'],
      github: 'https://github.com/Mortaza76/Sentiment-Dashboard'
    },
    {
      id: 6,
      title: 'Sign Language Translator',
      description: 'End-to-end sign language system that detects hand signs with MediaPipe, generates natural language with Gemini, and speaks output in English and Chinese.',
      category: 'ai',
      technologies: ['MediaPipe', 'Gemini AI', 'PyQt5', 'Computer Vision'],
      github: 'https://github.com/Mortaza76/HandSign-to-Audio'
    },
    {
      id: 7,
      title: 'Automated Hiring Agent',
      description: 'n8n meta-agent that automates hiring from application intake to AI-written emails, HR routing, and Google Calendar / Meet interview scheduling.',
      category: 'automation',
      technologies: ['n8n', 'AI Agents', 'Google Calendar', 'Automation'],
      github: 'https://github.com/Mortaza76/Hiring-Process-Automated'
    },
    {
      id: 8,
      title: 'LSTM Sales Forecaster',
      description: 'Deep learning sales forecasting with LSTMs across stores and items, including preprocessing, training history, and actual-vs-predicted evaluation plots.',
      category: 'ai',
      technologies: ['LSTM', 'Keras', 'Time Series', 'Python'],
      github: 'https://github.com/Mortaza76/LSTM-StorePredictor'
    },
    {
      id: 9,
      title: 'Urdu Speech Translator',
      description: 'Real-time speech translation app for Urdu to multiple languages with bidirectional conversation support, FastAPI backend, and React frontend.',
      category: 'ai',
      technologies: ['FastAPI', 'React', 'Speech AI', 'NLP'],
      github: 'https://github.com/Mortaza76/Translator'
    },
    {
      id: 10,
      title: 'Document Processing Pipeline',
      description: 'Hybrid OCR and multimodal pipeline for extracting structured fields from ID cards, insurance cards, and medical face sheets with classification and validation.',
      category: 'ai',
      technologies: ['OCR', 'OpenCV', 'Multimodal AI', 'Python'],
      github: 'https://github.com/Mortaza76/Text-Extraction'
    },
    {
      id: 11,
      title: 'Football Analytics Dashboard',
      description: 'Decision-oriented football analytics platform that turns API data into form analysis, odds context, and betting insights for informed match decisions.',
      category: 'data',
      technologies: ['JavaScript', 'APIs', 'Data Visualization', 'Analytics'],
      github: 'https://github.com/Mortaza76/Football-Betting'
    },
    {
      id: 12,
      title: 'Demo Scheduling Automation',
      description: 'Reliable demo-scheduling backend with state machines, retryable jobs, SMTP and Google Calendar integrations, conflict handling, and a live status dashboard.',
      category: 'automation',
      technologies: ['TypeScript', 'SQLite', 'Google Calendar', 'SMTP'],
      github: 'https://github.com/Mortaza76/Project-Demo-Automation'
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
        type: 'spring',
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
    <section id="projects" className="py-20 relative overflow-hidden select-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
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
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.1, type: 'spring', stiffness: 120, damping: 18 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Selected AI, data, and automation work from GitHub
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer select-none ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-interactive="true"
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

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
              <motion.a
                key={project.id}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="group relative rounded-2xl p-6 text-left cursor-pointer select-none bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 shadow-lg card block"
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 120, damping: 18 } }}
                whileTap={{ scale: 0.98 }}
                data-interactive="true"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <FaGithub className="w-5 h-5 shrink-0 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
