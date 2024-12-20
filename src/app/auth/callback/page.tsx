import { onAuthUser } from '@/actions/user'
import { redirect } from 'next/navigation'

export default async function AuthCallbackPage() {
  const auth = await onAuthUser()
  console.log("Auth result:", auth)
  
  if (auth.status === 200 || auth.status === 201) {
    const workspaceId = auth.user?.workspace[0]?.id
    if (!workspaceId) {
      // If no workspace, show error instead of redirecting
      return <div>No workspace found. Please contact support.</div>
    }
    redirect(`/dashboard/${workspaceId}`)
  }

  if (auth.status === 403) {
    redirect('/auth/sign-in')
  }

  // For any other status, show an error
  return <div>Authentication failed. Please try again.</div>
}
