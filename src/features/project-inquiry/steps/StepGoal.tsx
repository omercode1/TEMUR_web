import { useEffect, useRef } from 'react';
import { type ProjectInquiry } from '@shared/projectInquiry';
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
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (hasFinePointer) textareaRef.current?.focus();
  }, []);

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
          placeholder="Ne yapmak istediğinizi, mevcut problemi veya hedefinizi kısaca anlatabilirsiniz."
          className="w-full min-h-[180px] sm:min-h-[200px] bg-surface border border-white/10 tech-corners p-4 sm:p-6 text-base sm:text-lg placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors resize-y"
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
