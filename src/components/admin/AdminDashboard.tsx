'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, Mail, Image, MessageSquare,
  Settings, LogOut, TrendingUp, Eye, CheckCircle, XCircle,
  BarChart3, Plus, Search, Download, Bell, Menu, X
} from 'lucide-react'
import AdminStats from './AdminStats'
import AdminGuests from './AdminGuests'
import AdminInvitations from './AdminInvitations'
import AdminWishes from './AdminWishes'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'invitations', label: 'Invitations', icon: Mail },
  { id: 'guests', label: 'Guests', icon: Users },
  { id: 'wishes', label: 'Wishes', icon: MessageSquare },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#080808] flex" style={{ fontFamily: 'var(--font-poppins)' }}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-16'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ background: '#0D0D0D', borderRight: '1px solid rgba(201,168,76,0.08)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-white/5">
          <div className="w-8 h-8 rounded-full bg-[#CCC6B1]/10 border border-[#CCC6B1]/30 flex items-center justify-center flex-shrink-0">
            <span className="text-[#CCC6B1] text-sm" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>EV</span>
          </div>
          {sidebarOpen && (
            <span className="text-white/80 text-sm font-medium truncate">Eternal Vows</span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileOpen(false) }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-[#CCC6B1]/10 text-[#CCC6B1]'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`}
              >
                <Icon size={16} className="flex-shrink-0" />
                {sidebarOpen && (
                  <span className="text-xs tracking-wide truncate">{item.label}</span>
                )}
                {isActive && sidebarOpen && (
                  <div className="ml-auto w-1 h-4 bg-[#CCC6B1] rounded-full" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="p-2 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-white/30 hover:text-red-400/70 transition-colors rounded-sm">
            <LogOut size={16} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-xs">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
        {/* Top bar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#0A0A0A] sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => { setSidebarOpen(!sidebarOpen); setMobileOpen(!mobileOpen) }}
              className="text-white/40 hover:text-white/70 transition-colors"
            >
              <Menu size={18} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/8 px-3 py-2 rounded-sm w-64">
              <Search size={13} className="text-white/30" />
              <input
                placeholder="Search..."
                className="bg-transparent text-white/60 text-xs outline-none flex-1 placeholder:text-white/20"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-white/40 hover:text-white/70 transition-colors">
              <Bell size={16} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#CCC6B1] rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#CCC6B1]/30 to-[#B76E79]/30 border border-[#CCC6B1]/20 flex items-center justify-center">
              <span className="text-[#CCC6B1] text-xs font-medium">A</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && <AdminStats />}
              {activeTab === 'invitations' && <AdminInvitations />}
              {activeTab === 'guests' && <AdminGuests />}
              {activeTab === 'wishes' && <AdminWishes />}
              {activeTab === 'gallery' && <AdminGalleryPlaceholder />}
              {activeTab === 'settings' && <AdminSettingsPlaceholder />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

function AdminGalleryPlaceholder() {
  return (
    <div className="text-center py-20">
      <Image size={40} className="text-[#CCC6B1]/30 mx-auto mb-4" />
      <p className="text-white/40 text-sm">Gallery management coming soon</p>
    </div>
  )
}

function AdminSettingsPlaceholder() {
  return (
    <div className="text-center py-20">
      <Settings size={40} className="text-[#CCC6B1]/30 mx-auto mb-4" />
      <p className="text-white/40 text-sm">Settings panel coming soon</p>
    </div>
  )
}
