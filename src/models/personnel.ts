// 导出人员基础信息模型（同service/api/personnel.ts）
export interface PersonnelBasic {
    id: number;
    name: string;
    gender: string;
    age: number;
    position: string;
    title: string;
    department: string;
    entryTime: string;
    education: string;
    degree: string;
    university: string;
    major: string;
    phone: string;
    email: string;
    politicalStatus: string;
    nativePlace: string;
    maritalStatus: string;
    ethnicity: string;
    tags: Tag[];
    detailInfo: any;
  }
  
  // 导出人员详细信息模型（对应3.1.2响应数据）
  export interface PersonnelDetail extends PersonnelBasic {
    personnelId: number;
    idCardNumber: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    homeAddress: string;
    teachingCourses: string;
    courseHours: number;
    teachingClasses: number;
    teachingEvaluationScore: number;
    teachingAwards: string;
    teachingMaterials: string;
    researchJournals: string;
    researchPapers: string;
    publicationTime: string;
    impactFactor: number;
    researchProjects: string;
    projectNumbers: string;
    projectFunds: number;
    projectTimePeriod: string;
    patents: string;
    patentTypes: string;
    patentAuthorizationTime: string;
    managementDepartments: string;
    managementResponsibilities: string;
    managementTeamSize: number;
    managementDecisions: string;
    trainingNames: string;
    trainingTimes: string;
    trainingLocations: string;
    trainingContents: string;
    trainingCertificates: string;
    createTime: string;
    updateTime: string;
  }
  
  // 导出标签模型
  export interface Tag {
    id: number;
    tagName: string;
    tagType: string;
    createTime: string;
    updateTime: string;
  }