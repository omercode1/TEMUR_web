import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ProjectInquiry } from '../types/project';
import { INITIAL_FORM_STATE } from '../config/projectFormConfig';
import { ProjectIntro } from '../components/project/steps/ProjectIntro';
import { StepType } from '../components/project/steps/StepType';
import { StepGoal } from '../components/project/steps/StepGoal';
import { StepStage } from '../components/project/steps/StepStage';
import { StepFeatures } from '../components/project/steps/StepFeatures';
import { StepBudget } from '../components/project/steps/StepBudget';
import { StepTimeline } from '../components/project/steps/StepTimeline';
import { StepContact } from '../components/project/steps/StepContact';
import { ProjectSummary } from '../components/project/steps/ProjectSummary';
import { ProjectSuccess } from '../components/project/steps/ProjectSuccess';
import { submitProjectInquiry } from '../services/projectInquiry';

const STORAGE_KEY = 'temur_project_form';

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
          contact: INITIAL_FORM_STATE.contact // Ensure contact fields are never restored from session
        };
      } catch (e) {
        return INITIAL_FORM_STATE;
      }
    }
    return INITIAL_FORM_STATE;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const getStepVariants = () => {
    if (prefersReducedMotion) {
      return {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 }
      };
    }
    return stepVariants;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Only persist safe project data, not personal contact fields
    const { contact, ...safeDraft } = formData;
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
      const result = await submitProjectInquiry(formData);
      if (result.success) {
        setIsSuccess(true);
        sessionStorage.removeItem(STORAGE_KEY);
      } else {
        setSubmitError(result.error || "Beklenmeyen bir hata oluştu.");
      }
    } catch (error) {
      console.error(error);
      setSubmitError("Sistem şu anda gönderimleri kabul edemiyor. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Header and Layout framing
  return (
    <div className="min-h-[100svh] bg-background text-white selection:bg-accent/30 selection:text-white overflow-hidden flex flex-col">
      {/* Restrained Header */}
      <header className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-between z-50 relative">
        <Link to="/" className="font-display font-bold text-xl tracking-tight text-white flex items-center">
          TEMUR<span className="text-white/30 font-normal ml-1.5 text-lg">STUDIO</span>
        </Link>
        {!isSuccess && (
          <Link to="/" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">
            İptal
          </Link>
        )}
      </header>

      {/* Progress Line */}
      {!isSuccess && step > 0 && (
        <div className="w-full h-px bg-white/5 relative z-40">
          <motion.div
            className="absolute left-0 top-0 h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 8) * 100}%` }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
          />
        </div>
      )}

      {/* Form Content */}
      <main className="flex-1 flex flex-col items-center justify-center relative w-full px-6 py-12">
        {/* Background Visual Structure - abstract line */}
        <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-center overflow-hidden">
          <div className="w-[1px] h-full bg-white/10 relative">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-accent"
              initial={{ height: "0%" }}
              animate={{ height: `${(step / 8) * 100}%` }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.2 }}
            />
          </div>
        </div>

        <div className="w-full max-w-3xl relative z-10 flex-1 flex flex-col">
          {isSuccess ? (
            <ProjectSuccess />
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
                {step === 8 && <ProjectSummary data={formData} onBack={prevStep} onEdit={goToStep} onSubmit={handleSubmit} isSubmitting={isSubmitting} submitError={submitError} />}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>
    </div>
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
