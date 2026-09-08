import { useState } from 'react';
import { contactSchema, PREFERRED_CONTACTS, type ProjectInquiry } from '@shared/projectInquiry';
import { ProjectNavigation } from '../ProjectNavigation';

interface StepContactProps {
  data: ProjectInquiry;
  update: (data: Partial<ProjectInquiry>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepContact({ data, update, onNext, onBack }: StepContactProps) {
  const [errors, setErrors] = useState<{name?: string; email?: string}>({});

  const validateAndNext = () => {
    const result = contactSchema.safeParse(data.contact);
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string } = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (field === 'name' && !fieldErrors.name) fieldErrors.name = issue.message;
        if (field === 'email' && !fieldErrors.email) fieldErrors.email = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onNext();
  };

  const updateContact = (field: keyof ProjectInquiry['contact'], value: string) => {
    update({ contact: { ...data.contact, [field]: value } });
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">
        Tanışalım.
      </h2>
      
      <div className="space-y-6 max-w-xl">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Ad Soyad *</label>
          <input
            type="text"
            value={data.contact.name}
            onChange={(e) => updateContact('name', e.target.value)}
            className={`w-full bg-surface border-b border-white/10 tech-corners px-4 py-4 text-white focus:outline-none transition-colors border-x border-t border-t-transparent border-x-transparent
              ${errors.name ? 'border-b-red-500 focus:border-b-red-500' : 'focus:border-b-accent'}
            `}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">E-posta *</label>
          <input
            type="email"
            value={data.contact.email}
            onChange={(e) => updateContact('email', e.target.value)}
            className={`w-full bg-surface border-b border-white/10 tech-corners px-4 py-4 text-white focus:outline-none transition-colors border-x border-t border-t-transparent border-x-transparent
              ${errors.email ? 'border-b-red-500 focus:border-b-red-500' : 'focus:border-b-accent'}
            `}
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Telefon (İsteğe bağlı)</label>
            <input
              type="tel"
              value={data.contact.phone}
              onChange={(e) => updateContact('phone', e.target.value)}
              className="w-full bg-surface border-b border-white/10 tech-corners px-4 py-4 text-white focus:outline-none focus:border-b-accent transition-colors border-x border-t border-t-transparent border-x-transparent"
              placeholder="+90 555 000 00 00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Şirket / Marka (İsteğe bağlı)</label>
            <input
              type="text"
              value={data.contact.company}
              onChange={(e) => updateContact('company', e.target.value)}
              className="w-full bg-surface border-b border-white/10 tech-corners px-4 py-4 text-white focus:outline-none focus:border-b-accent transition-colors border-x border-t border-t-transparent border-x-transparent"
              placeholder="Şirketiniz"
            />
          </div>
        </div>

        <div className="pt-6">
          <label className="block text-sm font-medium text-text-secondary mb-4">Tercih edilen iletişim yöntemi</label>
          <div className="flex flex-wrap gap-4">
            {PREFERRED_CONTACTS.map((pref) => (
              <button
                key={pref}
                onClick={() => updateContact('preferred', pref)}
                className={`min-h-11 px-5 py-3 text-sm tech-corners border transition-all 
                  ${data.contact.preferred === pref 
                    ? 'bg-accent border-accent text-black font-medium' 
                    : 'bg-surface border-white/10 text-text-secondary hover:text-white hover:border-white/30'
                  }
                `}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ProjectNavigation 
        onNext={validateAndNext} 
        onBack={onBack} 
      />
    </div>
  );
}
