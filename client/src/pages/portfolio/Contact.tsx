// File: client/src/pages/portfolio/Contact.tsx

import React, { useState } from 'react';
import SectionWrapper from '../../components/portfolio/common/SectionWrapper';
import styles from '../../assets/css/portfolio/pageStyles/Home.module.css';
import formStyles from '../../assets/css/portfolio/common/Form.module.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      alert('Message sent successfully!');
      setFormData({ name: '', subject: '', message: '' });
    } catch (err) {
      alert('There was an error sending your message.');
    }
  };

  return (
    <SectionWrapper>
      <h1 className={styles.heading}>Contact Me</h1>
      <form onSubmit={handleSubmit} className={formStyles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.resumeButton}>
          Send Message
        </button>
      </form>
    </SectionWrapper>
  );
};

export default Contact;
