"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, MapPin, Phone, MessageCircle, ChevronRight, ListMinus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "@/contexts/theme-context"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollPosition, setScrollPosition] = useState(0)
  const [showInitials, setShowInitials] = useState(true) // Default to showing initials
  const [isMounted, setIsMounted] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const [linkAnimated, setLinkAnimated] = useState(true) // Novo estado para controlar a animação
  const linePatternRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  // Adicione este useEffect para desativar a animação após alguns segundos
  useEffect(() => {
    // Desativa a animação após 5 segundos
    const timer = setTimeout(() => {
      setLinkAnimated(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setIsMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })

      // Subtle movement of the line pattern based on mouse position
      if (linePatternRef.current) {
        const moveX = (e.clientX - window.innerWidth / 2) / 50
        const moveY = (e.clientY - window.innerHeight / 2) / 50
        linePatternRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`
      }
    }

    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024)
    }

    // Initial check
    handleResize()

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const toggleAvatar = () => {
    setShowInitials(!showInitials)
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = "+5583986916277"
    const message = "Olá, gostaria de agendar um exame!"
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Interactive line pattern background */}
      <div className="line-pattern" ref={linePatternRef}></div>
      <div
        className="diagonal-lines"
        style={{
          transform: `translate(-25%, -25%) rotate(${scrollPosition / 20}deg)`,
        }}
      ></div>
      {isMounted && (
        <div
          className="line-highlight"
          style={
            {
              "--mouse-x": `${mousePosition.x}px`,
              "--mouse-y": `${mousePosition.y}px`,
            } as React.CSSProperties
          }
        ></div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle />
        </div>

        {isLargeScreen ? (
          // Bento Layout for larger screens
          <div className="grid grid-cols-12 gap-6 max-w-6xl mx-auto">
            {/* Profile Section - Spans 4 columns */}
            <div className="col-span-4 flex flex-col items-center bg-card rounded-xl p-6 shadow-sm border">
              <Avatar
                className="w-32 h-32 border-4 border-[#205b86] cursor-pointer transition-all hover:shadow-lg"
                onClick={toggleAvatar}
              >
                {!showInitials && <AvatarImage src="/if-logo.png?height=128&width=128" alt="Dra. Ingrid Felix" />}
                <AvatarImage src="/vetur.jpg?height=128&width=128" alt="Dra. Ingrid Felix" />
              </Avatar>
              <h1 className="mt-4 text-2xl font-bold text-[#205b86]">Dra. Ingrid Felix</h1>
              <h2 className="text-lg font-medium text-foreground/80">Vetur Imagem</h2>
              <p className="text-center text-sm mt-2 text-foreground/80">
                💙Ultrassonografia e Teleradiologia
                <br />
                ✨Exames de qualidade com conforto e cuidado que nossos peludos merecem🐾
                <br />
                Campina Grande e região
              </p>
              <div className="flex items-center mt-2 text-foreground/70">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm">Campina Grande, PB</span>
              </div>
            </div>

            {/* Links Section - Spans 4 columns */}
            <div className="col-span-4 flex flex-col bg-card rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 text-[#205b86]">Links Rápidos</h3>
              <div className="space-y-4 flex-1">
                <Link href="https://instagram.com/veturimagem" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className={`w-full border-2 border-[#205b86] text-[#205b86] hover:bg-[#205b86] hover:text-white flex items-center justify-between mb-3 ${linkAnimated ? "link-animated" : ""}`}
                  >
                    <div className="flex items-center">
                      <Instagram size={20} className="mr-2" />
                      <span>@veturimagem</span>
                    </div>
                    <ChevronRight size={16} />
                  </Button>
                </Link>

                <Link href="tel:+5583986916277">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#205b86] text-[#205b86] hover:bg-[#205b86] hover:text-white flex items-center justify-between mb-3"
                  >
                    <div className="flex items-center">
                      <Phone size={20} className="mr-2" />
                      <span>(83) 98691 6277</span>
                    </div>
                    <ChevronRight size={16} />
                  </Button>
                </Link>

                
                  <Button onClick={handleWhatsAppClick} className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageCircle size={20} className="mr-2" />
                      <span>Chamar no WhatsApp</span>
                    </div>
                    <ChevronRight size={16} />
                  </Button>
               

                <Link href="/projetos">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#205b86] text-[#205b86] hover:bg-[#205b86] hover:text-white flex items-center justify-between mt-3  mb-3"
                  >
                    <div className="flex items-center">
                      <Image
                        src="/placeholder.svg?height=20&width=20"
                        width={20}
                        height={20}
                        alt="Projetos"
                        className="mr-2"
                      />
                      <span>Ver Serviços</span>
                    </div>
                    <ChevronRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Contact Section - Spans 4 columns */}
            <div className="col-span-4 flex flex-col bg-card rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-bold text-[#205b86] mb-3">Contato</h3>
              <div className="space-y-3">
                <p className="text-sm flex items-center text-foreground/80">
                  <Phone size={16} className="mr-2 text-[#205b86]" />
                  (83) 98691 6277
                </p>
                <p className="text-sm flex items-center text-foreground/80">
                  <Instagram size={16} className="mr-2 text-[#205b86]" />
                  @veturimagem
                </p>
                <p className="text-sm flex items-center text-foreground/80">
                  <MapPin size={16} className="mr-2 text-[#205b86]" />
                  Atendimento em Campina Grande e região
                </p>
              </div>
            </div>

            {/* Tabs Section - Spans full width */}
            <div className="col-span-12 bg-card rounded-xl shadow-sm border">
              <Tabs defaultValue="avisos" className="w-full p-6">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="avisos">Avisos</TabsTrigger>
                  <TabsTrigger value="dicas">Sobre o Exame...</TabsTrigger>
                </TabsList>

                {/* Announcements Tab */}
                <TabsContent value="avisos">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-[#205b86]">📅 Agendamentos</h4>
                      <p className="text-sm text-foreground/80">
                        Disponibilidade para a próxima semana em Campina Grande! Reserve seu horário.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#205b86]">🐾 Atendimento Domiciliar</h4>
                      <p className="text-sm text-foreground/80">
                        Exames realizados no conforto da sua casa para menor estresse do seu pet.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#205b86]">⚠️ Lembre-se</h4>
                      <p className="text-sm text-foreground/80">
                        Não deixe pra depois, cuide sempre bem do seu melhor amigo! ♥️
                      </p>
                    </div>
                  </div>
                </TabsContent>

                {/* Tips Tab */}
                <TabsContent value="dicas">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[400px] overflow-y-auto">
                    <div className="border-b pb-3 md:border-none">
                      <h4 className="font-medium text-[#205b86]">Duração da Avaliação Ultrassonográfica</h4>
                      <p className="text-sm text-foreground/80">
                        A avaliação ultrassonográfica abdominal e gestacional dura entre 20 e 30 minutos, podendo
                        ultrapassar esse tempo e caso de doenças complexas ou pacientes pouco colaborativos.
                      </p>
                    </div>
                    <div className="border-b pb-3 md:border-none">
                      <h4 className="font-medium text-[#205b86]">Preparo Necessário</h4>
                      <p className="text-sm text-foreground/80">
                        Uso de antifisético de acordo com o médico veterinário responsável. Água a vontade. Não deixar o
                        paciente urinar 1 hora antes do exame. Se possível, última alimentação deve ser pastosa.
                      </p>
                    </div>
                    <div className="border-b pb-3 md:border-none">
                      <h4 className="font-medium text-[#205b86]">Atraso</h4>
                      <p className="text-sm text-foreground/80">
                        Imprevistos podem ocorrer, nesse caso, o tempo de tolerância é de 15min. Caso não seja possível,
                        fique tranquilo(a), agendaremos uma nova da e horário para o atendimento.
                      </p>
                    </div>
                    <div className="border-b pb-3 md:border-none">
                      <h4 className="font-medium text-[#205b86]">Cancelamento</h4>
                      <p className="text-sm text-foreground/80">
                        Pedimos que avise com 1 hora de antecedência caso não possa comparecer ao exame agendado. Isso
                        nos ajuda a reorganizar a agenda e garantir o melhor atendimento para todos.
                      </p>
                    </div>
                    <div className="border-b pb-3 md:border-none">
                      <h4 className="font-medium text-[#205b86]">Acompanhamento Ultrassonográfico</h4>
                      <p className="text-sm text-foreground/80">
                        O acompanhamento ultrassonográfico para avaliar a progressão de uma doença e/ou acompanhar a
                        gestação, conforme indicado pelo médico veterinário responsável, será cobrado com um novo valor.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#205b86]">Emissão de Relatório Ultrassonográfico</h4>
                      <p className="text-sm text-foreground/80">
                        A emissão dos relatórios ultrassonográficos, juntamente com as imagens, será feita em até 24
                        horas úteis. Exames que tenham alterações que necessitem de intervenção de urgência, será
                        emitido um relatório parcial.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ) : (
          // Mobile Layout
          <div className="max-w-md mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* Profile Section */}
              <div className="w-full flex flex-col items-center">
                <Avatar
                  className="w-32 h-32 border-4 border-[#205b86] cursor-pointer transition-all hover:shadow-lg"
                  onClick={toggleAvatar}
                >
                  {!showInitials && <AvatarImage src="/vetur.jpg?height=128&width=128" alt="Dra. Ingrid Felix" /> }
                  <AvatarImage src="/if-logo.png?height=128&width=128" alt="Dra. Ingrid Felix" />
                  
                  {/* <AvatarFallback className="bg-[#205b86] text-white text-2xl">IF</AvatarFallback> */}
                </Avatar>
                <h1 className="mt-4 text-2xl font-bold text-[#205b86]">Dra. Ingrid Felix</h1>
                <h2 className="text-lg font-medium text-foreground/80">Vetur Imagem</h2>
                <p className="text-center text-sm mt-2 max-w-xs text-foreground/80">
                  💙Ultrassonografia e Teleradiologia
                  <br />
                  ✨Exames de qualidade com conforto e cuidado que nossos peludos merecem🐾
                  <br />
                  Campina Grande e região
                </p>
                <div className="flex items-center mt-2 text-foreground/70">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">Campina Grande, PB</span>
                </div>
              </div>

              {/* Links Section */}
              <div className="w-full space-y-4">
                <Link href="https://instagram.com/veturimagem" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className={`w-full border-2 border-[#205b86] text-[#205b86] hover:bg-[#205b86] hover:text-white flex items-center justify-between mb-3 ${linkAnimated ? "link-animated" : ""}`}
                  >
                    <div className="flex items-center">
                      <Instagram size={20} className="mr-2" />
                      <span>@veturimagem</span>
                    </div>
                    <ChevronRight size={16} />
                  </Button>
                </Link>

                <Link href="tel:+5583986916277">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#205b86] text-[#205b86] hover:bg-[#205b86] hover:text-white flex items-center justify-between mb-3"
                  >
                    <div className="flex items-center">
                      <Phone size={20} className="mr-2" />
                      <span>(83) 98691 6277</span>
                    </div>
                    <ChevronRight size={16} />
                  </Button>
                </Link>

                
                  <Button onClick={handleWhatsAppClick}  className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-between ">
                    <div className="flex items-center">
                      <MessageCircle size={20} className="mr-2" />
                      <span>Chamar no WhatsApp</span>
                    </div>
                    <ChevronRight size={16} />
                  </Button>
                

                <Link href="/projetos">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#205b86] text-[#205b86] hover:bg-[#205b86] hover:text-white flex items-center justify-between mb-3 mt-3"
                  >
                    <div className="flex items-center">
                    <ListMinus size={20} className="mr-2" />
                      <span>Ver Serviços</span>
                    </div>
                    <ChevronRight size={16} />
                  </Button>
                </Link>
              </div>

              {/* Tabs for Announcements and Tips */}
              <Tabs defaultValue="avisos" className="w-full mt-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="avisos">Avisos</TabsTrigger>
                  <TabsTrigger value="dicas">Sobre o Exame...</TabsTrigger>
                </TabsList>

                {/* Announcements Tab */}
                <TabsContent value="avisos">
                  <Card className="border-2 border-[#205b86]">
                    <CardContent className="pt-6 space-y-4">
                      <div>
                        <h4 className="font-semibold text-[#205b86]">📅 Agendamentos</h4>
                        <p className="text-sm text-foreground/80">
                          Disponibilidade para a próxima semana em Campina Grande! Reserve seu horário.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-[#205b86]">🐾 Atendimento Domiciliar</h4>
                        <p className="text-sm text-foreground/80">
                          Exames realizados no conforto da sua casa para menor estresse do seu pet.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-[#205b86]">⚠️ Lembre-se</h4>
                        <p className="text-sm text-foreground/80">
                          Não deixe pra depois, cuide sempre bem do seu melhor amigo! ♥️
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tips Tab */}
                <TabsContent value="dicas">
                  <Card className="border-2 border-[#205b86]">
                    <CardContent className="pt-6">
                      <div className="space-y-4 max-h-[400px] overflow-y-auto">
                        <div className="border-b pb-3">
                          <h4 className="font-medium text-[#205b86]">Duração da Avaliação Ultrassonográfica</h4>
                          <p className="text-sm text-foreground/80">
                            A avaliação ultrassonográfica abdominal e gestacional dura entre 20 e 30 minutos, podendo
                            ultrapassar esse tempo e caso de doenças complexas ou pacientes pouco colaborativos.
                          </p>
                        </div>
                        <div className="border-b pb-3">
                          <h4 className="font-medium text-[#205b86]">Preparo Necessário</h4>
                          <p className="text-sm text-foreground/80">
                            Uso de antifisético de acordo com o médico veterinário responsável. Água a vontade. Não
                            deixar o paciente urinar 1 hora antes do exame. Se possível, última alimentação deve ser
                            pastosa.
                          </p>
                        </div>
                        <div className="border-b pb-3">
                          <h4 className="font-medium text-[#205b86]">Atraso</h4>
                          <p className="text-sm text-foreground/80">
                            Imprevistos podem ocorrer, nesse caso, o tempo de tolerância é de 15min. Caso não seja
                            possível, fique tranquilo(a), agendaremos uma nova da e horário para o atendimento.
                          </p>
                        </div>
                        <div className="border-b pb-3">
                          <h4 className="font-medium text-[#205b86]">Cancelamento</h4>
                          <p className="text-sm text-foreground/80">
                            Pedimos que avise com 1 hora de antecedência caso não possa comparecer ao exame agendado.
                          </p>
                        </div>
                        <div className="border-b pb-3">
                          <h4 className="font-medium text-[#205b86]">Acompanhamento Ultrassonográfico</h4>
                          <p className="text-sm text-foreground/80">
                            O acompanhamento ultrassonográfico para avaliar a progressão de uma doença e/ou acompanhar a
                            gestação, conforme indicado pelo médico veterinário responsável, será cobrado com um novo
                            valor.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-[#205b86]">Emissão de Relatório Ultrassonográfico</h4>
                          <p className="text-sm text-foreground/80">
                            A emissão dos relatórios ultrassonográficos, juntamente com as imagens, será feita em até 24
                            horas úteis.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Contact Section */}
              <Card className="w-full border-2 border-[#205b86]">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold text-[#205b86] mb-3">Contato</h3>
                  <div className="space-y-3">
                    <p className="text-sm flex items-center text-foreground/80">
                      <Phone size={16} className="mr-2 text-[#205b86]" />
                      (83) 98691 6277
                    </p>
                    <p className="text-sm flex items-center text-foreground/80">
                      <Instagram size={16} className="mr-2 text-[#205b86]" />
                      @veturimagem
                    </p>
                    <p className="text-sm flex items-center text-foreground/80">
                      <MapPin size={16} className="mr-2 text-[#205b86]" />
                      Atendimento em Campina Grande e região
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="w-full text-center text-xs text-foreground/60 mt-6">
          <p>© {new Date().getFullYear()} Vetur Imagem - Todos os direitos reservados</p>
        </footer>
      </div>
    </main>
  )
}

