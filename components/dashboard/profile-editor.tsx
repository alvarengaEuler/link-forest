'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ThemeSelector, type Theme } from '@/app/dashboard/theme-selector';

type ProfileEditorProps = {
  profile: any;
  showInitials: boolean;
  selectedTheme: Theme;
  onProfileChange: (field: string, value: string) => void;
  onShowInitialsChange: (value: boolean) => void;
  onThemeChange: (theme: Theme) => void;
};

export function ProfileEditor({
  profile,
  showInitials,
  selectedTheme,
  onProfileChange,
  onShowInitialsChange,
  onThemeChange,
}: ProfileEditorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-pink-200">
      <Card>
        <CardHeader>
          <CardTitle>Informações do Perfil</CardTitle>
          <CardDescription>Atualize as informações do seu perfil aqui.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={e => onProfileChange('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Empresa</Label>
            <Input
              id="company"
              value={profile.company}
              onChange={e => onProfileChange('company', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={e => onProfileChange('bio', e.target.value)}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <Input
              id="location"
              value={profile.location}
              onChange={e => onProfileChange('location', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              value={profile.instagram}
              onChange={e => onProfileChange('instagram', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={e => onProfileChange('phone', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
            <CardDescription>Escolha como exibir seu avatar.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Exibição do Avatar</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant={showInitials ? 'default' : 'outline'}
                  onClick={() => onShowInitialsChange(true)}
                >
                  Mostrar Iniciais
                </Button>
                <Button
                  type="button"
                  variant={!showInitials ? 'default' : 'outline'}
                  onClick={() => onShowInitialsChange(false)}
                >
                  Mostrar Imagem
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <ThemeSelector selectedTheme={selectedTheme.id} onThemeChange={onThemeChange} />
      </div>
    </div>
  );
}
