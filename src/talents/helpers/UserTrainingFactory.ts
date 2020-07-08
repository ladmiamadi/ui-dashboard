import { UserTraining } from '../../app';
import { IsFormValid } from '../components/modal/ModalTraining';

export class UserTrainingFactory {
  public static createEmptyUserTraining = (): UserTraining => ({
    institution: '',
    startDate: '',
    endDate: '',
    degreeObtained: '',
  })

  public static createEmptyFormValid = (): IsFormValid => ({
    institution: false,
    startDate: false,
    endDate: false,
    degreeObtained: false,
  })
}