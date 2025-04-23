'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';

type AnnouncementsEditorProps = {
  announcements: any[];
  onAnnouncementChange: (id: number, field: string, value: string) => void;
  onAddAnnouncement: () => void;
  onRemoveAnnouncement: (id: number) => void;
};

export function AnnouncementsEditor({
  announcements,
  onAnnouncementChange,
  onAddAnnouncement,
  onRemoveAnnouncement,
}: AnnouncementsEditorProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Avisos</CardTitle>
          <CardDescription>Gerencie os avisos exibidos no site.</CardDescription>
        </div>
        <Button size="sm" onClick={onAddAnnouncement}>
          <Plus className="h-4 w-4 mr-1" /> Adicionar
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {announcements.map(announcement => (
          <div key={announcement.id} className="border rounded-md p-4 space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={`announcement-title-${announcement.id}`}>Título</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveAnnouncement(announcement.id)}
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </div>
            <Input
              id={`announcement-title-${announcement.id}`}
              value={announcement.title}
              onChange={e => onAnnouncementChange(announcement.id, 'title', e.target.value)}
            />
            <Label htmlFor={`announcement-content-${announcement.id}`}>Conteúdo</Label>
            <Textarea
              id={`announcement-content-${announcement.id}`}
              value={announcement.content}
              onChange={e => onAnnouncementChange(announcement.id, 'content', e.target.value)}
              rows={2}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
