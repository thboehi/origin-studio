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

export type FinalCTATranslations = {
  title: string;
  button: string;
};

export interface ContactTranslations {
  title: string;
  subtitle: string;
  infoTitle: string;
  infoSubtitle: string;
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

export type TestimonialsTranslations = {
  title: string;
  placeholder: string;
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
    customers: string;
    whyUs: string;
    pricing: string;
  };
  aboutUs: {
    title: string;
    aboutUs: string;
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
    starter: {
      name: string;
      mountainInfo: string;
      mountainDescription: string;
      description: string;
      price: string;
      features: string[];
      cta: string;
    };
    business: {
      name: string;
      mountainInfo: string;
      mountainDescription: string;
      description: string;
      price: string;
      features: string[];
      cta: string;
      highlighted: boolean;
    };
    enterprise: {
      name: string;
      mountainInfo: string;
      mountainDescription: string;
      description: string;
      price: string;
      features: string[];
      cta: string;
    };
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
