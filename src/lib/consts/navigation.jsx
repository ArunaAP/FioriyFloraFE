import { HiOutlineCog, HiOutlineShoppingCart, HiOutlineUsers, HiOutlineViewGrid } from "react-icons/hi";
import {  PiFlowerTulipBold } from "react-icons/pi";

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/',
        icon: <HiOutlineViewGrid/>
    },
    {
        key: 'flowers',
        label: 'Flowers',
        path: '/flowers',
        icon: <PiFlowerTulipBold/>
    },
    {
        key: 'orders',
        label: 'Orders',
        path: '/orders',
        icon: <HiOutlineShoppingCart/>
    },
    {
        key: 'customers',
        label: 'Customers',
        path: '/customers',
        icon: <HiOutlineUsers/>
    },
]

export const DASHBOARD_SIDEBAR_BUTTON_LINKS=[
    {
        key: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: <HiOutlineCog/>
    }
]