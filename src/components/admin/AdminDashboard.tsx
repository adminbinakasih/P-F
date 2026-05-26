'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, Mail, Image, MessageSquare,
  Settings, LogOut, Menu, Search, Bell, X
} from 'lucide-react'
import AdminStats from './AdminStats'
import AdminGuests from './AdminGuests'
import AdminInvitations from './AdminInvitations'
import AdminWishes from './AdminWishes'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'invitations', label: 'Undangan', icon: Mail },
  { id: 'guests', label: 'Tamu', icon: Users },
  { id: 'wishes', label: 'Ucapan', icon: MessageSquare },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen flex" style={{ background: '#EAE4D5', fontFamily: 'var(--font-poppins)' }}>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'w-60' : 'w-16'
      } ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ background: '#1A1410', borderRight: '1px solid rgba(138,117,96,0.3)' }}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b" style={{ borderColor: 'rgba(138,117,96,0.2)' }}>
          <div className="w-9 h-9 rounded-full bg-[#D4CDB8] border-2 border-[#8A7560] flex items-center justify-center flex-shrink-0">
            <span className="text-[#1A1410] text-sm font-bold" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>PF</span>
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="text-[#F5F0E8] text-sm font-semibold truncate">Pieter & Febry</p>
              <p className="text-[#8A7560] text-[10px] truncate">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileOpen(false) }}
                className={`w-full flex items-center gap-3 px-3 py-3 transition-all duration-200 ${
                  isActive
                    ? 'bg-[#D4CDB8] text-[#1A1410]'
                    : 'text-[#8A7560] hover:text-[#D4CDB8] hover:bg-white/5'
                }`}
              >
                <Icon size={16} className="flex-shrink-0" />
                {sidebarOpen && (
                  <span className="text-xs font-semibold tracking-wide truncate">{item.label}</span>
                )}
                {isActive && sidebarOpen && (
                  <div className="ml-auto w-1 h-4 bg-[#8A7560] rounded-full" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="p-2 border-t" style={{ borderColor: 'rgba(138,117,96,0.2)' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-[#8A7560] hover:text-[#D4CDB8] transition-colors"
          >
            <Menu size={16} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-xs font-medium">Tutup Sidebar</span>}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-[#1A1410]/70 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'md:ml-60' : 'md:ml-16'}`}>

        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 sticky top-0 z-30 border-b"
          style={{ background: '#F5F0E8', borderColor: 'rgba(138,117,96,0.25)' }}>
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-[#3D2E1E]">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div className="hidden md:flex items-center gap-2 bg-[#EAE4D5] border border-[#CCC6B1] px-3 py-2 w-56">
              <Search size={13} className="text-[#8A7560]" />
              <input placeholder="Cari..." className="bg-transparent text-[#1A1410] text-xs outline-none flex-1 placeholder:text-[#8A7560] font-medium" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-[#8A7560] hover:text-[#3D2E1E] transition-colors">
              <Bell size={16} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#B76E79] rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#3D2E1E] border-2 border-[#8A7560] flex items-center justify-center">
              <span className="text-[#F5F0E8] text-xs font-bold">A</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'dashboard' && <AdminStats />}
              {activeTab === 'invitations' && <AdminInvitations />}
              {activeTab === 'guests' && <AdminGuests />}
              {activeTab === 'wishes' && <AdminWishes />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
