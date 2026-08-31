import { useEffect, useRef, KeyboardEvent } from 'react';
import { ProjectInquiry } from '../../../types/project';
import { ProjectNavigation } from '../ProjectNavigation';

interface StepGoalProps {
  data: ProjectInquiry;
  update: (data: Partial<ProjectInquiry>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepGoal({ data, update, onNext, onBack }: StepGoalProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Focus the textarea automatically
    textareaRef.current?.focus();
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Prompt says: "Textarea Enter must create a new line, NOT submit."
      // Default textarea behavior handles shift+enter and enter for new line.
      // So we do nothing special here to prevent submitting.
    }
  };

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
        Bu projeyle neyi çözmek istiyorsunuz?
      </h2>
      <p className="text-text-secondary mb-8">
        Kısa bir açıklama yeterli.
      </p>
      
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={data.goal}
          onChange={(e) => update({ goal: e.target.value })}
          onKeyDown={handleKeyDown}
          placeholder="Ne yapmak istediğinizi, mevcut problemi veya hedefinizi kısaca anlatabilirsiniz."
          className="w-full min-h-[200px] bg-surface border border-white/10 tech-corners p-6 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors resize-y"
          maxLength={2000}
        />
        <div className="absolute bottom-4 right-4 text-xs text-white/30">
          {data.goal.length} / 2000
        </div>
      </div>

      <ProjectNavigation 
        onNext={onNext} 
        onBack={onBack} 
        nextDisabled={data.goal.trim().length < 5} 
      />
    </div>
  );
}
