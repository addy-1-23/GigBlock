import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 

import { MessageCircle, Settings, Home, FileText, Link, User } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
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
`;

const Main = styled.main`
  margin-left: 240px;
  padding: 24px;
  width: calc(100% - 240px);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 16px;
  padding: 0 24px;
  align-items: center;
`;

const SearchBar = styled.input`
  width: calc(100% - 150px);
  padding: 12px 16px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  outline: none;
  font-size: 16px;
  background-color: #ffffff;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
  }
`;

const AddProfileButton = styled.button`
  width: 150px;
  padding: 12px;
  background-color: #333333;
  color: #e0e0e0;
  border: none;
  cursor: pointer;
  margin-left: 16px;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #555555;
  }
`;

const App = () => {
  const navigate = useNavigate(); 
  const handleAddJobClick = () => {
    navigate("/contract/addJob"); 
  };

  return (
    <Container>
      {/* Sidebar */}
      <Sidebar>
        <SidebarLogo>
          <LogoIcon>V</LogoIcon>
          <span>Vyuha</span>
        </SidebarLogo>
        <AddButton onClick={handleAddJobClick}>Add Job</AddButton>
        <NavSection>
          <NavLabel>PAGES</NavLabel>
          {[{ icon: Home, label: 'Home' }, { icon: FileText, label: 'Contract' }, { icon: Link, label: 'Connect' }, { icon: User, label: 'Profile' }, { icon: MessageCircle, label: 'Chat' }, { icon: Settings, label: 'Settings' }].map((item) => (
            <NavButton key={item.label} style={{ backgroundColor: item.label === 'Contract' ? '#3b82f6' : 'transparent' }}>
              <item.icon size={20} />
              {item.label}
            </NavButton>
          ))}
        </NavSection>
      </Sidebar>

      {/* Main Content */}
      <Main>
        
        <SearchBarContainer>
          <SearchBar
            type="text"
            placeholder="Search..."
          />
          <AddProfileButton onClick={handleAddJobClick}>New Job</AddProfileButton>
        </SearchBarContainer>

      </Main>
    </Container>
  );
};

export default App;
