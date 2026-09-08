import { motion } from 'motion/react';
import { PROJECT_TYPES, type ProjectInquiry, type ProjectType } from '@shared/projectInquiry';
import { ProjectNavigation } from '../ProjectNavigation';

interface StepTypeProps {
  data: ProjectInquiry;
  update: (data: Partial<ProjectInquiry>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepType({ data, update, onNext, onBack }: StepTypeProps) {
  const handleSelect = (type: ProjectType) => {
    update({ type });
  };

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">
        Ne geliştirmek istiyorsunuz?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROJECT_TYPES.map((type, i) => {
          const isSelected = data.type === type;
          return (
            <motion.button
              key={type}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleSelect(type)}
              className={`min-h-16 text-left p-4 sm:p-6 tech-corners transition-all duration-300 border
                ${isSelected 
                  ? 'bg-accent/10 border-accent text-white shadow-[0_0_20px_rgba(79,70,229,0.1)]' 
                  : 'bg-surface border-white/10 text-text-secondary hover:border-white/30 hover:text-white hover:bg-white/[0.02]'
                }
              `}
            >
              <span className="block font-medium text-lg">{type}</span>
            </motion.button>
          );
        })}
      </div>

      <ProjectNavigation 
        onNext={onNext} 
        onBack={onBack} 
        nextDisabled={!data.type} 
      />
    </div>
  );
}
