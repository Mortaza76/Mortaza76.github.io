import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  FaBrain, 
  FaCode, 
  FaDatabase, 
  FaChartBar, 
  FaRobot, 
  FaComments, 
  FaEye, 
  FaCloud, 
  FaFlask, 
  FaCogs, 
  FaLaptopCode 
} from 'react-icons/fa';
import { 
  SiPython, 
  SiR, 
  SiMysql, 
  SiPostgresql, 
  SiMongodb, 
  SiPytorch, 
  SiJupyter, 
  SiDocker, 
  SiFastapi, 
  SiStreamlit, 
  SiAnaconda, 
  SiGooglecolab 
} from 'react-icons/si';

const TECH_CATEGORIES = [
  {
    id: 'core-languages',
    title: 'Core Languages',
    icon: FaCode,
    color: '#3B82F6',
    items: [
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'R', icon: SiR, color: '#276DC3' },
      { name: 'SQL', icon: FaDatabase, color: '#336791' }
    ]
  },
  {
    id: 'data-manipulation',
    title: 'Data Manipulation & Analysis',
    icon: FaChartBar,
    color: '#10B981',
    items: [
      { name: 'Pandas', icon: FaChartBar, color: '#130654' },
      { name: 'NumPy', icon: FaChartBar, color: '#4DABCF' },
      { name: 'Dask', icon: FaChartBar, color: '#FF6600' }
    ]
  },
  {
    id: 'data-visualization',
    title: 'Data Visualization',
    icon: FaChartBar,
    color: '#8B5CF6',
    items: [
      { name: 'Matplotlib', icon: FaChartBar, color: '#11557C' },
      { name: 'Seaborn', icon: FaChartBar, color: '#7A9BC0' },
      { name: 'Plotly', icon: FaChartBar, color: '#3F4F75' },
      { name: 'Tableau', icon: FaChartBar, color: '#E97627' },
      { name: 'Power BI', icon: FaChartBar, color: '#F2C811' }
    ]
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning & Deep Learning',
    icon: FaRobot,
    color: '#EF4444',
    items: [
      { name: 'Scikit-learn', icon: FaRobot, color: '#F7931E' },
      { name: 'XGBoost', icon: FaRobot, color: '#337AB7' },
      { name: 'LightGBM', icon: FaRobot, color: '#FF6600' },
      { name: 'TensorFlow', icon: FaRobot, color: '#FF6F00' },
      { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' }
    ]
  },
  {
    id: 'nlp-tools',
    title: 'NLP Tools',
    icon: FaComments,
    color: '#F59E0B',
    items: [
      { name: 'spaCy', icon: FaComments, color: '#09A3D5' },
      { name: 'NLTK', icon: FaComments, color: '#7CC242' },
      { name: 'HuggingFace', icon: FaComments, color: '#FF6B6B' }
    ]
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision',
    icon: FaEye,
    color: '#EC4899',
    items: [
      { name: 'OpenCV', icon: FaEye, color: '#5C3EE8' },
      { name: 'Pillow', icon: FaEye, color: '#F7931E' },
      { name: 'TorchVision', icon: SiPytorch, color: '#EE4C2C' }
    ]
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: FaDatabase,
    color: '#06B6D4',
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' }
    ]
  },
  {
    id: 'cloud-bigdata',
    title: 'Cloud & Big Data',
    icon: FaCloud,
    color: '#6366F1',
    items: [
      { name: 'AWS', icon: FaCloud, color: '#FF9900' },
      { name: 'GCP', icon: FaCloud, color: '#4285F4' },
      { name: 'Apache Spark', icon: FaCloud, color: '#E25A1C' },
      { name: 'Kafka', icon: FaCloud, color: '#231F20' }
    ]
  },
  {
    id: 'experimentation-deployment',
    title: 'Experimentation & Deployment',
    icon: FaFlask,
    color: '#84CC16',
    items: [
      { name: 'Jupyter', icon: SiJupyter, color: '#F37626' },
      { name: 'MLflow', icon: FaFlask, color: '#019733' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
      { name: 'Streamlit', icon: SiStreamlit, color: '#FF4B4B' }
    ]
  },
  {
    id: 'mlops',
    title: 'MLOps',
    icon: FaCogs,
    color: '#F97316',
    items: [
      { name: 'DVC', icon: FaCogs, color: '#945DD6' },
      { name: 'Airflow', icon: FaCogs, color: '#017CEE' },
      { name: 'Seldon', icon: FaCogs, color: '#FF6B6B' }
    ]
  },
  {
    id: 'development-tools',
    title: 'Development Tools',
    icon: FaLaptopCode,
    color: '#6B7280',
    items: [
      { name: 'VS Code', icon: FaLaptopCode, color: '#007ACC' },
      { name: 'PyCharm', icon: FaLaptopCode, color: '#21D789' },
      { name: 'Anaconda', icon: SiAnaconda, color: '#44A833' },
      { name: 'Google Colab', icon: SiGooglecolab, color: '#F9AB00' }
    ]
  }
];

const TechStackCarousel = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  // Parallax effect for background
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <section className="py-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          src="/tech.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: 1, transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1)' }}
        />
        {/* Overlay for text clarity */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(120deg, rgba(255,255,255,0.70) 0%, rgba(30,30,34,0.70) 100%)',
            zIndex: 1,
          }}
        />
      </div>
      
      {/* Parallax Background Layer */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          y: parallaxY,
          background: 'linear-gradient(120deg, rgba(59,130,246,0.07) 0%, rgba(168,85,247,0.10) 100%)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, type: 'spring', stiffness: 120, damping: 18 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900 dark:text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15 }}
            viewport={{ once: true }}
          >
            Tech Stack
          </motion.h2>
          <motion.p
            className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Technologies I work with daily
          </motion.p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {TECH_CATEGORIES.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 cursor-pointer select-none ${
                  activeCategory === index
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                <category.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{category.title}</span>
                <span className="sm:hidden">{category.title.split(' ')[0]}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tech Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 120, damping: 18 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {TECH_CATEGORIES[activeCategory].items.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer select-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
                style={{
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${tech.color}20`, color: tech.color }}
                  >
                    <tech.icon />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {tech.name}
                  </h3>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Category Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            {(() => {
              const IconComponent = TECH_CATEGORIES[activeCategory].icon;
              return (
                <IconComponent 
                  className="w-6 h-6"
                  style={{ color: TECH_CATEGORIES[activeCategory].color }}
                />
              );
            })()}
            <span className="font-medium text-gray-900 dark:text-white">
              {TECH_CATEGORIES[activeCategory].title}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackCarousel; 