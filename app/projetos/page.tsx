'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useServices } from '@/hooks/use-services';
import { goToWPP } from '@/lib/utils';

export default function ProjectsPage() {
  const { services, isLoading } = useServices();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    console.log('Services:', services[0]);
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    // Verificação inicial
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleWhatsappClick = () => {
    const phoneNumber = '5583986916277';
    const message = `Olá! Gostaria de agendar um exame.`;
    goToWPP(message, phoneNumber);
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background patterns */}
      <div className="line-pattern"></div>
      <div className="diagonal-lines"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-[#205b86] ml-2">Serviços</h1>
          </div>
          <ThemeToggle />
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#205b86] mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Carregando serviços...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Projects grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {services.map(project => (
                <Link href={`/projetos/${project.id}`} key={project.id}>
                  <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 hover:border-[#205b86]">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-[#d1e2f2] flex items-center justify-center text-2xl">
                          {project.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-[#205b86]">{project.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80">{project.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Call to action */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl font-bold text-[#205b86] mb-4">Agende seu exame</h2>
              <p className="text-foreground/80 mb-6">
                Entre em contato para agendar um exame ou tirar dúvidas sobre nossos serviços.
                Atendemos em Campina Grande e região.
              </p>

              <Button
                onClick={handleWhatsappClick}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
              >
                Agendar pelo WhatsApp
              </Button>
            </div>
          </>
        )}

        {/* Footer */}
        <footer className="w-full text-center text-xs text-foreground/60 mt-6">
          <p>© {new Date().getFullYear()} Vetur Imagem - Todos os direitos reservados</p>
        </footer>
      </div>
    </main>
  );
}
