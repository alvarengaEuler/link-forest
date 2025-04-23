import { z } from 'zod';

// Esquema de validação Zod para serviços
export const serviceSchema = z.object({
  id: z
    .string()
    .min(3, 'ID deve ter pelo menos 3 caracteres')
    .regex(/^[a-z0-9-]+$/, {
      message: 'ID deve conter apenas letras minúsculas, números e hífens',
    }),
  icon: z.string().min(1, 'Ícone é obrigatório'),
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  fullDescription: z.string().min(50, 'Descrição completa deve ter pelo menos 50 caracteres'),
  preparo: z.string().min(5, 'Preparo deve ter pelo menos 5 caracteres'),
  duracao: z.string().min(3, 'Duração deve ter pelo menos 3 caracteres'),
  recomendado: z.array(z.string()).min(1, 'Adicione pelo menos uma recomendação'),
});

// Tipo derivado do esquema Zod
export type Service = z.infer<typeof serviceSchema>;

// Tipo para o formulário (sem o ID, que será gerado automaticamente na criação)
export const newServiceSchema = serviceSchema.omit({ id: true }).extend({
  id: z.string().optional(),
});

export type NewService = z.infer<typeof newServiceSchema>;
