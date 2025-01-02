import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import { MessageCircle, Settings, Home, FileText, Link, User } from 'lucide-react';


const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
`;

const Sidebar = styled.aside`
  width: 240px;
  background-color: #000000;
  color: #ffffff;
  padding: 24px;
  height: 100vh;
  position: fixed;
  overflow-y: auto;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
`;

const SidebarLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
  font-size: 30px;
  font-weight: 600;
`;


const LogoIcon = styled.div`
  width: 70px;
  height: 70px;
  background-color: #000000;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 600;
  margin-left: 20px;
`;


const AddButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #343840;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 24px;
  transition: background-color 0.2s;
`;


const NavSection = styled.nav`
  margin-bottom: 24px;
`;


const NavLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 12px;
  font-weight: 600;
  letter-spacing: 1px;
`;


const NavButton = styled.button`
  width: 100%;
  padding: 10px 12px;
  background-color: transparent;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  transition: background-color 0.2s;
  height: 50px;
  font-size: 16px;
  outline: none;

  &:hover {
    background-color: #2044b4;
  }

  &.active {
    background-color: #3b82f6;
  }
`;

const navigate = useNavigate(); 

  const handleContract = () => {
    navigate("/contract"); 
  };
  const handleConnect = () => {
    navigate("/connect"); 
  };

const App = () => {
  return (
    <Container>
      <Sidebar>
        <SidebarLogo>
          <LogoIcon>V</LogoIcon>
          <span>Vyuha</span>
        </SidebarLogo>
        <AddButton>Add</AddButton>
        <NavSection>
          <NavLabel>PAGES</NavLabel>
          {[
            { icon: Home, label: 'Home' },
            { icon: FileText, label: 'Contract', onClick: handleContract },
            { icon: Link, label: 'Connect', onClick: handleConnect },
            { icon: User, label: 'Profile' },
            { icon: MessageCircle , label: 'Chat' },
            { icon: Settings , label: 'Settings' },
          ].map((item) => (
            <NavButton
              key={item.label}
              className={item.label === 'Profile' ? 'active' : ''}
            >
              <item.icon size={20} />
              {item.label}
            </NavButton>
          ))}
        </NavSection>
      </Sidebar>
    </Container>
  );
};

export default App;
