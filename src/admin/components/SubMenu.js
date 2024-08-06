import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'



const SidebarLink = styled(Link)`
display: flex;
color:grey;
justify-content: space-between;
align-items: center;
padding:  10px;
list-style: none;
height: 40px;
text-decoration: none;
font-size: 15px;

&:hover{
    background: grey;
    cursor: pointer;
}
&:focus{
    background: grey;

    cursor: pointer;
}
`;

const SidebarLabel = styled.span`
margin-left: 12px;

`;

const DropdownLink = styled(Link)`
background: #393b3a;
height: 38px;
padding-left: 3rem;
display: flex;
align-items: center;
text-decoration: none;
color: #fff;
font-size: 15px;

&:hover {
    background: grey;
    cursor: pointer;
}
`;


const SubMenu = ({ item }) => {
    const navigate=useNavigate();
    const [subnav, setSubnav] = useState(false)

    const showSubnav = () => setSubnav(!subnav)

    const handleLogout = () => {
        localStorage.removeItem('adminData');
        localStorage.removeItem('admin_id');
        navigate('/admin')
    }

    return (
        <>
            <SidebarLink to={item.path} onClick={() => (item.subNav && showSubnav) || (item.title === 'Logout' ? handleLogout() : null)}>
                <div>
                    <span style={{ color: 'black' }}>{item.icon}</span>
                    <SidebarLabel>{item.title}</SidebarLabel>
                </div>
                <div>
                    {item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed : null}
                </div>
            </SidebarLink>
            {subnav && item.subNav.map((item, index) => {
                return (
                    <DropdownLink to={item.path} key={index}>
                        {item.icon}
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </DropdownLink>
                )

            })}
        </>
    );
};

export default SubMenu;