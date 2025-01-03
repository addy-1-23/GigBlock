import React, { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Zap, Globe, Users, TrendingUp } from 'lucide-react';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f8f9fa;
    color: #333;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

const GradientText = styled.span`
  background-clip: text;
  color: transparent;
  background-image: linear-gradient(to right, #6b46c1, #4299e1);
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  background: #000;
  color: #fff;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 0.5rem;
`;

const NavLink = styled.a`
  color: #333;
  margin: 0 0.5rem;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    color: #6b46c1;
  }
`;

const ThemeButton = styled.button`
  background: #e2e8f0;
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #cbd5e0;
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(to bottom, #edf2f7, #fff);
`;

const HeroButton = styled(motion.button)`
  background: linear-gradient(to right, #6b46c1, #4299e1);
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const Section = styled.section`
  padding: 4rem 2rem;
  background: ${props => (props.bg ? props.bg : 'transparent')};
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const Card = styled(motion.div)`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const ScrollingCardsContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem;
  scroll-snap-type: x mandatory;
  & > * {
    scroll-snap-align: center;
  }
`;

const ScrollingCard = styled(motion.div)`
  flex: 0 0 300px;
  height: 400px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  text-align: center;
  background-image: ${props => `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${props.background})`};
  background-size: cover;
  background-position: center;
`;

export default function GigBlock() {
  const [isDark, setIsDark] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div>
      <GlobalStyle />
      <Header>
        <Nav>
          <LogoContainer>
            <Logo>G</Logo>
            <GradientText>GigBlock</GradientText>
          </LogoContainer>
          <div>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <ThemeButton onClick={toggleTheme}>{isDark ? '🌞' : '🌙'}</ThemeButton>
          </div>
        </Nav>
      </Header>

      <main>
        <HeroSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Welcome to <GradientText>GigBlock</GradientText>
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Bringing freelancers, gig workers, and companies together for seamless collaboration using blockchain technology.
            </p>
            <HeroButton as="a" href="/login" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  Get Started <ChevronRight />
</HeroButton>
          </motion.div>
        </HeroSection>

        <Section id="about">
          <SectionTitle>
            <GradientText>About Us</GradientText>
          </SectionTitle>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3>Our Mission</h3>
              <p>GigBlock aims to empower gig workers and companies by bridging the gap with innovative blockchain technology.</p>
            </div>
            <ul>
              <li>🚀 Empowering freelancers and gig workers worldwide.</li>
              <li>🔒 Ensuring secure, trustworthy transactions.</li>
              <li>📊 Data-driven insights for better collaboration.</li>
              <li>🌟 User-centric design for an intuitive experience.</li>
            </ul>
          </div>
        </Section>

        <Section bg="#f8f9fa">
          <SectionTitle>
            <GradientText>Explore Opportunities</GradientText>
          </SectionTitle>
          <ScrollingCardsContainer>
            <ScrollingCard background="https://via.placeholder.com/300x400?text=Web+Development">
              <h3>Web Development</h3>
              <p>Create stunning websites and web applications using modern technologies.</p>
            </ScrollingCard>
            <ScrollingCard background="https://via.placeholder.com/300x400?text=Mobile+Apps">
              <h3>Mobile Apps</h3>
              <p>Build innovative iOS and Android apps reaching millions of users.</p>
            </ScrollingCard>
            <ScrollingCard background="https://via.placeholder.com/300x400?text=UI/UX+Design">
              <h3>UI/UX Design</h3>
              <p>Design intuitive interfaces and seamless user experiences.</p>
            </ScrollingCard>
            <ScrollingCard background="https://via.placeholder.com/300x400?text=Data+Analysis">
              <h3>Data Analysis</h3>
              <p>Extract insights from complex data to drive business decisions.</p>
            </ScrollingCard>
            <ScrollingCard background="https://via.placeholder.com/300x400?text=Cloud+Solutions">
              <h3>Cloud Solutions</h3>
              <p>Implement scalable cloud architectures for optimal performance.</p>
            </ScrollingCard>
          </ScrollingCardsContainer>
        </Section>

        <Section id="features">
          <SectionTitle>
            <GradientText>Our Features</GradientText>
          </SectionTitle>
          <CardsGrid>
            <Card whileHover={{ y: -5 }}>
              <Users />
              <h3>Connect</h3>
              <p>Bring together freelancers, gig workers, and companies for seamless collaboration.</p>
            </Card>
            <Card whileHover={{ y: -5 }}>
              <Globe />
              <h3>Global Reach</h3>
              <p>Access a diverse pool of talent and opportunities from around the world.</p>
            </Card>
            <Card whileHover={{ y: -5 }}>
              <Zap />
              <h3>Efficient Matching</h3>
              <p>AI-powered system ensures perfect matches for projects and skills.</p>
            </Card>
            <Card whileHover={{ y: -5 }}>
              <TrendingUp />
              <h3>Career Growth</h3>
              <p>Unlock new opportunities and advance your professional journey.</p>
            </Card>
          </CardsGrid>
        </Section>
      </main>
    </div>
  );
}
