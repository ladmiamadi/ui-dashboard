import { INTERNSHIP_STATUS } from '../../app/index.d';

export const STATUS_INTERNSHIP_CLASS_NAMES: { [status in INTERNSHIP_STATUS]: string } = {
  [INTERNSHIP_STATUS.NON_STARTED]: 'notStarted-internship',
  [INTERNSHIP_STATUS.ONGOING]: 'ongoing-internship',
  [INTERNSHIP_STATUS.ABANDONED]: 'abandoned-internship',
  [INTERNSHIP_STATUS.FINISHED]: 'finished-internship',
  [INTERNSHIP_STATUS.NONE]: 'none',
};

export function getInternshipStatusClassname(status?: INTERNSHIP_STATUS): string {
  const statusInternship = status || INTERNSHIP_STATUS.NONE;

  return STATUS_INTERNSHIP_CLASS_NAMES[statusInternship];
}