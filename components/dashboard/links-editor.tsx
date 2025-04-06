"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DraggableLinks } from "@/app/dashboard/links"
import type { Theme } from "@/app/dashboard/theme-selector"

type LinksEditorProps = {
  links: any[]
  theme: Theme
  onLinksChange: (links: any[]) => void
}

export function LinksEditor({ links, theme, onLinksChange }: LinksEditorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Links</CardTitle>
        <CardDescription>Arraste para reordenar os links do seu perfil.</CardDescription>
      </CardHeader>
      <CardContent>
        <DraggableLinks links={links} theme={theme} onLinksChange={onLinksChange} />
      </CardContent>
    </Card>
  )
}

