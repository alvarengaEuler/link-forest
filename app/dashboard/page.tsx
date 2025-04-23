'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Instagram, Phone, MessageCircle } from 'lucide-react';
import { themes, type Theme } from './theme-selector';
import { ProfileEditor } from '@/components/dashboard/profile-editor';
import { LinksEditor } from '@/components/dashboard/links-editor';
import { AnnouncementsEditor } from '@/components/dashboard/announcements-editor';
import { TipsEditor } from '@/components/dashboard/tips-editor';
import { Preview } from '@/components/dashboard/preview';
import { ThemeToggle } from '@/components/theme-toggle';

// Mock data
const initialData = {
  profile: {
    name: 'Dra. Ingrid Felix',
    company: 'Vetur Imagem',
    bio: '💙Ultrassonografia e Teleradiologia\n✨Exames de qualidade com conforto e cuidado que nossos peludos merecem🐾\nCampina Grande e região',
    avatar: '/placeholder.svg?height=128&width=128',
    location: 'Campina Grande, PB',
    instagram: '@veturimagem',
    phone: '(83) 98691 6277',
  },
  links: [
    {
      id: 'instagram',
      icon: Instagram,
      text: '@veturimagem',
      href: 'https://instagram.com/veturimagem',
      variant: 'outline',
    },
    {
      id: 'phone',
      icon: Phone,
      text: '(83) 98691 6277',
      href: 'tel:+5583986916277',
      variant: 'outline',
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      text: 'Chamar no WhatsApp',
      href: 'https://wa.me/5583986916277',
      variant: 'default',
      color: 'green',
    },
  ],
  announcements: [
    {
      id: 1,
      title: '📅 Agendamentos',
      content: 'Disponibilidade para a próxima semana em Campina Grande! Reserve seu horário.',
    },
    {
      id: 2,
      title: '🐾 Atendimento Domiciliar',
      content: 'Exames realizados no conforto da sua casa para menor estresse do seu pet.',
    },
    {
      id: 3,
      title: '⚠️ Lembre-se',
      content: 'Não deixe pra depois, cuide sempre bem do seu melhor amigo! ♥️',
    },
  ],
  tips: [
    {
      id: 1,
      title: 'Duração da Avaliação Ultrassonográfica',
      content:
        'A avaliação ultrassonográfica abdominal e gestacional dura entre 20 e 30 minutos, podendo ultrapassar esse tempo e caso de doenças complexas ou pacientes pouco colaborativos.',
    },
    {
      id: 2,
      title: 'Preparo Necessário',
      content:
        'Uso de antifisético de acordo com o médico veterinário responsável. Água a vontade. Não deixar o paciente urinar 1 hora antes do exame. Se possível, última alimentação deve ser pastosa. Em casos de investigação de doenças gastrointestinais, recomenda-se o Jejum alimentar de 6 a 8 horas para cães e de 4 a 6 horas para gatos.',
    },
    {
      id: 3,
      title: 'Atraso',
      content:
        'Imprevistos podem ocorrer, nesse caso, o tempo de tolerância é de 15min. Caso não seja possível, fique tranquilo(a), agendaremos uma nova da e horário para o atendimento. Em caso de atraso, avise o quanto antes. O não comparecimento ou atraso pode comprometer o atendimento dos demais pacientes.',
    },
    {
      id: 4,
      title: 'Cancelamento',
      content:
        'Pedimos que avise com 1 hora de antecedência caso não possa comparecer ao exame agendado. Isso nos ajuda a reorganizar a agenda e garantir o melhor atendimento para todos.',
    },
    {
      id: 5,
      title: 'Acompanhamento Ultrassonográfico',
      content:
        'O acompanhamento ultrassonográfico para avaliar a progressão de uma doença e/ou acompanhar a gestação, conforme indicado pelo médico veterinário responsável, será cobrado com um novo valor, equivalente ao valor do exame ultrassonográfico anterior.',
    },
    {
      id: 6,
      title: 'Emissão de Relatório Ultrassonográfico',
      content:
        'A emissão dos relatórios ultrassonográficos, juntamente com as imagens, será feita em até 24 horas úteis. Exames que tenham alterações que necessitem de intervenção de urgência, será emitido um relatório ultrassonográfico parcial, sem as imagens, ao final do exame.',
    },
  ],
};

export default function Dashboard() {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState('profile');
  const [showInitials, setShowInitials] = useState(true); // Default to showing initials
  const [mousePosition, setMousePosition] = useState({ x: '50%', y: '50%' });
  const [isMounted, setIsMounted] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(
    themes.find(t => t.id === 'default') || themes[0],
  );
  const [showEditor, setShowEditor] = useState(true); // Estado para controlar a visibilidade do painel de edição

  // Set isMounted to true when component mounts (client-side only)
  useEffect(() => {
    setIsMounted(true);

    // Set initial mouse position to center of screen
    if (typeof window !== 'undefined') {
      setMousePosition({
        x: `${window.innerWidth / 2}px`,
        y: `${window.innerHeight / 2}px`,
      });
    }
  }, []);

  const handleProfileChange = (field: string, value: string) => {
    setData({
      ...data,
      profile: {
        ...data.profile,
        [field]: value,
      },
    });
  };

  const handleLinksChange = (links: any[]) => {
    setData({
      ...data,
      links,
    });
  };

  const handleAnnouncementChange = (id: number, field: string, value: string) => {
    setData({
      ...data,
      announcements: data.announcements.map(announcement =>
        announcement.id === id ? { ...announcement, [field]: value } : announcement,
      ),
    });
  };

  const handleTipChange = (id: number, field: string, value: string) => {
    setData({
      ...data,
      tips: data.tips.map(tip => (tip.id === id ? { ...tip, [field]: value } : tip)),
    });
  };

  const addAnnouncement = () => {
    const newId = Math.max(0, ...data.announcements.map(a => a.id)) + 1;
    setData({
      ...data,
      announcements: [
        ...data.announcements,
        { id: newId, title: 'Novo Aviso', content: 'Conteúdo do aviso' },
      ],
    });
  };

  const removeAnnouncement = (id: number) => {
    setData({
      ...data,
      announcements: data.announcements.filter(a => a.id !== id),
    });
  };

  const addTip = () => {
    const newId = Math.max(0, ...data.tips.map(t => t.id)) + 1;
    setData({
      ...data,
      tips: [...data.tips, { id: newId, title: 'Nova Dica', content: 'Conteúdo da dica' }],
    });
  };

  const removeTip = (id: number) => {
    setData({
      ...data,
      tips: data.tips.filter(t => t.id !== id),
    });
  };

  const toggleAvatar = () => {
    setShowInitials(!showInitials);
  };

  const handleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme);
  };

  const toggleEditor = () => {
    setShowEditor(!showEditor);
  };

  return (
    <div className="flex h-screen overflow-hidden border border-red-500">
      {/* Editor Panel - Colapsável */}
      <div
        className={`border border-yellow-500 transition-all duration-300 ease-in-out ${
          showEditor ? 'w-full md:w-1/2 xl:w-5/12' : 'w-0 overflow-hidden'
        }`}
      >
        <div className="h-full overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Editar Conteúdo</h2>
            <div className="flex items-center gap-2">
              {/* <ThemeToggle /> */}
              <Button variant="outline" size="sm" onClick={toggleEditor} className="md:hidden">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger>
              <TabsTrigger value="announcements">Avisos</TabsTrigger>
              <TabsTrigger value="tips">Dicas</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileEditor
                profile={data.profile}
                showInitials={showInitials}
                selectedTheme={selectedTheme}
                onProfileChange={handleProfileChange}
                onShowInitialsChange={setShowInitials}
                onThemeChange={handleThemeChange}
              />
            </TabsContent>

            <TabsContent value="links">
              <LinksEditor
                links={data.links}
                theme={selectedTheme}
                onLinksChange={handleLinksChange}
              />
            </TabsContent>

            <TabsContent value="announcements">
              <AnnouncementsEditor
                announcements={data.announcements}
                onAnnouncementChange={handleAnnouncementChange}
                onAddAnnouncement={addAnnouncement}
                onRemoveAnnouncement={removeAnnouncement}
              />
            </TabsContent>

            <TabsContent value="tips">
              <TipsEditor
                tips={data.tips}
                onTipChange={handleTipChange}
                onAddTip={addTip}
                onRemoveTip={removeTip}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Toggle Button for Editor - Visível apenas em telas maiores */}
      <div className="hidden md:flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleEditor}
          className="h-12 w-6 rounded-none border-y border-r"
          aria-label={showEditor ? 'Ocultar editor' : 'Mostrar editor'}
        >
          {showEditor ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      {/* Preview Panel - Fixo */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${showEditor ? 'hidden md:block' : 'block'}`}
      >
        <div className="h-screen overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Pré-visualização</h2>
            <div className="flex items-center gap-2">
              {!showEditor && <ThemeToggle />}
              {!showEditor && (
                <Button variant="outline" size="sm" onClick={toggleEditor}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> Editar
                </Button>
              )}
            </div>
          </div>
          <Preview
            data={data}
            showInitials={showInitials}
            selectedTheme={selectedTheme}
            mousePosition={mousePosition}
            isMounted={isMounted}
            toggleAvatar={toggleAvatar}
          />
        </div>
      </div>
    </div>
  );
}
