"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface UsageExampleProps {
  title: string
  description: string
  examples: {
    language: string
    label: string
    code: string
  }[]
}

export function UsageExamples({ title, description, examples }: UsageExampleProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={examples[0].language}>
          <TabsList className="mb-4">
            {examples.map((example, index) => (
              <TabsTrigger key={index} value={example.language}>
                {example.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {examples.map((example, index) => (
            <TabsContent key={index} value={example.language}>
              <div className="bg-muted p-4 rounded-md relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(example.code)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <ScrollArea className="h-80">
                  <pre className="text-xs whitespace-pre-wrap">{example.code}</pre>
                </ScrollArea>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
