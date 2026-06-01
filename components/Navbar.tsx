"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Home,
  Globe,
  Sun,
  Moon,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

interface NavbarProps {
  courseTitle: string;
  isDark: boolean;
  onToggleDark: () => void;
}

export default function Navbar({
  courseTitle,
  isDark,
  onToggleDark,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="h-full px-4 flex items-center justify-between gap-4">
        {/* Left section */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <button
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium shrink-0"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali</span>
          </button>

          <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 shrink-0" />

          <a
            href="https://gojags-classroom.bps.go.id/"
            className="hidden md:flex p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Home"
            target="_blank"
            rel="noreferrer"
          >
            <Home className="w-4 h-4" />
          </a>

          <div className="hidden md:block">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              <Globe className="w-4 h-4" />
              <span>ID</span>
            </button>
          </div>
        </div>

        {/* Center - Logo */}
        <a
          href="https://gojags-classroom.bps.go.id/"
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 shrink-0"
          target="_blank"
          rel="noreferrer"
        >
          {/* BPS Gojags logo */}
          <div className="h-7 w-7 rounded-full overflow-hidden bg-orange-500 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://gojags-classroom.bps.go.id/logo/06%20gojags.png"
              alt="Gojags"
              className="h-7 w-7 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            Gojags Classroom
          </span>
        </a>

        {/* Right section */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme toggle */}
          <div className="hidden md:block">
            <button
              onClick={onToggleDark}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* User badge */}
          <div className="hidden md:flex items-center gap-2 px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              B
            </div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-200 max-w-[180px] truncate">
              BPS Kab. Kepulauan Sangihe
            </span>
          </div>

          {/* Logout */}
          <button
            className="hidden md:flex p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>

          {/* Mobile menu */}
          <div className="md:hidden relative">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {mobileMenuOpen && (
              <div className="absolute top-full right-0 mt-1 w-60 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-2 z-50">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-100 dark:border-gray-800 mb-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-sm font-bold">
                    B
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">
                      BPS Kepulauan Sangihe
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Peserta Aktif
                    </p>
                  </div>
                </div>

                <button
                  onClick={onToggleDark}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {isDark ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                  <span>{isDark ? "Mode Terang" : "Mode Gelap"}</span>
                </button>

                <a
                  href="https://gojags-classroom.bps.go.id/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>Beranda</span>
                  <ChevronRight className="w-3 h-3 ml-auto text-gray-400" />
                </a>

                <div className="border-t border-gray-100 dark:border-gray-800 mt-1 pt-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
