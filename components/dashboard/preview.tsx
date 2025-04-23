'use client';

import type React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ViewLinks } from '@/app/dashboard/links';
import { MapPin } from 'lucide-react';
import type { Theme } from '@/app/dashboard/theme-selector';

type PreviewProps = {
  data: any;
  showInitials: boolean;
  selectedTheme: Theme;
  mousePosition: { x: string; y: string };
  isMounted: boolean;
  toggleAvatar: () => void;
};

export function Preview({
  data,
  showInitials,
  selectedTheme,
  mousePosition,
  isMounted,
  toggleAvatar,
}: PreviewProps) {
  return (
    <div className="border rounded-lg overflow-hidden bg-background">
      <div className="h-[700px] overflow-y-auto">
        <div className="min-h-screen bg-background relative overflow-hidden">
          <div className="line-pattern"></div>
          <div className="diagonal-lines"></div>
          {isMounted && (
            <div
              className="line-highlight"
              style={
                {
                  '--mouse-x': mousePosition.x,
                  '--mouse-y': mousePosition.y,
                } as React.CSSProperties
              }
            ></div>
          )}
          <div className="container max-w-md mx-auto px-4 py-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* Profile Section */}
              <div className="w-full flex flex-col items-center">
                <Avatar
                  className={`w-32 h-32 border-4 border-${selectedTheme.primary} cursor-pointer transition-all hover:shadow-lg`}
                  onClick={toggleAvatar}
                >
                  {!showInitials && (
                    <AvatarImage src={data.profile.avatar} alt={data.profile.name} />
                  )}
                  <AvatarFallback className={`bg-${selectedTheme.primary} text-white text-2xl`}>
                    {data.profile.name
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <h1 className={`mt-4 text-2xl font-bold text-${selectedTheme.primary}`}>
                  {data.profile.name}
                </h1>
                <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300">
                  {data.profile.company}
                </h2>
                <p className="text-center text-sm mt-2 max-w-xs text-gray-600 dark:text-gray-300">
                  {data.profile.bio.split('\n').map((line: string, i: number) => (
                    <span key={i}>
                      {line}
                      {i < data.profile.bio.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
                <div className="flex items-center mt-2 text-gray-500 dark:text-gray-400">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{data.profile.location}</span>
                </div>
              </div>

              {/* Links Section */}
              <ViewLinks links={data.links} theme={selectedTheme} />

              {/* Tabs for Announcements and Tips */}
              <Tabs defaultValue="avisos" className="w-full mt-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="avisos">Avisos</TabsTrigger>
                  <TabsTrigger value="dicas">Sobre o Exame...</TabsTrigger>
                </TabsList>

                {/* Announcements Tab */}
                <TabsContent value="avisos">
                  <Card className={`border-2 border-${selectedTheme.primary}`}>
                    <CardContent className="pt-6 space-y-4">
                      {data.announcements.map((announcement: any) => (
                        <div key={announcement.id}>
                          <h4 className={`font-semibold text-${selectedTheme.primary}`}>
                            {announcement.title}
                          </h4>
                          <p className="text-sm dark:text-gray-300">{announcement.content}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tips Tab */}
                <TabsContent value="dicas">
                  <Card className={`border-2 border-${selectedTheme.primary}`}>
                    <CardContent className="pt-6">
                      <div className="space-y-4 max-h-[300px] overflow-y-auto">
                        {data.tips.map((tip: any, index: number) => (
                          <div
                            key={tip.id}
                            className={index < data.tips.length - 1 ? 'border-b pb-3' : ''}
                          >
                            <h4 className={`font-medium text-${selectedTheme.primary}`}>
                              {tip.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {tip.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
