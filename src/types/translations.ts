export type FeaturesTranslations = {
  featuresTitle: string;
  description: string;
  customWebApplications: string;
  design: string;
  ai: string;
  secureSolutions: string;
  customWebApplicationsDesc: string;
  designDesc: string;
  aiDesc: string;
  secureSolutionsDesc: string;
  learnMore: string;
};

export type ProcessTranslations = {
  title: string;
  description: string;
  discovery: string;
  quote: string;
  design: string;
  development: string;
  testing: string;
  deployment: string;
};

export type IdentityTranslations = {
  text: string;
};

export type StrengthsTranslations = {
  title: string;
  quality: {
    title: string;
    description: string;
  };
  proximity: {
    title: string;
    description: string;
  };
  local: {
    title: string;
    description: string;
  };
};

export type TeamMiniTranslations = {
  title: string;
  thomas: {
    name: string;
    role: string;
    description: string;
  };
  eric: {
    name: string;
    role: string;
    description: string;
  };
  shadi: {
    name: string;
    role: string;
    description: string;
  };
};

export type CTATranslations = {
  home: {
    title: string;
    description: string;
    primaryButton: string;
    secondaryButton: string;
  };
  about: {
    title: string;
    description: string;
    primaryButton: string;
    secondaryButton: string;
  };
  projects: {
    title: string;
    description: string;
    primaryButton: string;
    secondaryButton: string;
  };
  contact: {
    title: string;
    description: string;
    primaryButton: string;
  };
};



export interface ContactTranslations {
  title: string;
  subtitle: string;
  infoTitle: string;
  infoSubtitle: string;
  simpleContact: {
    title: string;
    description: string;
    emailLabel: string;
    phoneLabel: string;
    discordLabel: string;
  };
  methods: {
    email: {
      title: string;
      description: string;
    };
    call: {
      title: string;
      description: string;
    };
    address: {
      title: string;
      description: string;
    };
  };
  form: {
    intro: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    loading: string;
    errors: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      messageRequired: string;
      messageMinLength: string;
    };
    messages: {
      success: string;
      errorGeneric: string;
      errorValidation: string;
      errorRateLimit: string;
    };
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
};

export interface ReviewTranslations {
  title: string;
  subtitle: string;
  infoTitle: string;
  infoSubtitle: string;
  whyReview: {
    title: string;
    description: string;
  };
  confirmation: {
    title: string;
    description: string;
  };
  form: {
    intro: string;
    firstName: string;
    firstNamePlaceholder: string;
    lastName: string;
    lastNamePlaceholder: string;
    company: string;
    companyPlaceholder: string;
    email: string;
    emailPlaceholder: string;
    rating: string;
    ratingHint: string;
    text: string;
    textPlaceholder: string;
    image: string;
    imageHint: string;
    consent: string;
    savedInfo: string;
    submit: string;
    sending: string;
    loading: string;
    errors: {
      firstNameRequired: string;
      lastNameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      ratingRequired: string;
      textRequired: string;
      textMinLength: string;
      imageSize: string;
      imageType: string;
      consentRequired: string;
    };
    messages: {
      success: string;
      errorGeneric: string;
      errorValidation: string;
      errorRateLimit: string;
    };
  };
};

export type TestimonialsTranslations = {
  title: string;
  placeholder: string;
  showMore: string;
  showLess: string;
};

export type TechStackTranslations = {
  title: string;
  subtitle: string;
};

export type AboutTranslations = {
  title: string;
  subtitle: string;
  intro: string;
  story: {
    title: string;
    description: string;
  };
  mission: {
    title: string;
    description: string;
  };
  team: {
    title: string;
    description: string;
    protectionMessage: string;
    commercial: {
      name: string;
      title: string;
      description: string;
    };
    backend: {
      name: string;
      title: string;
      description: string;
    };
    frontend: {
      name: string;
      title: string;
      description: string;
    };
  };
  values: {
    title: string;
    description: string;
    local: {
      title: string;
      description: string;
    };
    quality: {
      title: string;
      description: string;
    };
    commitment: {
      title: string;
      description: string;
    };
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
};

export type ProjectsTranslations = {
  title: string;
  description: string;
  viewProject: string;
  pinnedProjects: {
    title: string;
    subtitle: string;
  };
  allProjects: {
    title: string;
  };
  actions: {
    seeMore: string;
    visitProject: string;
    clickToSeeMore: string;
  };
  modal: {
    descriptionTitle: string;
  };
};

export type NotFoundTranslations = {
  title: string;
  description: string;
  homeButton: string;
  aboutButton: string;
};

export type FooterTranslations = {
  description: string;
  services: {
    title: string;
    features: string;
    projects: string;
    faq: string;
    pricing: string;
  };
  aboutUs: {
    title: string;
    aboutUs: string;
    values: string;
    careers: string;
    blog: string;
    contact: string;
  };
  contact: {
    title: string;
    support: string;
    partners: string;
  };
};

export type ServicesTranslations = {
  title: string;
  subtitle: string;
  intro: string;
  services: {
    title: string;
    description: string;
    items: Array<{
      id: string;
      title: string;
      shortDescription: string;
      description: string;
      features: string[];
    }>;
  };
  process: {
    title: string;
    description: string;
    durationLabel: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
      duration: string;
    }>;
  };
  technologies: {
    title: string;
    description: string;
    categories: Array<{
      name: string;
      items: string[];
    }>;
  };
  packages: {
    title: string;
    description: string;
    bestOffer: string;
    categories: Array<{
      id: string;
      title: string;
      description: string;
      badge?: string;
      packages: Array<{
        name: string;
        description: string;
        price: string;
        originalPrice?: string;
        paymentOptions?: string;
        highlighted?: boolean;
        details: Array<{
          label: string;
          value: string;
        }>;
        advantages?: string[];
        conditions?: string[];
        cta: string;
      }>;
    }>;
  };
  useCases: {
    title: string;
    description: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  faq: {
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    primaryButton: string;
    secondaryButton: string;
  };
};

export type LegalSection = {
  title: string;
  content: string;
};

export type LegalTranslations = {
  terms: {
    title: string;
    lastUpdated: string;
    sections: {
      [key: string]: LegalSection;
    };
  };
  privacy: {
    title: string;
    lastUpdated: string;
    sections: {
      [key: string]: LegalSection;
    };
  };
  cookies: {
    title: string;
    lastUpdated: string;
    sections: {
      [key: string]: LegalSection;
    };
  };
};
