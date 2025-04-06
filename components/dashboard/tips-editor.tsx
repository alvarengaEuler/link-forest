"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash } from "lucide-react"

type TipsEditorProps = {
  tips: any[]
  onTipChange: (id: number, field: string, value: string) => void
  onAddTip: () => void
  onRemoveTip: (id: number) => void
}

export function TipsEditor({ tips, onTipChange, onAddTip, onRemoveTip }: TipsEditorProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Dicas</CardTitle>
          <CardDescription>Gerencie as dicas exibidas no site.</CardDescription>
        </div>
        <Button size="sm" onClick={onAddTip}>
          <Plus className="h-4 w-4 mr-1" /> Adicionar
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
        {tips.map((tip) => (
          <div key={tip.id} className="border rounded-md p-4 space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={`tip-title-${tip.id}`}>Título</Label>
              <Button variant="ghost" size="sm" onClick={() => onRemoveTip(tip.id)}>
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </div>
            <Input
              id={`tip-title-${tip.id}`}
              value={tip.title}
              onChange={(e) => onTipChange(tip.id, "title", e.target.value)}
            />
            <Label htmlFor={`tip-content-${tip.id}`}>Conteúdo</Label>
            <Textarea
              id={`tip-content-${tip.id}`}
              value={tip.content}
              onChange={(e) => onTipChange(tip.id, "content", e.target.value)}
              rows={3}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

