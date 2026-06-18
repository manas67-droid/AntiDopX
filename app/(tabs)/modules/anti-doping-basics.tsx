import { LearningModuleScreen } from '../../../src/components/learning/learning-module-screen';
import { getLearningModuleBySlug } from '../../../src/learning/modules';

export default function AntiDopingBasicsScreen() {
  return (
    <LearningModuleScreen
      module={getLearningModuleBySlug('anti-doping-basics')}
    />
  );
}
