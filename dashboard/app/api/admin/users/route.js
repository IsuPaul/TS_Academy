import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const VALID_ROLES = new Set(['staff', 'manager', 'admin'])

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !secret) throw new Error('Server-side Supabase configuration is missing.')
  return createClient(url, secret, { auth: { autoRefreshToken: false, persistSession: false } })
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization') || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
    if (!token) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })

    const body = await request.json()
    const email = String(body?.email || '').trim().toLowerCase()
    const role = String(body?.role || 'staff').trim().toLowerCase()
    if (!email || !email.includes('@')) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
    if (!VALID_ROLES.has(role)) return NextResponse.json({ error: 'Invalid dashboard role.' }, { status: 400 })

    const admin = adminClient()
    const { data: authData, error: authError } = await admin.auth.getUser(token)
    if (authError || !authData?.user) return NextResponse.json({ error: 'Your session is invalid or has expired.' }, { status: 401 })

    const caller = authData.user
    const { data: profile, error: profileError } = await admin.from('profiles').select('role').eq('id', caller.id).single()
    if (profileError || profile?.role !== 'admin') return NextResponse.json({ error: 'Administrator access required.' }, { status: 403 })

    const redirectTo = new URL('/?setup=password', request.url).toString()
    const { data: inviteData, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, { redirectTo })
    if (inviteError) return NextResponse.json({ error: inviteError.message }, { status: 400 })

    const newUser = inviteData?.user
    if (!newUser?.id) return NextResponse.json({ error: 'Supabase did not return the invited user.' }, { status: 500 })

    const { error: insertError } = await admin.from('profiles').insert({ id: newUser.id, email, role })
    if (insertError) {
      await admin.auth.admin.deleteUser(newUser.id)
      return NextResponse.json({ error: `User profile could not be created: ${insertError.message}` }, { status: 500 })
    }

    return NextResponse.json({ ok: true, user: { id: newUser.id, email, role }, message: 'User invited successfully.' })
  } catch (error) {
    return NextResponse.json({ error: error?.message || 'Unable to create user.' }, { status: 500 })
  }
}
