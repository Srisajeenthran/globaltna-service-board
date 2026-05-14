'use client';

import Link from 'next/link';
import { Briefcase, LogOut, User as UserIcon, Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-indigo-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-200 shadow-indigo-200 shadow-lg">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight ml-1">ServiceBoard</span>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link href="/jobs/new">
                      <Button size="sm" className="hidden sm:flex">
                        <Plus className="h-4 w-4 mr-1" />
                        Post a Job
                      </Button>
                      <Button size="sm" className="sm:hidden flex h-9 w-9 p-0 rounded-full">
                        <Plus className="h-5 w-5" />
                      </Button>
                    </Link>
                    <div className="h-6 w-px bg-gray-200 mx-2" />
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                        <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center">
                          <UserIcon className="h-3.5 w-3.5 text-indigo-600" />
                        </div>
                        <span className="hidden sm:inline text-sm font-semibold text-gray-700">{user.name}</span>
                      </div>
                      <button
                        onClick={logout}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                        title="Logout"
                      >
                        <LogOut className="h-5 w-5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="ghost" size="sm">Login</Button>
                    </Link>
                    <Link href="/register">
                      <Button size="sm">Sign Up</Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
