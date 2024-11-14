import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import classNames from 'classnames'
import React from 'react'
import { HiOutlineBell, HiOutlineChatAlt, HiOutlineSearch } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate()

    return (
        <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200">
            <div className="relative">
                <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3" />
                <input
                    type="text"
                    placeholder="Search.."
                    className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 pr-4"
                />
            </div>
            <div className="flex items-center gap-2 mr-2">
                <HiOutlineChatAlt fontSize={24} />
                <HiOutlineBell fontSize={24} />

                <Menu as="div" className="relative">
                    <MenuButton className="ml-2 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
                        <span className="sr-only">open user menu</span>
                        <div
                            className="h-10 w-10 rounded-full bg-cover bg-no-repeat bg-center"
                            style={{
                                backgroundImage:
                                    'url("https://as2.ftcdn.net/v2/jpg/06/20/41/55/1000_F_620415503_nwuRSJY7WE9bkwxEuo8F9BoGthLRvdb4.jpg")'
                            }}
                        >
                            <span className="sr-only">Aruna Priyankara</span>
                        </div>
                    </MenuButton>
                    <MenuItems className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem>
                            {({ active }) => (
                                <div
                                    className={classNames(
                                        active && 'bg-gray-100',
                                        'text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2'
                                    )}
                                    onClick={() => navigate('/profile')}
                                >
                                    Your Profile
                                </div>
                            )}
                        </MenuItem>
                        <MenuItem>
                            {({ active }) => (
                                <div
                                    className={classNames(
                                        active && 'bg-gray-100',
                                        'text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2'
                                    )}
                                    onClick={() => navigate('/settings')}
                                >
                                    Settings
                                </div>
                            )}
                        </MenuItem>
                        <MenuItem>
                            {({ active }) => (
                                <div
                                    className={classNames(
                                        active && 'bg-gray-100',
                                        'text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2'
                                    )}
                                    onClick={() => navigate('/logout')}
                                >
                                    Logout
                                </div>
                            )}
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
        </div>
    )
}
