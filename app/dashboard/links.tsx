"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

// Tipo para os links
type LinkItem = {
  id: string
  icon: React.ElementType
  text: string
  href: string
  color?: string
  variant?: "default" | "outline"
}

// Componente para um item arrastável
const SortableLink = ({ link, theme }: { link: LinkItem; theme: any }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: link.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="mb-3">
      <Button
        variant={link.variant || "outline"}
        className={`w-full border-2 ${
          link.variant === "default"
            ? `bg-${theme.primary} hover:bg-${theme.primaryHover} text-white`
            : `border-${theme.primary} text-${theme.primary} hover:bg-${theme.primary} hover:text-white`
        } flex items-center justify-between group`}
      >
        <div className="flex items-center">
          <div
            {...attributes}
            {...listeners}
            className="mr-2 cursor-grab active:cursor-grabbing p-1 rounded hover:bg-black/10 opacity-30 group-hover:opacity-100"
          >
            <GripVertical size={16} />
          </div>
          <link.icon size={20} className="mr-2" />
          <span>{link.text}</span>
        </div>
        <ChevronRight size={16} />
      </Button>
    </div>
  )
}

// Componente principal de links
export function DraggableLinks({
  links: initialLinks,
  theme,
  onLinksChange,
}: {
  links: LinkItem[]
  theme: any
  onLinksChange: (links: LinkItem[]) => void
}) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setLinks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        const newLinks = arrayMove(items, oldIndex, newIndex)
        onLinksChange(newLinks)
        return newLinks
      })
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={links.map((link) => link.id)} strategy={verticalListSortingStrategy}>
        <div className="w-full space-y-0">
          {links.map((link) => (
            <SortableLink key={link.id} link={link} theme={theme} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

// Componente de visualização de links (não arrastável)
export function ViewLinks({ links, theme }: { links: LinkItem[]; theme: any }) {
  return (
    <div className="w-full space-y-4">
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
        >
          <Button
            variant={link.variant || "outline"}
            className={`w-full border-2 ${
              link.variant === "default"
                ? `bg-${theme.primary} hover:bg-${theme.primaryHover} text-white`
                : `border-${theme.primary} text-${theme.primary} hover:bg-${theme.primary} hover:text-white`
            } flex items-center justify-between mb-3`}
          >
            <div className="flex items-center">
              <link.icon size={20} className="mr-2" />
              <span>{link.text}</span>
            </div>
            <ChevronRight size={16} />
          </Button>
        </Link>
      ))}
    </div>
  )
}

