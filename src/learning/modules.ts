import type { QuizDefinition } from './quiz';

export type ModuleKey =
  | 'antiDopingBasics'
  | 'wadaRules'
  | 'testingProcedures'
  | 'tue'
  | 'supplements';

export type ModuleSlug =
  | 'anti-doping-basics'
  | 'wada-rules'
  | 'testing-procedures'
  | 'tue'
  | 'supplements';

export type LessonSection = {
  title: string;
  content: string[];
};

export type LearningModule = {
  slug: ModuleSlug;
  moduleKey: ModuleKey;
  route: `/modules/${ModuleSlug}`;
  title: string;
  shortTitle: string;
  xpReward: number;
  sections: LessonSection[];
  quiz: QuizDefinition;
};

export const learningModulesBySlug: Record<ModuleSlug, LearningModule> = {
  'anti-doping-basics': {
    slug: 'anti-doping-basics',
    moduleKey: 'antiDopingBasics',
    route: '/modules/anti-doping-basics',
    title: 'Anti-Doping Basics',
    shortTitle: 'Anti-Doping Basics',
    xpReward: 20,
    sections: [
      {
        title: 'What is doping?',
        content: [
          'Doping is the use of prohibited substances or methods to improve performance in sport.',
          'Anti-doping rules protect athlete health, fair competition, and trust in results.',
        ],
      },
      {
        title: 'Why it matters',
        content: [
          'A violation can lead to bans, lost medals, reputation damage, and health risks.',
          'Athletes are responsible for what enters their body, even when the substance was taken by mistake.',
        ],
      },
      {
        title: 'Clean sport mindset',
        content: [
          'Check medicines, supplements, and treatment decisions before use.',
          'Ask qualified medical or anti-doping support staff when you are unsure.',
        ],
      },
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: 'basics-1',
          question: 'What is the main goal of anti-doping rules?',
          options: [
            'To protect clean sport and athlete health',
            'To stop athletes from training hard',
            'To replace coaches during competition',
          ],
          correctOptionIndex: 0,
          explanation:
            'Anti-doping rules are designed to protect athlete health, fairness, and integrity.',
        },
        {
          id: 'basics-2',
          question: 'Who is responsible for what enters an athlete body?',
          options: [
            'Only the team doctor',
            'Only the supplement company',
            'The athlete',
          ],
          correctOptionIndex: 2,
          explanation:
            'Athletes have strict liability for substances found in their samples.',
        },
      ],
    },
  },
  'wada-rules': {
    slug: 'wada-rules',
    moduleKey: 'wadaRules',
    route: '/modules/wada-rules',
    title: 'WADA Rules',
    shortTitle: 'WADA Rules',
    xpReward: 20,
    sections: [
      {
        title: 'What is WADA?',
        content: [
          'The World Anti-Doping Agency supports clean sport globally and publishes the World Anti-Doping Code.',
          'Sports organizations use these rules to run education, testing, investigations, and results management.',
        ],
      },
      {
        title: 'Athlete responsibilities',
        content: [
          'Know the rules that apply to your sport and competition level.',
          'Check medicines before use, be available for testing, and give accurate information when required.',
        ],
      },
      {
        title: 'Strict liability',
        content: [
          'A violation can happen even if the athlete did not intend to cheat.',
          'That is why checking every medicine and supplement is part of the athlete routine.',
        ],
      },
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: 'wada-1',
          question: 'What does WADA publish for global anti-doping rules?',
          options: [
            'The World Anti-Doping Code',
            'A team selection list',
            'A nutrition-only handbook',
          ],
          correctOptionIndex: 0,
          explanation:
            'The World Anti-Doping Code is the core document used across anti-doping programs.',
        },
        {
          id: 'wada-2',
          question: 'What does strict liability mean?',
          options: [
            'Only coaches can be sanctioned',
            'Athletes are responsible for substances found in their samples',
            'Testing only happens after finals',
          ],
          correctOptionIndex: 1,
          explanation:
            'Strict liability means the athlete is responsible for what is found in their body.',
        },
      ],
    },
  },
  'testing-procedures': {
    slug: 'testing-procedures',
    moduleKey: 'testingProcedures',
    route: '/modules/testing-procedures',
    title: 'Testing Procedures',
    shortTitle: 'Testing Procedures',
    xpReward: 20,
    sections: [
      {
        title: 'How testing starts',
        content: [
          'An athlete can be notified for testing in competition or out of competition.',
          'After notification, the athlete should stay with the doping control officer or chaperone until the sample is collected.',
        ],
      },
      {
        title: 'Sample collection',
        content: [
          'The athlete verifies collection equipment, provides a sample, and seals it using the required procedure.',
          'The paperwork should be checked carefully before signing.',
        ],
      },
      {
        title: 'Athlete rights',
        content: [
          'Athletes can usually request a representative, ask questions, and record concerns on the doping control form.',
          'Delaying or refusing a valid test can itself become an anti-doping rule violation.',
        ],
      },
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: 'testing-1',
          question: 'What should an athlete do after being notified for testing?',
          options: [
            'Leave and return later without permission',
            'Stay with the official until the process is complete',
            'Ask a teammate to test instead',
          ],
          correctOptionIndex: 1,
          explanation:
            'After notification, the athlete should remain under observation until sample collection is complete.',
        },
        {
          id: 'testing-2',
          question: 'Why should an athlete review the doping control form?',
          options: [
            'To confirm details and record concerns before signing',
            'To choose their competition lane',
            'To change their official result',
          ],
          correctOptionIndex: 0,
          explanation:
            'The form documents the sample collection process and should be checked carefully.',
        },
      ],
    },
  },
  tue: {
    slug: 'tue',
    moduleKey: 'tue',
    route: '/modules/tue',
    title: 'Therapeutic Use Exemptions',
    shortTitle: 'TUE',
    xpReward: 20,
    sections: [
      {
        title: 'What is a TUE?',
        content: [
          'A Therapeutic Use Exemption allows an athlete to use a prohibited substance or method for a legitimate medical condition when the criteria are met.',
          'A TUE is not automatic just because a doctor prescribed a medicine.',
        ],
      },
      {
        title: 'When it matters',
        content: [
          'Athletes should check whether treatment contains a prohibited substance before using it.',
          'Some athletes need approval before treatment, while emergency care may be handled through a retroactive process depending on the rules.',
        ],
      },
      {
        title: 'Keep records',
        content: [
          'Medical documentation, diagnosis details, and prescriptions can be important for a TUE application.',
          'When unsure, contact your sport organization or anti-doping support contact before competing.',
        ],
      },
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: 'tue-1',
          question: 'What does a TUE allow?',
          options: [
            'Use of a prohibited treatment when medical criteria are met',
            'Skipping all anti-doping tests',
            'Taking any supplement without checking it',
          ],
          correctOptionIndex: 0,
          explanation:
            'A TUE is a medical exemption for specific prohibited treatments when strict criteria are satisfied.',
        },
        {
          id: 'tue-2',
          question: 'Is a doctor prescription always enough for a TUE?',
          options: ['Yes', 'No', 'Only after winning an event'],
          correctOptionIndex: 1,
          explanation:
            'A prescription does not automatically mean anti-doping approval has been granted.',
        },
      ],
    },
  },
  supplements: {
    slug: 'supplements',
    moduleKey: 'supplements',
    route: '/modules/supplements',
    title: 'Supplements and Risks',
    shortTitle: 'Supplements & Risks',
    xpReward: 20,
    sections: [
      {
        title: 'Why supplements are risky',
        content: [
          'Some supplements are contaminated, mislabeled, or mixed with ingredients that are prohibited in sport.',
          'A product being sold legally does not guarantee it is allowed for athletes.',
        ],
      },
      {
        title: 'Risk reduction',
        content: [
          'Use food-first nutrition when possible and speak with qualified professionals before taking supplements.',
          'Prefer products tested by reliable third-party certification programs, while remembering that risk can never be zero.',
        ],
      },
      {
        title: 'Athlete checklist',
        content: [
          'Keep product names, batch numbers, labels, and receipts.',
          'Stop and ask for help when an ingredient name, claim, or source seems unclear.',
        ],
      },
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: 'supplements-1',
          question: 'Why can supplements be risky for athletes?',
          options: [
            'They can be contaminated or mislabeled',
            'They always improve testing results',
            'They remove the need for nutrition planning',
          ],
          correctOptionIndex: 0,
          explanation:
            'Contamination and mislabeling are common reasons supplements create anti-doping risk.',
        },
        {
          id: 'supplements-2',
          question: 'What is a good supplement risk-reduction habit?',
          options: [
            'Ignore batch details',
            'Keep labels, batch numbers, and receipts',
            'Trust every online claim',
          ],
          correctOptionIndex: 1,
          explanation:
            'Records can help document what was used and support better decisions.',
        },
      ],
    },
  },
};

export const learningModules = Object.values(learningModulesBySlug);

export const getLearningModuleBySlug = (slug: ModuleSlug) =>
  learningModulesBySlug[slug];
