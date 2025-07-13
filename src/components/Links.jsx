import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope,
  FaWhatsapp
} from 'react-icons/fa';
import { sendForm } from '@emailjs/browser';
import useDarkMode from '../hooks/useDarkMode';

const SpotifyPlayer = () => {
  const [visible, setVisible] = useState(true);
  return visible ? (
    <motion.div
      className="fixed bottom-6 right-6 z-50 bg-black/80 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md p-2 flex flex-col items-end"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5 }}
      style={{ width: 340, maxWidth: '90vw' }}
    >
      <button
        className="btn mb-1 mr-1 text-white/60 hover:text-white text-xs px-2 py-0.5 rounded bg-white/10"
        onClick={() => setVisible(false)}
        aria-label="Close Spotify Player"
      >✕</button>
      <iframe
        title="Spotify Playlist"
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator"
        width="320"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-xl"
        style={{ border: 0 }}
      />
    </motion.div>
  ) : null;
};

const Links = () => {
  const { isDark } = useDarkMode();
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  
  // Parallax effect for Links background
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1400], [0, 280]);

  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/Mortaza76',
      color: 'hover:text-gray-400',
      bgColor: 'hover:bg-gray-800'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/ameer-mortaza-6116512b7/',
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-900/20'
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      url: 'mailto:mortazaameer8@gmail.com',
      color: 'hover:text-purple-400',
      bgColor: 'hover:bg-purple-900/20'
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      url: 'https://wa.me/923205000644',
      color: 'hover:text-green-400',
      bgColor: 'hover:bg-green-900/20'
    }
  ];

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
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // EmailJS configuration
    const serviceId = 'service_lza38zh';
    const templateId = 'template_pjy1ncs';
    const publicKey = 'E-liz-zoKMIdSLKFE';

    sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => {
        console.log('SUCCESS!', result.text);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch((error) => {
        console.log('FAILED...', error.text);
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section className="py-20 relative overflow-hidden select-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Video Backgrounds with Smooth Transition */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          src="/white3.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/white3-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: isDark ? 0 : 1, transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1)' }}
        />
        <video
          src="/dark3.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/dark3-poster.jpg"
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
          background: 'linear-gradient(120deg, rgba(236,72,153,0.07) 0%, rgba(59,130,246,0.10) 100%)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, type: 'spring', stiffness: 120, damping: 18 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Get in touch and let's build something amazing together
          </p>
        </motion.div>

        {/* Social Links Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          <AnimatePresence>
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="group relative rounded-2xl p-6 text-center cursor-pointer select-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg"
                whileHover={{ 
                  y: -8,
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 120, damping: 18 }
                }}
                whileTap={{ scale: 0.95 }}
                data-interactive="true"
              >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Icon */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white text-3xl transition-all duration-300 group-hover:bg-gray-300 dark:group-hover:bg-gray-700 ${link.color}`}>
                    <link.icon />
                  </div>
                  {/* Label */}
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {link.name}
                  </h3>
                </div>
                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border border-gray-200 dark:border-gray-700 group-hover:border-blue-400 transition-colors duration-300" />
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="glass rounded-2xl p-8 select-none">
            <h3 className="text-2xl font-bold text-white dark:text-gray-100 mb-6 text-center">
              Send me a message
            </h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 cursor-text select-none"
                    placeholder="Your name"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 cursor-text select-none"
                    placeholder="your@email.com"
                    required
                  />
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 cursor-text select-none"
                  placeholder="What's this about?"
                  required
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none cursor-text select-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </motion.div>
              
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer select-none ${
                    isSubmitting 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.05, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                  data-interactive="true"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
                
                {/* Success/Error Messages */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-3 rounded-lg text-sm font-medium ${
                      submitStatus === 'success'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}
                  >
                    {submitStatus === 'success' 
                      ? 'Message sent successfully! I\'ll get back to you soon.' 
                      : 'Failed to send message. Please try again or contact me directly.'
                    }
                  </motion.div>
                )}
              </motion.div>
            </form>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-gray-400 dark:text-gray-500">
            © 2024 Ameer Mortaza. All rights reserved.
          </p>
        </motion.div>
      </div>
      <SpotifyPlayer />
    </section>
  );
};

export default Links; 