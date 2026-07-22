import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendForm } from '@emailjs/browser';
import { Check, Copy, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { profile, socialLinks } from '../../data/content';
import { Button, GlassPanel, SectionHeading } from '../ui/Primitives';

const iconMap = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  Email: Mail,
};

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    sendForm('service_lza38zh', 'template_pjy1ncs', formRef.current, 'E-liz-zoKMIdSLKFE')
      .then(() => {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch(() => setSubmitStatus('error'))
      .finally(() => setIsSubmitting(false));
  };

  const fieldClass =
    'w-full rounded-panel border border-white/10 bg-void/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-ink-faint focus:border-cyan/50 focus:shadow-cyan-sm';

  return (
    <section id="contact" className="relative z-10 py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="06 · Uplink"
          title="Let's Connect"
          description="Open a channel — projects, roles, collaborations, or systems that need to ship."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <GlassPanel className="p-5" hud>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
                Direct Line
              </p>
              <button
                type="button"
                onClick={copyEmail}
                className="mt-3 flex w-full items-center justify-between gap-3 rounded-panel border border-white/10 bg-void/40 px-4 py-3 text-left transition hover:border-cyan/30"
                data-cursor="hover"
                aria-label="Copy email address"
              >
                <span className="truncate text-sm text-white">{profile.email}</span>
                {copied ? <Check size={16} className="text-emerald" /> : <Copy size={16} className="text-cyan" />}
              </button>
              <AnimatePresence>
                {copied && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 font-mono text-xs text-emerald"
                  >
                    Email copied to clipboard
                  </motion.p>
                )}
              </AnimatePresence>
            </GlassPanel>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.name] || Mail;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    data-cursor="hover"
                  >
                    <GlassPanel className="p-4 transition group-hover:border-cyan/30" hover={false}>
                      <Icon size={18} className="text-cyan" />
                      <p className="mt-3 text-sm font-medium text-white">{link.name}</p>
                      <p className="mt-1 truncate text-xs text-ink-muted">{link.handle}</p>
                    </GlassPanel>
                  </a>
                );
              })}
            </div>
          </div>

          <GlassPanel className="p-6 sm:p-8" accent="violet">
            <h3 className="font-display text-xl text-white">Send a message</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                    Name
                  </span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={fieldClass}
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={fieldClass}
                    placeholder="you@company.com"
                    required
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                  Subject
                </span>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="What should we build?"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                  Message
                </span>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`${fieldClass} resize-none`}
                  placeholder="Share context, goals, timeline..."
                  required
                />
              </label>

              <div className="pt-2">
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? 'Transmitting...' : 'Send Message'}
                </Button>
              </div>

              <AnimatePresence>
                {submitStatus && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`rounded-panel border px-4 py-3 text-sm ${
                      submitStatus === 'success'
                        ? 'border-emerald/30 bg-emerald/10 text-emerald'
                        : 'border-red-400/30 bg-red-500/10 text-red-300'
                    }`}
                    role="status"
                  >
                    {submitStatus === 'success'
                      ? 'Message sent successfully. I will get back to you soon.'
                      : 'Transmission failed. Please try again or email me directly.'}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
