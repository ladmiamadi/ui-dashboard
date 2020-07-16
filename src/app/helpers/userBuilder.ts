export class UserBuilder {
  public static transformDateFormat(data: [any]) {
    data.map((updatedData: any) => {
      if (updatedData.createdDate)
        updatedData.createdDate = new Date(updatedData.createdDate);
      if (updatedData.updatedDate)
        updatedData.updatedDate = new Date(updatedData.updtadetDate);

      if (updatedData.userJob && updatedData.createdDate)
        updatedData.userJob.startDate = new Date(updatedData.userJob.startDate);
      if (updatedData.userJob && updatedData.endDate)
        updatedData.userJob.endDate = new Date(updatedData.userJob.endDate);
      if (updatedData.userJob && updatedData.userJob.job && updatedData.userJob.job.createdDate)
        updatedData.userJob.job.createdDate = new Date(updatedData.userJob.job.createdDate);
      if (updatedData.userJob && updatedData.userJob.job && updatedData.userJob.job.createdDate)
        updatedData.userJob.job.updatedDate = new Date(updatedData.userJob.job.updatedDate);

      updatedData.userExperiences.map((updatedDataExperience: any) => {
        if (updatedDataExperience.startDate)
          updatedDataExperience.startDate = new Date(updatedDataExperience.startDate);
        if (updatedDataExperience.endDate)
          updatedDataExperience.endDate = new Date(updatedDataExperience.endDate);
      });

      updatedData.userTrainings.map((updatedDataTraining: any) => {
        if (updatedDataTraining.startDate)
          updatedDataTraining.startDate = new Date(updatedDataTraining.startDate);
        if (updatedDataTraining.endDate)
          updatedDataTraining.endDate = new Date(updatedDataTraining.endDate);
      });

      updatedData.userContracts.map((updatedDataContract: any) => {
        updatedDataContract.createdDate = new Date(updatedDataContract.createdDate);
        if (updatedDataContract.createdDate)
          updatedDataContract.updatedDate = new Date(updatedDataContract.updatedDate);
      });

      updatedData.userAbsences.map((updatedDataAbsence: any) => {
        updatedDataAbsence.date = new Date(updatedDataAbsence.date);
      });

      updatedData.userInterviews.map((updatedDataInterview: any) => {
        updatedDataInterview.date = new Date(updatedDataInterview.date);
      });
      updatedData.userProfiles.map((updatedDataProfile: any) => {
        updatedDataProfile.birthDate =  new Date(updatedDataProfile.birthDate);
      });
    });
  }
}
