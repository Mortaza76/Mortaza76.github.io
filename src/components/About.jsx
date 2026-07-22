import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 160]);

  return (
    <section className="py-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          y: parallaxY,
          background: 'linear-gradient(120deg, rgba(236,72,153,0.07) 0%, rgba(59,130,246,0.10) 100%)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, type: 'spring', stiffness: 120, damping: 18 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900 dark:text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1.1, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, type: 'spring', stiffness: 120, damping: 18 }}
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6 text-center md:text-left"
        >
          <motion.h3
            className="text-3xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            AI & Data Scientist
          </motion.h3>

          <motion.p
            className="text-lg leading-relaxed text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            I'm Muhammad Ameer Mortaza — a Computer Science graduate from Ghulam Ishaq Khan Institute (GIKI), Class of 2025, with a major in Data Science and a deep passion for solving real-world problems through code, data, and innovation.<br/><br/>
            From building automated machine learning platforms to leading nationwide tech and sports initiatives, I thrive at the crossroads of technology, leadership, and impact. My journey includes crafting Kafka-based data pipelines, developing AI-powered prediction systems, and creating dynamic dashboards using tools like Power BI and Streamlit.<br/><br/>
            I specialize in Data Engineering, Machine Learning, Artificial Intelligence, and Deep Learning, working with technologies such as Python, FastAPI, SQL, Docker, H2O.ai, and Apache Spark. But beyond the tech, I take pride in driving collaboration — whether it's mentoring junior peers, managing cross-functional teams, or hosting large-scale events like ICPC and inter-university tournaments.<br/><br/>
            Off the screen, I'm an avid football enthusiast and a firm believer in the power of sports analytics and data-driven decision-making — both in business and in life.<br/><br/>
            I'm focused on building intelligent systems that make life smarter, more efficient, and more human — and this is only the beginning.
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/cv.pdf"
              download
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl glass cursor-pointer select-none relative overflow-hidden text-white"
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 12px 32px 0 rgba(0,0,0,0.25), 0 0 16px 4px #60a5fa99' }}
              whileTap={{ scale: 0.95 }}
              data-interactive="true"
              style={{
                boxShadow: '0 4px 24px 0 rgba(0,0,0,0.06)',
              }}
            >
              <span className="relative z-10">Download CV</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
