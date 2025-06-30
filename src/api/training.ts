import {trainingService} from '../service/trainingService';

export interface PersonnelTrainingDTO {
  personnelId: number;
  trainingCourse: string;
  trainingPriority: number;
}

export interface CommonResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const saveTrainingRecords = (trainingDTO: PersonnelTrainingDTO) => {
  return trainingService.post<CommonResponse<null>>('/api/training/records', trainingDTO);
};

/**
 * 2.2 批量分析人员培训需求
 * @param personnelIds 人员ID列表
 */
export const getBatchTrainingAnalysis = async (personnelIds: number[]): Promise<CommonResponse<PersonnelTrainingAnalysisVO[]>> => {
  return trainingService.get('/api/training/analyses/batch', { params: { personnelIds: personnelIds.join(',') } });
};

/**
 * 2.3 根据培训课程筛选人员
 * @param trainingCourse 培训课程名称
 */
export const getScreenedPersonnel = async (trainingCourse: string): Promise<CommonResponse<PersonnelTrainingAnalysisVO[]>> => {
  return trainingService.get('/api/training/screened-personnel', { params: { trainingCourse } });
};

/**
 * 2.4 生成培训人员名单
 * @param trainingCourse 培训课程名称
 */
export const getTrainingList = async (trainingCourse: string): Promise<CommonResponse<PersonnelTrainingAnalysisVO[]>> => {
  return trainingService.get('/api/training/training-list', { params: { trainingCourse } });
};

export interface PersonnelTrainingAnalysisVO {
  personnelId: number;
  name: string;
  position: string;
  department: string;
  abilityShortcomings: string;
  recommendedCourses: string;
  trainingPriority: number;
}

/**
 * 2.1 分析单个人员培训需求
 * @param personnelId 人员ID
 */
export const getSingleTrainingAnalysis = async (personnelId: number): Promise<CommonResponse<PersonnelTrainingAnalysisVO>> => {
  return trainingService.get(`/api/training/analyses/${personnelId}`);
};