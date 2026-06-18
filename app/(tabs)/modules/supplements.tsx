import { LearningModuleScreen } from '../../../src/components/learning/learning-module-screen';
import { getLearningModuleBySlug } from '../../../src/learning/modules';

export default function SupplementsScreen() {
  return (
    <LearningModuleScreen
      module={getLearningModuleBySlug('supplements')}
    />
  );
}
