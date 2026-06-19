import { LearningModuleScreen } from '../../src/components/learning/learning-module-screen';
import { getLearningModuleBySlug } from '../../src/learning/modules';

export default function TestingProceduresScreen() {
  const module = getLearningModuleBySlug(
    'testing-procedures'
  );

  return (
    <LearningModuleScreen
      module={module}
    />
  );
}