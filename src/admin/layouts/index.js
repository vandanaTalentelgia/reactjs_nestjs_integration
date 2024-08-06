import React, { useState } from 'react';
import { IconContext } from 'react-icons/lib';
import { createContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import ReactSwitch from 'react-switch';
import { SidebarData } from '../components/SidebarData';
import SubMenu from '../components/SubMenu';
import '../css/styles.css';
const Nav = styled.div`
height: 50px;
display: flex;
justify-contents: flex-start;
align-items: center;
color: #fff;

`;

const NavIcon = styled(Link)`
margin-left: 2rem;
margin-right: 2rem;
font-size: 1rem;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;
const SidebarNav = styled.nav`
 width: 240px;
 height: 100vh;  
 display: flex;
 justify-content: center;
 position: fixed;
 top: 10;
 left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
 transition: 350ms;
 z-index: 10;
 `;

const SidebarWrap = styled.div`
 width: 100%;
 `;

export const ThemeContext = createContext(null);
const Layout = (component) => {
  const [sidebar, setSidebar] = useState(true)
  const showSidebar = () => setSidebar(!sidebar)
  const [theme, setTheme] = useState("dark");

  return (
    <div class="container-fluid">
        <div className="row">
          <div className="col-md-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
            <Nav id={theme}>

              <NavIcon to='#'>
                <FaIcons.FaBars onClick={showSidebar} />
              </NavIcon>
              <h4 className='col-md-10'>Admin Section</h4>
              {/* <ReactSwitch className="bar col-md-1" onChange={()=>toggleTheme()} checked={theme === "light"} /> */}

            </Nav>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 sidebar-admin">
            <SidebarNav sidebar={sidebar} id={theme} >
              <SidebarWrap>
                {SidebarData.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
                })}
              </SidebarWrap>
            </SidebarNav>
          </div>
          <div className="col-md-10 mt-5" id={theme}>
            {component}
          </div>
        </div>
    </div>
  );
}

export default Layout;
