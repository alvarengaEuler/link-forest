'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { EmojiPicker } from '@/components/dashboard/services/emoji-picker';
import { newServiceSchema, type NewService, type Service } from '@/types/service';

interface ServiceFormProps {
  initialData?: Service;
  onSubmit: (data: NewService) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function ServiceForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ServiceFormProps) {
  const [recommendations, setRecommendations] = useState<string[]>(
    initialData?.recomendado || [''],
  );

  const form = useForm<NewService>({
    resolver: zodResolver(newServiceSchema),
    defaultValues: initialData || {
      icon: '🔍',
      title: '',
      description: '',
      fullDescription: '',
      preparo: '',
      duracao: '',
      recomendado: [''],
    },
  });

  const handleAddRecommendation = () => {
    setRecommendations([...recommendations, '']);
    const currentRecommendations = form.getValues().recomendado || [];
    form.setValue('recomendado', [...currentRecommendations, '']);
  };

  const handleRemoveRecommendation = (index: number) => {
    if (recommendations.length <= 1) return;
    const newRecommendations = [...recommendations];
    newRecommendations.splice(index, 1);
    setRecommendations(newRecommendations);
    form.setValue('recomendado', newRecommendations);
  };

  const handleRecommendationChange = (index: number, value: string) => {
    const newRecommendations = [...recommendations];
    newRecommendations[index] = value;
    setRecommendations(newRecommendations);
    form.setValue('recomendado', newRecommendations);
  };

  const handleEmojiSelect = (emoji: string) => {
    form.setValue('icon', emoji);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{initialData ? 'Editar Serviço' : 'Novo Serviço'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Ícone e Título */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ícone</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-12 rounded-lg bg-[#d1e2f2] flex items-center justify-center text-2xl">
                            {field.value}
                          </div>
                          <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:col-span-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Ultrassom Abdominal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* ID personalizado (opcional) */}
            {!initialData && (
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Personalizado (opcional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: ultrassom-abdominal"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormDescription>
                      Se não for fornecido, será gerado automaticamente a partir do título.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Descrição curta */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição Curta</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Breve descrição do serviço (exibida nos cards)"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Descrição completa */}
            <FormField
              control={form.control}
              name="fullDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição Completa</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descrição detalhada do serviço" rows={8} {...field} />
                  </FormControl>
                  <FormDescription>
                    Use quebras de linha para formatar o texto. Você pode usar marcadores como •
                    para listas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Preparo e Duração */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="preparo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preparo</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Instruções de preparo para o exame"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duracao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duração</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 20 a 30 minutos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Recomendações */}
            <div>
              <Label>Recomendado para</Label>
              <div className="space-y-2 mt-2">
                {recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={recommendation}
                      onChange={e => handleRecommendationChange(index, e.target.value)}
                      placeholder={`Recomendação ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveRecommendation(index)}
                      disabled={recommendations.length <= 1}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={handleAddRecommendation}>
                  Adicionar recomendação
                </Button>
              </div>
              {form.formState.errors.recomendado && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {form.formState.errors.recomendado.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : initialData ? 'Atualizar Serviço' : 'Criar Serviço'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
