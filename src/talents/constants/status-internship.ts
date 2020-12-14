import { INTERNSHIP_STATUS } from '../../app/index.d';

export const STATUS_INTERNSHIP_CLASS_NAMES = {
  [INTERNSHIP_STATUS.NON_STARTED]: 'not-started-internship',
  [INTERNSHIP_STATUS.ONGOING]: 'ongoing-internship',
  [INTERNSHIP_STATUS.ABANDONED]: 'abandoned-internship',
  [INTERNSHIP_STATUS.FINISHED]: 'finished-internship',
  [INTERNSHIP_STATUS.NONE]: 'none',
  ['IS_FINISHING']: 'is-finishing-internship',
};

export function getInternshipStatusClassname(
  status: INTERNSHIP_STATUS | undefined,
  isInternshipFinishing: boolean): string
{
  const statusInternship = status || INTERNSHIP_STATUS.NONE;
  const uiStatusInternship = (isInternshipFinishing) ? 'IS_FINISHING' : statusInternship;

  return STATUS_INTERNSHIP_CLASS_NAMES[uiStatusInternship];
}