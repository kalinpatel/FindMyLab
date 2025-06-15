type OfficeLocation = {
  building: string;
  room?: string;
  address?: string;
};

export const Departments = {
  ACES: { fullName: "Agricultural Consumer and Environmental Sciences", abbreviation: "ACES" },
  AHS: { fullName: "Applied Health Sciences", abbreviation: "AHS" },
  ARMED_FORCES: { fullName: "Armed Forces", abbreviation: "Armed Forces" },
  CARLE: { fullName: "Carle Illinois College of Medicine", abbreviation: "Medicine" },
  MEDIA: { fullName: "College of Media", abbreviation: "Media" },
  DGS: { fullName: "Division of General Studies", abbreviation: "DGS" },
  EDUCATION: { fullName: "College of Education", abbreviation: "Education" },
  FAA: { fullName: "College of Fine and Applied Arts", abbreviation: "FAA" },
  GIES: { fullName: "Gies College of Business", abbreviation: "Gies" },
  GRADUATE: { fullName: "Graduate College", abbreviation: "Graduate College" },
  GRAINGER: { fullName: "Grainger College of Engineering", abbreviation: "Grainger" },
  LAW: { fullName: "College of Law", abbreviation: "Law" },
  LAS: { fullName: "College of Liberal Arts and Sciences", abbreviation: "LAS" },
  ISCHOOL: { fullName: "School of Information Sciences", abbreviation: "iSchool" },
  LABOR: { fullName: "School of Labor and Employee Relations", abbreviation: "School of Labor and Employee Relations" },
  SOCIAL_WORK: { fullName: "School of Social Work", abbreviation: "School of Social Work" },
  SIEBELDESIGN: { fullName: "Siebel Center for Design", abbreviation: "Siebel Design" },
  SIEBELCS: { fullName: "Siebel Center for Computer Science", abbreviation: "Siebel CS" },
  VET_MED: { fullName: "College of Veterinary Medicine", abbreviation: "Vet Med" },
  NURSING: { fullName: "College of Nursing", abbreviation: "Nursing" },
  EXTERNAL: { fullName: "External", abbreviation: "External" },
} as const;

type DepartmentType = keyof typeof Departments;

type ContactInfo = {
  type: "person" | "organization";
  name: string;
  email: string;
  phone?: string;
  office?: OfficeLocation;
  department?: DepartmentType;
};

type ResearchType = "Internship" | "Undergraduate Research" | "Graduate Research";

export type ResearchOpportunity = {
  id: string;
  title: string;
  description: string;
  contact: ContactInfo[];
  deadline: Date | "rolling";
  parentProgram?: string;
  affiliations: DepartmentType[];
  keywords: string[];
  researchType: ResearchType;
  modality: "in-person" | "remote" | "hybrid";
  dates: {
    start: Date;
    end: Date;
  };
  restrictions: {
    must_be_citizen?: boolean;
    must_be_over_18?: boolean;
    must_be_current_student?: boolean;
    required_courses?: { courseCode: string; note: string }[];
    required_hours_per_week?: { hours: number; note: string };
  };
};
