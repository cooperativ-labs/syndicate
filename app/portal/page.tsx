import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@src/components/ui/card';
import { Link2, Mail } from 'lucide-react';

export default function PortalPage() {
  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <Card className='w-full max-w-2xl'>
        <CardHeader className='text-center'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
            <Link2 className='h-8 w-8 text-primary' />
          </div>
          <CardTitle className='text-3xl font-bold'>Access Your Offerings</CardTitle>
          <CardDescription className='text-base'>
            To view your investment offerings, please contact your syndicator for a direct link.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='rounded-lg border bg-muted/50 p-6'>
            <h3 className='mb-4 text-lg font-semibold'>How to get access:</h3>
            <ol className='space-y-4'>
              <li className='flex gap-4'>
                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold'>
                  1
                </div>
                <div>
                  <p className='font-medium'>Contact your syndicator</p>
                  <p className='text-sm text-muted-foreground'>
                    Reach out to the person or organization managing your investment opportunities.
                  </p>
                </div>
              </li>
              <li className='flex gap-4'>
                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold'>
                  2
                </div>
                <div>
                  <p className='font-medium'>Request your portal link</p>
                  <p className='text-sm text-muted-foreground'>
                    Ask them to provide you with a personalized link to view your offerings.
                  </p>
                </div>
              </li>
              <li className='flex gap-4'>
                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold'>
                  3
                </div>
                <div>
                  <p className='font-medium'>Access your investments</p>
                  <p className='text-sm text-muted-foreground'>
                    Once you receive the link, you'll be able to view and manage your investment
                    opportunities.
                  </p>
                </div>
              </li>
            </ol>
          </div>
          <div className='flex flex-col gap-3 rounded-lg border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-center gap-3'>
              <Mail className='h-5 w-5 text-muted-foreground' />
              <div>
                <p className='text-sm font-medium'>Need help?</p>
                <p className='text-xs text-muted-foreground'>
                  Contact your syndicator directly for assistance.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
