import { LearningModuleScreen } from '../../src/components/learning/learning-module-screen';
import { getLearningModuleBySlug } from '../../src/learning/modules';

export default function TestingProceduresScreen() {
  return (
    <LearningModuleScreen
      module={getLearningModuleBySlug('testing-procedures')}
    />
  );
}
