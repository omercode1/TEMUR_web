import { motion } from 'motion/react';
import { PROJECT_STAGES, type ProjectInquiry } from '@shared/projectInquiry';
import { ProjectNavigation } from '../ProjectNavigation';

interface StepStageProps {
  data: ProjectInquiry;
  update: (data: Partial<ProjectInquiry>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepStage({ data, update, onNext, onBack }: StepStageProps) {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">
        Proje şu anda hangi aşamada?
      </h2>
      
      <div className="flex flex-col gap-3">
        {PROJECT_STAGES.map((stage, i) => {
          const isSelected = data.stage === stage;
          return (
            <motion.button
              key={stage}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => update({ stage })}
              className={`text-left px-6 py-5 tech-corners transition-all duration-300 border
                ${isSelected 
                  ? 'bg-accent/10 border-accent text-white shadow-[0_0_20px_rgba(79,70,229,0.1)]' 
                  : 'bg-surface border-white/10 text-text-secondary hover:border-white/30 hover:text-white hover:bg-white/[0.02]'
                }
              `}
            >
              <span className="block font-medium">{stage}</span>
            </motion.button>
          );
        })}
      </div>

      <ProjectNavigation 
        onNext={onNext} 
        onBack={onBack} 
        nextDisabled={!data.stage} 
      />
    </div>
  );
}
