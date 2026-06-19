<<<<<<< HEAD
import { LearningModuleScreen } from '../../src/components/learning/learning-module-screen';
import { getLearningModuleBySlug } from '../../src/learning/modules';

export default function TueScreen() {
  return (
    <LearningModuleScreen
      module={getLearningModuleBySlug('tue')}
    />
  );
}
=======
import React from 'react';
import { LearningModuleScreen } from '../../src/components/learning/learning-module-screen';
import { getLearningModuleBySlug } from '../../src/learning/modules';

export default function TUEScreen() {
  const module = getLearningModuleBySlug('tue');

  if (!module) {
    return null;
  }

  return (
    <LearningModuleScreen
      module={module}
    />
  );
}
>>>>>>> 66c7512ca09613133e2d6dc048c9b0e50c760da7
