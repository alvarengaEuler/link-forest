"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import type { Service, NewService } from "@/types/service"

// Dados iniciais dos serviços
const initialServices: Service[] = [
  {
    id: "ultrassom-abdominal",
    icon: "🔍",
    title: "Ultrassom Abdominal",
    description: "Exame completo da cavidade abdominal para diagnóstico de alterações em órgãos internos.",
    fullDescription: `O ultrassom abdominal é um exame não invasivo que permite a visualização dos órgãos internos da cavidade abdominal do seu pet.

Este exame é fundamental para o diagnóstico de diversas condições, como:

• Alterações no fígado, baço e rins
• Problemas no trato gastrointestinal
• Presença de líquido livre na cavidade
• Identificação de massas e tumores
• Avaliação da bexiga e próstata

O exame é realizado com o animal acordado, em posição confortável, e tem duração média de 20 a 30 minutos.`,
    preparo:
      "Jejum de 6 a 8 horas para cães e 4 a 6 horas para gatos. Não deixar o animal urinar 1 hora antes do exame.",
    duracao: "20 a 30 minutos",
    recomendado: [
      "Pets com sintomas gastrointestinais",
      "Animais idosos",
      "Acompanhamento de doenças crônicas",
      "Avaliação pré-cirúrgica",
    ],
  },
  {
    id: "ultrassom-gestacional",
    icon: "🐾",
    title: "Ultrassom Gestacional",
    description: "Acompanhamento da gestação, contagem fetal e avaliação do desenvolvimento dos filhotes.",
    fullDescription: `O ultrassom gestacional é um exame essencial para o acompanhamento da gestação do seu pet, permitindo:

• Confirmação da gestação a partir de 15-20 dias
• Contagem precisa do número de filhotes
• Avaliação do desenvolvimento fetal
• Verificação da viabilidade dos fetos
• Estimativa da data do parto

Recomendamos realizar o primeiro exame entre 20-25 dias após o cruzamento e acompanhamentos periódicos durante a gestação.`,
    preparo:
      "Não é necessário jejum. Recomenda-se não deixar o animal urinar 1 hora antes do exame para melhor visualização.",
    duracao: "15 a 20 minutos",
    recomendado: ["Confirmação de gestação", "Acompanhamento gestacional", "Avaliação pré-parto"],
  },
  {
    id: "ecocardiograma",
    icon: "❤️",
    title: "Ecocardiograma",
    description: "Avaliação detalhada da estrutura e função cardíaca para diagnóstico de cardiopatias.",
    fullDescription: `O ecocardiograma é um exame de ultrassom especializado que avalia a estrutura e função do coração do seu pet.

Este exame permite:

• Visualização das câmaras cardíacas e válvulas
• Avaliação do fluxo sanguíneo
• Medição da espessura das paredes cardíacas
• Detecção de alterações congênitas ou adquiridas
• Diagnóstico de insuficiência cardíaca

É um exame indolor e não invasivo, realizado com o animal acordado em posição confortável.`,
    preparo: "Não é necessário jejum. O animal deve estar calmo para evitar alterações nos parâmetros cardíacos.",
    duracao: "30 a 40 minutos",
    recomendado: [
      "Pets com sopros cardíacos",
      "Raças predispostas a cardiopatias",
      "Animais idosos",
      "Avaliação pré-anestésica",
    ],
  },
  // Outros serviços...
]

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Carregar serviços do localStorage ou usar os iniciais
  useEffect(() => {
    const loadServices = () => {
      try {
        const savedServices = localStorage.getItem("veturimagem-services")
        if (savedServices) {
          setServices(JSON.parse(savedServices))
        } else {
          setServices(initialServices)
          localStorage.setItem("veturimagem-services", JSON.stringify(initialServices))
        }
      } catch (error) {
        console.error("Erro ao carregar serviços:", error)
        setServices(initialServices)
      } finally {
        setIsLoading(false)
      }
    }

    loadServices()
  }, [])

  // Salvar serviços no localStorage quando houver mudanças
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("veturimagem-services", JSON.stringify(services))
    }
  }, [services, isLoading])

  // Função para criar um novo serviço
  const createService = (newService: NewService) => {
    // Gerar ID a partir do título se não for fornecido
    const serviceId =
      newService.id ||
      newService.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")

    // Verificar se o ID já existe
    if (services.some((service) => service.id === serviceId)) {
      toast({
        title: "Erro ao criar serviço",
        description: `Já existe um serviço com o ID "${serviceId}"`,
        variant: "destructive",
      })
      return false
    }

    const serviceToAdd = {
      ...newService,
      id: serviceId,
    } as Service

    setServices((prev) => [...prev, serviceToAdd])
    toast({
      title: "Serviço criado",
      description: `O serviço "${newService.title}" foi criado com sucesso.`,
    })
    return true
  }

  // Função para atualizar um serviço existente
  const updateService = (id: string, updatedService: NewService) => {
    // Verificar se o serviço existe
    const serviceExists = services.some((service) => service.id === id)
    if (!serviceExists) {
      toast({
        title: "Erro ao atualizar serviço",
        description: `Serviço com ID "${id}" não encontrado.`,
        variant: "destructive",
      })
      return false
    }

    setServices((prev) => prev.map((service) => (service.id === id ? ({ ...updatedService, id } as Service) : service)))
    toast({
      title: "Serviço atualizado",
      description: `O serviço "${updatedService.title}" foi atualizado com sucesso.`,
    })
    return true
  }

  // Função para excluir um serviço
  const deleteService = (id: string) => {
    // Verificar se o serviço existe
    const serviceExists = services.some((service) => service.id === id)
    if (!serviceExists) {
      toast({
        title: "Erro ao excluir serviço",
        description: `Serviço com ID "${id}" não encontrado.`,
        variant: "destructive",
      })
      return false
    }

    const serviceName = services.find((service) => service.id === id)?.title
    setServices((prev) => prev.filter((service) => service.id !== id))
    toast({
      title: "Serviço excluído",
      description: `O serviço "${serviceName}" foi excluído com sucesso.`,
    })
    return true
  }

  // Função para obter um serviço pelo ID
  const getServiceById = (id: string) => {
    return services.find((service) => service.id === id)
  }

  return {
    services,
    isLoading,
    createService,
    updateService,
    deleteService,
    getServiceById,
  }
}

