import { getUser } from '@/lib/dal'
import { logout } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function DashboardPage() {
  const user = await getUser()

  return (
    <div className="container mx-auto py-16 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Welcome back, {user?.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Email: {user?.email}</p>
          <form action={logout}>
            <Button type="submit" variant="outline">
              Sign out
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
