import { motion } from 'motion/react';
import { ProjectInquiry, ProjectBudget } from '../../../types/project';
import { PROJECT_BUDGETS } from '../../../config/projectFormConfig';
import { ProjectNavigation } from '../ProjectNavigation';

interface StepBudgetProps {
  data: ProjectInquiry;
  update: (data: Partial<ProjectInquiry>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepBudget({ data, update, onNext, onBack }: StepBudgetProps) {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
        Proje için düşündüğünüz bütçe nedir?
      </h2>
      <p className="text-text-secondary mb-8 text-sm">
        Bütçe, projenin kapsamını doğru planlayabilmemiz için kullanılır. Bu rakamlar sabit fiyatlar değildir.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PROJECT_BUDGETS.map((budget, i) => {
          const isSelected = data.budget === budget;
          return (
            <motion.button
              key={budget}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => update({ budget })}
              className={`text-left px-6 py-5 tech-corners transition-all duration-300 border
                ${isSelected 
                  ? 'bg-accent/10 border-accent text-white shadow-[0_0_15px_rgba(79,70,229,0.1)]' 
                  : 'bg-surface border-white/10 text-text-secondary hover:border-white/30 hover:text-white hover:bg-white/[0.02]'
                }
              `}
            >
              <span className="block font-medium">{budget}</span>
            </motion.button>
          );
        })}
      </div>

      <ProjectNavigation 
        onNext={onNext} 
        onBack={onBack} 
        nextDisabled={!data.budget} 
      />
    </div>
  );
}
