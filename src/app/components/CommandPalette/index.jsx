"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { useCommandPalette } from '../../hooks/useCommandPalette';

const commands = [
  { id: 1, name: 'Anasayfa', icon: '🏠', action: () => window.location.href = '/' },
  { id: 2, name: 'Profilim', icon: '👤', action: () => window.location.href = '/profile' },
  { id: 3, name: 'Karanlık Mod', icon: '🌙', action: () => alert('Tema değiştirildi!') },
  { id: 4, name: 'Siparişler', icon: '📦', action: () => console.log('Siparişlere gidiliyor') },
];

export default function CommandPalette() {
  const { isOpen, setIsOpen } = useCommandPalette();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);


  const filteredCommands = useMemo(() => {
    return commands.filter(cmd => 
      cmd.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredCommands[selectedIndex];
        if (selected) {
          selected.action();
          setIsOpen(false); // İşlemden sonra kapat
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-md p-4 overflow-hidden">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Arama Alanı */}
        <div className="flex items-center px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <span className="text-xl mr-3 opacity-50">🔍</span>
          <input
            autoFocus
            className="w-full bg-transparent outline-none text-lg text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400"
            placeholder="Ne yapmak istersiniz?..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="hidden sm:block ml-auto border px-2 py-1 rounded text-xs opacity-40">ESC</kbd>
        </div>

        {/* Sonuç Listesi */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, index) => (
              <button
                key={cmd.id}
                onClick={() => { cmd.action(); setIsOpen(false); }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-150 text-left ${
                  index === selectedIndex 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <span className="text-xl">{cmd.icon}</span>
                <span className="font-medium flex-1">{cmd.name}</span>
                {index === selectedIndex && (
                  <span className="text-xs opacity-70">Seçmek için Enter ⏎</span>
                )}
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-zinc-500">
              Sonuç bulunamadı...
            </div>
          )}
        </div>
      </div>

      {/* Arka Plan Kapatma Alanı */}
      <div className="fixed inset-0 -z-10" onClick={() => setIsOpen(false)} />
    </div>
  );
}