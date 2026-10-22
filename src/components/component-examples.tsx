import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function ComponentExamples() {
  const [saved, setSaved] = useState(false)

  return (
    <section className="pb-16" aria-labelledby="component-examples-title">
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle><h2 id="component-examples-title">Your component toolkit</h2></CardTitle>
          <CardDescription>Official shadcn/ui Button and Card components, ready to make your own.</CardDescription>
        </CardHeader>
        <CardContent>
          <p role="status">{saved ? 'Example saved. You’re ready to build.' : 'Try the buttons below to explore your new components.'}</p>
        </CardContent>
        <CardFooter className="flex-wrap gap-3">
          <Button type="button" onClick={() => setSaved(true)} disabled={saved}>Save example</Button>
          <Button type="button" variant="outline" onClick={() => setSaved(false)}>Reset example</Button>
          <Button asChild variant="link"><a href="https://ui.shadcn.com/docs/components">Browse components</a></Button>
        </CardFooter>
      </Card>
    </section>
  )
}
