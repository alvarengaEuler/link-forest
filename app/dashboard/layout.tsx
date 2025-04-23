'use client';

import type React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  Settings,
  FileEdit,
  Eye,
  Save,
  LayoutDashboard,
  LucideImage,
  MessageSquare,
  Bell,
  Briefcase,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="border-r">
          <SidebarHeader className="flex items-center px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[#205b86] flex items-center justify-center text-white">
                VI
              </div>
              <div className="font-semibold text-lg">Vetur Imagem</div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/profile">
                    <FileEdit className="mr-2 h-4 w-4" />
                    <span>Editar Perfil</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/projetos">
                    <Image
                      className="mr-2 h-4 w-4"
                      src="/placeholder.svg?height=16&width=16"
                      width={16}
                      height={16}
                      alt="Projetos"
                    />
                    <span>Projetos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/services">
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>Serviços</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/announcements">
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Avisos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/tips">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Dicas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/media">
                    <LucideImage className="mr-2 h-4 w-4" />
                    <span>Mídia</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Ver Site</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1">
          <div className="p-4 h-16 border-b flex items-center justify-between">
            <div className="flex items-center">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold ml-4">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                Visualizar
              </Button>
              <Button size="sm">
                <Save className="mr-2 h-4 w-4" />
                Salvar
              </Button>
            </div>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
