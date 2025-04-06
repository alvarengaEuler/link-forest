"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useServices } from "@/hooks/use-services"

export default function ProjectDetailPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string
  const { getServiceById, isLoading } = useServices()
  const [project, setProject] = useState<any>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      const foundProject = getServiceById(projectId)
      if (foundProject) {
        setProject(foundProject)
      } else {
        setNotFound(true)
      }
    }
  }, [projectId, getServiceById, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#205b86] mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando serviço...</p>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#205b86] mb-4">Serviço não encontrado</h1>
          <Link href="/projetos">
            <Button variant="outline">Voltar para Serviços</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!project) return null

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background patterns */}
      <div className="line-pattern"></div>
      <div className="diagonal-lines"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Link href="/projetos">
              <Button variant="outline" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Voltar para Serviços
              </Button>
            </Link>
          </div>
          <ThemeToggle />
        </div>

        {/* Project details */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-lg bg-[#d1e2f2] flex items-center justify-center text-3xl">
              {project.icon}
            </div>
            <h1 className="text-3xl font-bold text-[#205b86]">{project.title}</h1>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="prose max-w-none dark:prose-invert">
                <p className="text-lg mb-4">{project.description}</p>
                <div className="whitespace-pre-line text-foreground/80">{project.fullDescription}</div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[#205b86] mb-4">Preparo</h2>
                <p className="text-foreground/80">{project.preparo}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[#205b86] mb-4">Duração</h2>
                <p className="text-foreground/80">{project.duracao}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#205b86] mb-4">Recomendado para</h2>
              <ul className="list-disc pl-5 text-foreground/80">
                {project.recomendado.map((item: string, index: number) => (
                  <li key={index} className="mb-1">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Call to action */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#205b86] mb-4">Agende seu exame</h2>
            <p className="text-foreground/80 mb-6">
              Entre em contato para agendar um exame ou tirar dúvidas sobre este serviço.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://wa.me/5583986916277" target="_blank" rel="noopener noreferrer">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 w-full sm:w-auto">
                  Agendar pelo WhatsApp
                </Button>
              </Link>
              <Link href="tel:+5583986916277">
                <Button variant="outline" className="px-6 py-2 w-full sm:w-auto">
                  Ligar agora
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full text-center text-xs text-foreground/60 mt-6">
          <p>© {new Date().getFullYear()} Vetur Imagem - Todos os direitos reservados</p>
        </footer>
      </div>
    </main>
  )
}

