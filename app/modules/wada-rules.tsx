import { LearningModuleScreen } from '../../src/components/learning/learning-module-screen';
import { getLearningModuleBySlug } from '../../src/learning/modules';

export default function WadaRulesScreen() {
  return (
    <LearningModuleScreen
      module={getLearningModuleBySlug('wada-rules')}
    />
  );
}
