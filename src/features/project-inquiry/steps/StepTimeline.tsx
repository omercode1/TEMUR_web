import { motion } from 'motion/react';
import { PROJECT_TIMELINES, type ProjectInquiry } from '@shared/projectInquiry';
import { ProjectNavigation } from '../ProjectNavigation';

interface StepTimelineProps {
  data: ProjectInquiry;
  update: (data: Partial<ProjectInquiry>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepTimeline({ data, update, onNext, onBack }: StepTimelineProps) {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">
        Ne zaman başlamayı düşünüyorsunuz?
      </h2>
      
      <div className="flex flex-col gap-3 mb-8">
        {PROJECT_TIMELINES.map((time, i) => {
          const isSelected = data.timeline === time;
          return (
            <motion.button
              key={time}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => update({ timeline: time })}
              className={`min-h-16 text-left px-4 sm:px-6 py-4 sm:py-5 tech-corners transition-all duration-300 border
                ${isSelected 
                  ? 'bg-accent/10 border-accent text-white shadow-[0_0_15px_rgba(79,70,229,0.1)]' 
                  : 'bg-surface border-white/10 text-text-secondary hover:border-white/30 hover:text-white hover:bg-white/[0.02]'
                }
              `}
            >
              <span className="block font-medium">{time}</span>
            </motion.button>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="pt-6 border-t border-white/10"
      >
        <p className="text-text-secondary mb-4">Belirli bir teslim tarihi var mı?</p>
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            onClick={() => update({ hasDeadline: false, deadlineDate: '' })}
            className={`min-h-11 px-6 py-3 text-sm tech-corners border transition-all ${!data.hasDeadline ? 'bg-accent border-accent text-black font-medium' : 'bg-surface border-white/10 text-text-secondary hover:text-white'}`}
          >
            Hayır
          </button>
          <button
            onClick={() => update({ hasDeadline: true })}
            className={`min-h-11 px-6 py-3 text-sm tech-corners border transition-all ${data.hasDeadline ? 'bg-accent border-accent text-black font-medium' : 'bg-surface border-white/10 text-text-secondary hover:text-white'}`}
          >
            Evet
          </button>
        </div>

        {data.hasDeadline && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <input
              type="text"
              placeholder="Örn: Ekim 2026 veya Q3"
              value={data.deadlineDate || ''}
              onChange={(e) => update({ deadlineDate: e.target.value })}
              className="w-full md:w-1/2 bg-surface border border-white/10 border-b-white/30 tech-corners px-4 py-4 text-white focus:outline-none focus:border-b-accent transition-colors mt-2"
            />
          </motion.div>
        )}
      </motion.div>

      <ProjectNavigation 
        onNext={onNext} 
        onBack={onBack} 
        nextDisabled={!data.timeline || (data.hasDeadline && !data.deadlineDate?.trim())} 
      />
    </div>
  );
}
