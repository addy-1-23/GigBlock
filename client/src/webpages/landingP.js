import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValue, animate } from 'framer-motion';
import { ChevronRight, Zap, Globe, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import ParticlesCanvas from '../components/particle'; // Import the ParticlesCanvas component

const GradientText = ({ children, className = '' }) => {
  return (
    <span className={`gradient-text ${className}`}>
      {children.split('').map((char, index) => (
        <motion.span
          key={index}
          className="gradient-text-letter"
          whileHover={{
            y: -10,
            textShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
            scale: 1.1,
          }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};


const Card = ({ icon: Icon, title, description }) => (
  <motion.div className="card" whileHover={{ y: -5 }}>
    <Icon className="card-icon" />
    <h3 className="card-title">{title}</h3>
    <p className="card-description">{description}</p>
  </motion.div>
);

const ScrollingCard = ({ title, description, backgroundImage }) => (
  <motion.div
    className="scrolling-card"
    style={{ 
      backgroundImage: `linear-gradient(rgba(234, 218, 218, 0), rgba(0, 0, 0, 0.8)), url(${backgroundImage})`,

    }}
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="scrolling-card-title">{title}</h3>
    <p className="scrolling-card-description">{description}</p>
  </motion.div>
);

const ScrollingCards = () => {
  const scrollRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (scrollRef.current) {
        setContainerWidth(scrollRef.current.offsetWidth);
      }
    };

    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);

    return () => window.removeEventListener('resize', updateContainerWidth);
  }, []);

  const opportunities = [
    { 
      title: "Singer", 
      description: "Express emotions through powerful vocals and captivating performances.",
      backgroundImage: "https://t3.ftcdn.net/jpg/03/35/61/94/360_F_335619416_FUfMwM82oomNuLVpYZDaRmqWysnldkbj.jpg"
    },
    { 
      title: "Dancer", 
      description: "Tell stories and convey emotion through graceful and dynamic movement.",
      backgroundImage: "https://imgs.search.brave.com/O_pFatsKoJzZy03W67yKC-2tVIJ1AyfTqIUt7YkoP2E/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzc0LzkxLzI4/LzM2MF9GXzE3NDkx/Mjg5OF9ZR3lESE5T/TDhiNk1GbERxWTdh/MzZTUXAzNTZHTDBM/ai5qcGc"
    },
    { 
      title: "Pianist", 
      description: "Create beautiful melodies and harmonies with the piano.",
      backgroundImage: "https://imgs.search.brave.com/jVynVawXKK0zMqTBCA4iFiC1Yvb9y_YUe4k2I47Nld8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE0LzY1Lzgz/LzM2MF9GXzIxNDY1/ODM0MF9MdXkwc0JZ/T01uSWdCUG45dUhr/MWVzSGtTZHJLUGJt/Yi5qcGc?text=piano"
    },
    { 
      title: "Guitarist", 
      description: "Strum and pick your way to musical expression and creativity.",
      backgroundImage: "https://imgs.search.brave.com/0dsRfgILZ06xL_1Ket5yNf9qSjN0fMPxUBYLQ0dC0pI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzMxLzgyLzE0/LzM2MF9GXzEzMTgy/MTQyMV9pUzh5V0xH/TUU1SmxwZzZRZDNm/WlBSS0JVbTZLRnRR/bi5qcGc?text=guitar"
    },
    { 
      title: "Animator", 
      description: "Bring characters and worlds to life through animation.",
      backgroundImage: "https://media.tenor.com/3CAcy1xJSIcAAAAe/anime-dark-boy-cool-kid.png"
    },
  ];

  const totalWidth = opportunities.length * 280; // 280px per card (including margins)

  useEffect(() => {
    const animation = animate(x, -totalWidth, {
      type: "tween",
      duration: 40,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => animation.stop();
  }, [x, totalWidth]);

  return (
    <div ref={scrollRef} className="scrolling-container">
      <motion.div className="scrolling-cards" style={{ x }}>
        {opportunities.concat(opportunities).map((opp, index) => (
          <ScrollingCard
            key={index}
            title={opp.title}
            description={opp.description}
            backgroundImage={opp.backgroundImage}
          />
        ))}
      </motion.div>
    </div>
  );
};

function App() {
  const [isDark, setIsDark] = useState(false);
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate(); 
  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  // Update mouse position
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
<div className={`app ${isDark ? 'dark' : ''}`} onMouseMove={handleMouseMove}>
<header className="header">
        <nav className="nav">
          <div className="nav-content">
            <div className="logo">
              <div className="logo-icon">
                <span>V</span>
              </div>
              <GradientText className="logo-text">VYU:</GradientText>
            </div>
            <div className="nav-links">
              <a href="#features" className="nav-link">Features</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#contact" className="nav-link">Contact</a>
              <button onClick={toggleTheme} className="theme-toggle">
                {isDark ? '🌞' : '🌙'}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" style={{ position: 'relative', height: '100vh' }}>
          <ParticlesCanvas /> {/* Add the ParticlesCanvas component here */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-background"
            style={{ position: 'relative', zIndex: 1 }} // Ensure content is above the canvas
          >
            <h1 className="hero-title">
              Welcome to <GradientText>VYU:</GradientText>
            </h1>
            <p className="hero-description">
              Bringing freelancers, gig workers, and companies together for seamless collaboration.
            </p>
            <motion.button
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')} 
            >
              Get Started <ChevronRight className="inline-icon" />
            </motion.button>
          </motion.div>
        </section>

        <section id="features" className="features">
          <div className="container">
            <h2 className="section-title">
              <GradientText>Our Features</GradientText>
            </h2>
            <div className="features-grid">
              <Card
                icon={Users}
                title="Connect"
                description="🤝 Bring together freelancers, gig workers, and companies for seamless collaboration."
              />
              <Card
                icon={Globe}
                title="Global Reach"
                description="🌍 Access a diverse pool of talent and opportunities from around the world."
              />
              <Card
                icon={Zap}
                title="Efficient Matching"
                description="⚡ Our AI-powered system ensures perfect matches for projects and skills."
              />
              <Card
                icon={TrendingUp}
                title="Career Growth"
                description="📈 Unlock new opportunities and advance your professional journey."
              />
            </div>
          </div>
        </section>

        <section className="opportunities">
          <div className="container">
            <h2 className="section-title">
              <GradientText>Explore Opportunities</GradientText>
            </h2>
            <ScrollingCards />
          </div>
        </section>

        <section id="about" className="about">
          <div className="container">
            <h2 className="section-title">
              <GradientText>About Us</GradientText>
            </h2>
            <div className="about-content">
              <div className="about-text">
                <h3 className="about-subtitle">Our Mission</h3>
                <p className="about-description">
                  We strive to create a platform that empowers freelancers, gig workers, and companies to collaborate efficiently and grow together.
                </p>
                <ul className="about-list">
                  <li className="about-list-item">
                    <TrendingUp className="about-icon" />
                    Continuous improvement in matching algorithms
                  </li>
                  <li className="about-list-item">
                    <Users className="about-icon" />
                    User-centric approach to platform design
                  </li>
                  <li className="about-list-item">
                    <Globe className="about-icon" />
                    Global accessibility for diverse opportunities
                  </li>
                </ul>
              </div>
              <div className="about-image">
                <img 
                  src="https://imgs.search.brave.com/EiO0nKbOHjx1uqDAW14hS55pjdKDsl1qgIV2b_xRi-M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y3JlYXRvcHkuY29t/L2Jsb2cvd3AtY29u/dGVudC91cGxvYWRz/LzIwMjAvMDQvY29s/bGFib3JhdGlvbi1h/bmQtY3JlYXRpdml0/eS0xLTgwMHg0MDAu/cG5n" 
                  alt="About Us" 
                  className="about-img"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container">
            <h2 className="section-title">Get in Touch</h2>
            <p className="contact-description">
              Ready to revolutionize your work experience? Join VYUHA today and unlock a world of opportunities!
            </p>
            <motion.button
              className="contact-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us <ArrowRight className="inline-icon" />
            </motion.button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;