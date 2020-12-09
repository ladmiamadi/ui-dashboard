import { INTERNSHIP_STATUS } from '../../app/index.d';

enum IS_FINISHING_ENUM {
  'IS_FINISHING' = 'IS_FINISHING',
}

type UI_INTERNSHIP_STATUS = INTERNSHIP_STATUS | IS_FINISHING_ENUM;

export const STATUS_INTERNSHIP_CLASS_NAMES: { [status in UI_INTERNSHIP_STATUS]: string } = {
  [INTERNSHIP_STATUS.NON_STARTED]: 'notStarted-internship',
  [INTERNSHIP_STATUS.ONGOING]: 'ongoing-internship',
  [INTERNSHIP_STATUS.ABANDONED]: 'abandoned-internship',
  [INTERNSHIP_STATUS.FINISHED]: 'finished-internship',
  [INTERNSHIP_STATUS.NONE]: 'none',
  [IS_FINISHING_ENUM.IS_FINISHING]: 'is-finishing-internship',
};

export function getInternshipStatusClassname(
  status: INTERNSHIP_STATUS | undefined,
  isInternshipFinishing: boolean,
): string {
  const statusInternship = status || INTERNSHIP_STATUS.NONE;

  const uiStatusInternship =
    (isInternshipFinishing)
      ? IS_FINISHING_ENUM.IS_FINISHING
      : statusInternship;

  return STATUS_INTERNSHIP_CLASS_NAMES[uiStatusInternship];
}