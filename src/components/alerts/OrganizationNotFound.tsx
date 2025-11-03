import React from 'react';
import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@src/components/ui/card';
import { Button } from '@src/components/ui/button';

type OrganizationNotFoundProps = {
  backHref?: string;
};

export default function OrganizationNotFound({ backHref = '/' }: OrganizationNotFoundProps) {
  return (
    <div className="w-full py-16 flex items-center justify-center">
      <Card className="max-w-xl w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Organization not found</CardTitle>
          <CardDescription>
            We couldn’t find the organization you’re looking for. It may have been removed or the
            link is incorrect.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center gap-3">
          <Button asChild>
            <Link href={backHref}>Go back</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/account">View your account</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
