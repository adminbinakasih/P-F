import AdminAuth from '@/components/admin/AdminAuth'

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function AdminPage() {
  return <AdminAuth />
}
