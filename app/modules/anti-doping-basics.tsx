import { LearningModuleScreen } from '../../src/components/learning/learning-module-screen';
import { getLearningModuleBySlug } from '../../src/learning/modules';

export default function AntiDopingBasicsScreen() {
  const module = getLearningModuleBySlug(
    'anti-doping-basics'
  );

  return (
    <LearningModuleScreen
      module={module}
    />
  );
}