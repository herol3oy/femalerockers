import { createClient } from '@/lib/supabase/server'

export async function Discover() {
  const supabase = await createClient()
  const { data: users } = await supabase.from('users_table').select()

  return <pre>{JSON.stringify(users, null, 2)}</pre>
}



import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Discover />
    </Suspense>
  )
}