"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSpamShield } from "@/hooks/useSpamShield";
import { ContactTranslations } from "@/types/translations";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactFormProps {
  translations: ContactTranslations["form"];
}

export default function ContactForm({ translations }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const { honeypotName, honeypotValue, setHoneypot, nonce, isReady, validateSubmission } = useSpamShield();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = translations.errors.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = translations.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = translations.errors.emailInvalid;
    }

    if (!formData.message.trim()) {
      newErrors.message = translations.errors.messageRequired;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = translations.errors.messageMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setSubmitMessage("");

    // Client-side validation
    if (!validateForm()) {
      setSubmitMessage(translations.messages.errorValidation);
      return;
    }

    // Spam shield validation
    const spamCheck = validateSubmission();
    if (!spamCheck.valid) {
      setSubmitMessage(spamCheck.error || translations.messages.errorGeneric);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          [honeypotName]: honeypotValue,
          nonce,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage(translations.messages.success);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setErrors({});
      } else if (response.status === 429) {
        setSubmitStatus("error");
        setSubmitMessage(translations.messages.errorRateLimit);
      } else if (response.status === 422) {
        setSubmitStatus("error");
        setSubmitMessage(data.message || translations.messages.errorValidation);
      } else {
        setSubmitStatus("error");
        setSubmitMessage(translations.messages.errorGeneric);
      }
    } catch {
      setSubmitStatus("error");
      setSubmitMessage(translations.messages.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="text-center text-lg text-neutral-400 mb-8">
        {translations.intro}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field - hidden from users */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <Label htmlFor={honeypotName}>Website</Label>
          <Input
            id={honeypotName}
            name={honeypotName}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypotValue}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="name" required>
            {translations.name}
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder={translations.namePlaceholder}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label htmlFor="email" required>
            {translations.email}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={translations.emailPlaceholder}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label htmlFor="phone">{translations.phone}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder={translations.phonePlaceholder}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label htmlFor="message" required>
            {translations.message}
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder={translations.messagePlaceholder}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            error={errors.message}
            disabled={isSubmitting}
            rows={6}
          />
        </div>

        {submitMessage && (
          <div
            className={`p-4 rounded-lg text-center ${
              submitStatus === "success"
                ? "bg-green-900/20 border border-green-700 text-green-400"
                : "bg-red-900/20 border border-red-700 text-red-400"
            }`}
            role="alert"
          >
            {submitMessage}
          </div>
        )}

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          disabled={isSubmitting || !isReady}
          className="w-full"
        >
          {!isReady ? translations.loading : isSubmitting ? translations.sending : translations.submit}
        </Button>
      </form>
    </div>
  );
}
