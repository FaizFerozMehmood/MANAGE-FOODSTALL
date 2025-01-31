import React, { useState, Fragment } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross2 } from 'react-icons/rx';

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    Cookies.remove("userRole");
    Cookies.remove("userToken");
    Cookies.remove("userName");
    navigate("/");
  };

  return (
    <div>
      {/* Mobile Sidebar Navigation */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-6 justify-between items-center">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <button
                    type="button"
                    className="p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <RxCross2 className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6 flex flex-col">
                  <Link to="/dashboard" className="text-sm font-medium text-gray-900">Dashboard</Link>
                  <Link to="/add-user" className="text-sm font-medium text-gray-900">Add User</Link>
                  <Link to="/reports" className="text-sm font-medium text-gray-900">Download Reports</Link>
                  <Link to="/users" className="text-sm font-medium text-gray-900">Users</Link>
                  <button onClick={handleLogOut} className="text-sm font-medium text-red-600">Logout</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Header Navigation */}
      <header className="bg-white shadow-md">
        <nav className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 text-gray-400"
              onClick={() => setOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {/* Logo */}
            <div className="text-1xl font-bold text-black text-center w-full lg:w-auto">Food Management System</div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-6">
              <Link to="/dashboard" className="text-sm font-medium text-gray-700">Dashboard</Link>
              <Link to="/add-user" className="text-sm font-medium text-gray-700">Add User</Link>
              <Link to="/reports" className="text-sm font-medium text-gray-700">Download Reports</Link>
              <Link to="/users" className="text-sm font-medium text-gray-700">Users</Link>
              <button onClick={handleLogOut} className="text-sm font-medium text-red-600">Logout</button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;