'use client';

import { useState } from 'react';
import { Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Lista de emojis comuns para serviços veterinários
const commonEmojis = [
  '🔍',
  '🐾',
  '❤️',
  '✅',
  '👁️',
  '🦴',
  '🐎',
  '🔬',
  '💉',
  '📚',
  '🩺',
  '🦮',
  '🐈',
  '🐕',
  '🐄',
  '🐖',
  '🐑',
  '🦙',
  '🐇',
  '🦜',
  '💊',
  '🧪',
  '🧬',
  '📋',
  '📱',
  '📊',
  '🏥',
  '🧠',
  '🦷',
  '🦟',
];

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Smile className="h-4 w-4 mr-2" />
          Selecionar
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <div className="grid grid-cols-6 gap-2">
          {commonEmojis.map(emoji => (
            <Button
              key={emoji}
              variant="ghost"
              className="h-9 w-9 p-0"
              onClick={() => handleEmojiClick(emoji)}
            >
              <span className="text-lg">{emoji}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
