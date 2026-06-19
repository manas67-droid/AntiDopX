import { LearningModuleScreen } from '../../src/components/learning/learning-module-screen';
import { getLearningModuleBySlug } from '../../src/learning/modules';

export default function TestingProceduresScreen() {
<<<<<<< HEAD
  return (
    <LearningModuleScreen
      module={getLearningModuleBySlug('testing-procedures')}
    />
  );
}
=======
  const module = getLearningModuleBySlug(
    'testing-procedures'
  );

  return (
    <LearningModuleScreen
      module={module}
    />
  );
}
>>>>>>> 66c7512ca09613133e2d6dc048c9b0e50c760da7
