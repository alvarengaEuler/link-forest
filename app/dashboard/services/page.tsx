'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServicesList } from '@/components/dashboard/services/services-list';
import { ServiceForm } from '@/components/dashboard/services/service-form';
import { useServices } from '@/hooks/use-services';
import type { Service, NewService } from '@/types/service';

enum FormMode {
  NONE = 0,
  CREATE = 1,
  EDIT = 2,
}

export default function ServicesPage() {
  const router = useRouter();
  const { createService, updateService, isLoading } = useServices();
  const [formMode, setFormMode] = useState<FormMode>(FormMode.NONE);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateNew = () => {
    setSelectedService(null);
    setFormMode(FormMode.CREATE);
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setFormMode(FormMode.EDIT);
  };

  const handleCancel = () => {
    setFormMode(FormMode.NONE);
    setSelectedService(null);
  };

  const handleSubmit = async (data: NewService) => {
    setIsSubmitting(true);
    try {
      if (formMode === FormMode.CREATE) {
        const success = createService(data);
        if (success) {
          setFormMode(FormMode.NONE);
        }
      } else if (formMode === FormMode.EDIT && selectedService) {
        const success = updateService(selectedService.id, data);
        if (success) {
          setFormMode(FormMode.NONE);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#205b86] mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando serviços...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {formMode !== FormMode.NONE && (
            <Button variant="ghost" size="icon" onClick={handleCancel} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-2xl font-bold">
            {formMode === FormMode.CREATE
              ? 'Novo Serviço'
              : formMode === FormMode.EDIT
                ? 'Editar Serviço'
                : 'Gerenciar Serviços'}
          </h1>
        </div>
      </div>

      {formMode === FormMode.NONE ? (
        <ServicesList onCreateNew={handleCreateNew} onEdit={handleEdit} />
      ) : (
        <ServiceForm
          initialData={selectedService || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
