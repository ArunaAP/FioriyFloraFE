import React from 'react'
import { DASHBOARD_SIDEBAR_BUTTON_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../lib/consts/navigation'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineLogout } from 'react-icons/hi'
import Logo from './Fioriy_Logo.jpg'

const linkClasses =
    'flex item-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar() {
    return (
        <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
            {/* Logo section */}
            <div className="flex items-center justify-center gap-2 px-1 py-1">
                <img
                    src={Logo}
                    alt="Fioriy Flora Logo"
                    className="h-20 object-cover rounded" // Adjust size as needed
                />
                    
            </div>
            
            {/* Links section */}
            <div className="flex-1 py-8 flex flex-col gap-0.5">
                {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
            </div>

            {/* Button links and Logout */}
            <div className={classNames('flex flex-col gap-0.5 pt-2 border-t border-neutral-700')}>
                {DASHBOARD_SIDEBAR_BUTTON_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}

                <div className={classNames('text-red-500 cursor-pointer', linkClasses)}>
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Logout
                </div>
            </div>
        </div>
    )
}

function SidebarLink({ item }) {
    const { pathname } = useLocation()

    return (
        <Link
            to={item.path}
            className={classNames(
                pathname == item.path ? 'bg-neutral-700 text-white' : 'text-neutral-400',
                linkClasses
            )}
        >
            <span className="text-xl">{item.icon}</span>
            {item.label}
        </Link>
    )
}
