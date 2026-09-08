import { motion } from 'motion/react';
import { FEATURE_NEEDS, OTHER_FEATURE_LABEL, type FeatureNeed, type ProjectInquiry } from '@shared/projectInquiry';
import { ProjectNavigation } from '../ProjectNavigation';

interface StepFeaturesProps {
  data: ProjectInquiry;
  update: (data: Partial<ProjectInquiry>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepFeatures({ data, update, onNext, onBack }: StepFeaturesProps) {
  
  const toggleFeature = (feature: FeatureNeed) => {
    const isSelected = data.features.includes(feature);
    if (isSelected) {
      update({ features: data.features.filter((f) => f !== feature) });
    } else {
      update({ features: [...data.features, feature] });
    }
  };

  const hasOther = data.features.includes(OTHER_FEATURE_LABEL);

  const handleOtherToggle = () => {
    if (hasOther) {
      update({
        features: data.features.filter((f) => f !== OTHER_FEATURE_LABEL),
        otherFeatures: '',
      });
    } else {
      update({ features: [...data.features, OTHER_FEATURE_LABEL] });
    }
  };

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
        Neler gerekli?
      </h2>
      <p className="text-text-secondary mb-8">
        Birden fazla seçim yapabilirsiniz.
      </p>
      
      <div className="flex flex-wrap gap-3 mb-6">
        {FEATURE_NEEDS.map((feature, i) => {
          const isSelected = data.features.includes(feature);
          return (
            <motion.button
              key={feature}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              onClick={() => toggleFeature(feature)}
              className={`min-h-11 px-5 py-3 text-sm tech-corners transition-all duration-300 border
                ${isSelected 
                  ? 'bg-accent border-accent text-black font-medium' 
                  : 'bg-surface border-white/10 text-text-secondary hover:border-white/30 hover:text-white'
                }
              `}
            >
              {feature}
            </motion.button>
          );
        })}
        
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: FEATURE_NEEDS.length * 0.02 }}
          onClick={handleOtherToggle}
          className={`min-h-11 px-5 py-3 text-sm tech-corners transition-all duration-300 border
            ${hasOther 
              ? 'bg-accent border-accent text-black font-medium' 
              : 'bg-surface border-white/10 text-text-secondary hover:border-white/30 hover:text-white'
            }
          `}
        >
          Başka bir şey
        </motion.button>
      </div>

      {hasOther && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4"
        >
          <input
            type="text"
            value={data.otherFeatures || ''}
            onChange={(e) => update({ otherFeatures: e.target.value })}
            placeholder="Lütfen belirtin..."
            className="w-full bg-surface border border-white/10 border-b-white/30 tech-corners px-4 py-4 text-white focus:outline-none focus:border-b-accent transition-colors"
          />
        </motion.div>
      )}

      <ProjectNavigation 
        onNext={onNext} 
        onBack={onBack} 
        nextDisabled={data.features.length === 0} 
      />
    </div>
  );
}
