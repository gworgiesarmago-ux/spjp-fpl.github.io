import { PersonData } from '../data/portfolioData';
import CristelPage from '../themes/CristelPage';
import GeorgePage from '../themes/GeorgePage';
import MeganPage from '../themes/MeganPage';
import DenverPage from '../themes/DenverPage';
import GroupPage from '../themes/GroupPage';

interface Props {
  person: PersonData;
  onBack: () => void;
}

export default function PersonPage({ person, onBack }: Props) {
  if (person.id === 'group')   return <GroupPage   person={person} onBack={onBack} />;
  if (person.id === 'cristel') return <CristelPage person={person} onBack={onBack} />;
  if (person.id === 'fana')    return <GeorgePage  person={person} onBack={onBack} />;
  if (person.id === 'george')  return <MeganPage   person={person} onBack={onBack} />;
  if (person.id === 'denver')  return <DenverPage  person={person} onBack={onBack} />;
  return null;
}
