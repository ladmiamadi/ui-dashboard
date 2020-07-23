import { IsFormValid, UserTraining } from '../components/modal/ModalTraining';
import { InputState } from '../index.d';

export class TrainingFactory {
  public static createEmptyUserTraining = (): UserTraining => ({
    institution: '',
    startDate: '',
    endDate: '',
    degreeObtained: '',
  })

  public static createEmptyFormValid = (): IsFormValid => ({
    institution: InputState.UNDEFINED,
    startDate: InputState.UNDEFINED,
    endDate: InputState.UNDEFINED,
    degreeObtained: InputState.UNDEFINED,
  })
}