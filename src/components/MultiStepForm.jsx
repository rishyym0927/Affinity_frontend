// src/components/MultiStepForm.js
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <AnimatePresence>
        {step === 1 && <FormStep1 onNext={handleNext} />}
        {step === 2 && <FormStep2 onNext={handleNext} onBack={handleBack} />}
        {step === 3 && <FormStep3 onBack={handleBack} />}
      </AnimatePresence>
    </div>
  );
};

export default MultiStepForm;
