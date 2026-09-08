import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { INITIAL_FORM_STATE, type ProjectInquiry } from '@shared/projectInquiry';
import {
  FORM_STEP_COUNT,
  STORAGE_KEY,
  submitProjectInquiry,
  ProjectIntro,
  StepType,
  StepGoal,
  StepStage,
  StepFeatures,
  StepBudget,
  StepTimeline,
  StepContact,
  ProjectSummary,
  ProjectSuccess,
} from '@/features/project-inquiry';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { SITE } from '@/config/site';

export function StartProject() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<ProjectInquiry>(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_FORM_STATE,
          ...parsed,
          contact: INITIAL_FORM_STATE.contact,
        };
      } catch {
        return INITIAL_FORM_STATE;
      }
    }
    return INITIAL_FORM_STATE;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const prefersReducedMotion = useReducedMotion();

  const getStepVariants = () => {
    if (prefersReducedMotion) {
      return {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      };
    }
    return stepVariants;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const { contact: _contact, ...safeDraft } = formData;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(safeDraft));
  }, [formData]);

  const nextStep = () => {
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const goToStep = (targetStep: number) => {
    setDirection(targetStep > step ? 1 : -1);
    setStep(targetStep);
  };

  const updateForm = (data: Partial<ProjectInquiry>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const payload = { ...formData, _hp: honeypot };
      const result = await submitProjectInquiry(payload as ProjectInquiry);
      if (result.success) {
        setIsSuccess(true);
        setInquiryId(result.inquiryId || null);
        sessionStorage.removeItem(STORAGE_KEY);
      } else {
        setSubmitError(result.error || 'Beklenmeyen bir hata oluştu.');
      }
    } catch {
      setSubmitError('Sistem şu anda gönderimleri kabul edemiyor. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = `${(step / FORM_STEP_COUNT) * 100}%`;

  return (
    <GradientBackground className="text-white selection:bg-accent/30 selection:text-white overflow-x-hidden flex flex-col">
      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <label htmlFor="hp_email">Lütfen bu alanı boş bırakın</label>
        <input
          type="text"
          id="hp_email"
          name="hp_email"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between z-50 relative">
        <Link to="/" className="font-display font-bold text-xl tracking-tight text-white flex items-center">
          {SITE.name}<span className="text-white/30 font-normal ml-1.5 text-lg">{SITE.tag}</span>
        </Link>
        {!isSuccess && (
          <Link to="/" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">
            İptal
          </Link>
        )}
      </header>

      {!isSuccess && step > 0 && (
        <div className="w-full h-px bg-white/5 relative z-40">
          <motion.div
            className="absolute left-0 top-0 h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: progress }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
          />
        </div>
      )}

      <main className="flex-1 flex flex-col items-center justify-start sm:justify-center relative w-full px-4 sm:px-6 py-8 sm:py-12 pb-[calc(2rem+env(safe-area-inset-bottom))]">
        <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-center overflow-hidden">
          <div className="w-[1px] h-full bg-white/10 relative">
            <motion.div
              className="absolute top-0 left-0 w-full bg-accent"
              initial={{ height: '0%' }}
              animate={{ height: progress }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.2 }}
            />
          </div>
        </div>

        <div className="w-full max-w-3xl relative z-10 flex-1 flex flex-col">
          {isSuccess ? (
            <ProjectSuccess inquiryId={inquiryId} />
          ) : (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={getStepVariants()}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex-1 flex flex-col justify-center"
              >
                {step === 0 && <ProjectIntro onNext={nextStep} />}
                {step === 1 && <StepType data={formData} update={updateForm} onNext={nextStep} onBack={prevStep} />}
                {step === 2 && <StepGoal data={formData} update={updateForm} onNext={nextStep} onBack={prevStep} />}
                {step === 3 && <StepStage data={formData} update={updateForm} onNext={nextStep} onBack={prevStep} />}
                {step === 4 && <StepFeatures data={formData} update={updateForm} onNext={nextStep} onBack={prevStep} />}
                {step === 5 && <StepBudget data={formData} update={updateForm} onNext={nextStep} onBack={prevStep} />}
                {step === 6 && <StepTimeline data={formData} update={updateForm} onNext={nextStep} onBack={prevStep} />}
                {step === 7 && <StepContact data={formData} update={updateForm} onNext={nextStep} onBack={prevStep} />}
                {step === 8 && (
                  <ProjectSummary
                    data={formData}
                    onBack={prevStep}
                    onEdit={goToStep}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    submitError={submitError}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>
    </GradientBackground>
  );
}

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -30 : 30,
    opacity: 0,
  }),
};
