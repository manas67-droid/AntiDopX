import { LearningModuleScreen } from '../../src/components/learning/learning-module-screen';
import { getLearningModuleBySlug } from '../../src/learning/modules';

export default function AntiDopingBasicsScreen() {
<<<<<<< HEAD
  return (
    <LearningModuleScreen
      module={getLearningModuleBySlug('anti-doping-basics')}
=======
  const module = getLearningModuleBySlug(
    'anti-doping-basics'
  );

  return (
    <LearningModuleScreen
      module={module}
>>>>>>> 66c7512ca09613133e2d6dc048c9b0e50c760da7
    />
  );
}