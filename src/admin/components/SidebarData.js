import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';



export const SidebarData = [
    {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: < FaIcons.FaWrench />,
},
{
    title: 'Logout',
    path: '/',
    icon: <AiIcons.AiOutlineArrowLeft /> 
},
];