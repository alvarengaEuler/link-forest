"use client"
import { Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export type Theme = {
  id: string
  name: string
  primary: string
  primaryHover: string
  secondary: string
  accent: string
  background: string
  text: string
}

const themes: Theme[] = [
  {
    id: "blue",
    name: "Azul Oceano",
    primary: "blue-600",
    primaryHover: "blue-700",
    secondary: "blue-200",
    accent: "blue-400",
    background: "white",
    text: "gray-800",
  },
  {
    id: "teal",
    name: "Verde Água",
    primary: "teal-600",
    primaryHover: "teal-700",
    secondary: "teal-200",
    accent: "teal-400",
    background: "white",
    text: "gray-800",
  },
  {
    id: "purple",
    name: "Roxo Lavanda",
    primary: "purple-600",
    primaryHover: "purple-700",
    secondary: "purple-200",
    accent: "purple-400",
    background: "white",
    text: "gray-800",
  },
  {
    id: "amber",
    name: "Âmbar Dourado",
    primary: "amber-600",
    primaryHover: "amber-700",
    secondary: "amber-200",
    accent: "amber-400",
    background: "white",
    text: "gray-800",
  },
  {
    id: "rose",
    name: "Rosa Suave",
    primary: "rose-600",
    primaryHover: "rose-700",
    secondary: "rose-200",
    accent: "rose-400",
    background: "white",
    text: "gray-800",
  },
  {
    id: "default",
    name: "Azul Vetur",
    primary: "[#205b86]",
    primaryHover: "[#184a6d]",
    secondary: "[#d1e2f2]",
    accent: "[#6ba3d1]",
    background: "white",
    text: "gray-800",
  },
]

export function ThemeSelector({
  selectedTheme,
  onThemeChange,
}: { selectedTheme: string; onThemeChange: (theme: Theme) => void }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <Label className="text-base font-medium mb-4 block">Escolha um tema</Label>
        <RadioGroup
          value={selectedTheme}
          onValueChange={(value) => onThemeChange(themes.find((t) => t.id === value) || themes[0])}
        >
          <div className="grid grid-cols-2 gap-4">
            {themes.map((theme) => (
              <div key={theme.id} className="flex items-center space-x-2">
                <RadioGroupItem value={theme.id} id={`theme-${theme.id}`} className="sr-only" />
                <Label
                  htmlFor={`theme-${theme.id}`}
                  className={`flex-1 cursor-pointer rounded-md border-2 p-4 hover:text-red-500 hover:bg-gray-50 ${
                    selectedTheme === theme.id ? `border-${theme.primary} bg-${theme.secondary}/20` : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`h-4 w-4 rounded-full bg-${theme.primary}`} />
                      <span>{theme.name}</span>
                    </div>
                    {selectedTheme === theme.id && <Check className={`h-4 w-4 text-${theme.primary}`} />}
                  </div>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

export { themes }

