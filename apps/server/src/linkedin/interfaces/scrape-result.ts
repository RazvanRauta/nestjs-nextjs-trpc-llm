export interface ScrapeResult {
  success: boolean;
  credits_left: number;
  rate_limit_left: number;
  person: Person;
  company: Company;
}

export interface Company {
  linkedInId: string;
  name: string;
  universalName: string;
  linkedInUrl: string;
  employeeCount: number;
  followerCount: number;
  employeeCountRange: EmployeeCountRange;
  websiteUrl: string;
  tagline: null;
  description: string;
  industry: string;
  phone: null;
  specialities: string[];
  headquarter: Headquarter;
  logo: string;
  fundingData: FundingData;
}

export interface EmployeeCountRange {
  start: number;
  end: number;
}

export interface FundingData {
  numberOfFundingRounds: number;
  crunchbaseOrganizationUrl: string;
  lastFundingRound: LastFundingRound;
}

export interface LastFundingRound {
  fundingType: string;
  moneyRaised: MoneyRaised;
  fundingRoundUrl: string;
  announcedOn: Date;
  numberOfOtherInvestors: number;
  investorsUrl: string;
  leadInvestors: LeadInvestor[];
}

export interface LeadInvestor {
  name: string;
  url: string;
  image: string;
}

export interface MoneyRaised {
  amount: string;
  currencyCode: string;
}

export interface Headquarter {
  city: string;
  country: string;
  postalCode: string;
  geographicArea: string;
  street1: string;
  street2: null;
}

export interface Person {
  publicIdentifier: string;
  linkedInIdentifier: string;
  memberIdentifier: string;
  linkedInUrl: string;
  firstName: string;
  lastName: string;
  headline: string;
  location: string;
  summary: string;
  photoUrl: string;
  backgroundUrl: string;
  openToWork: boolean;
  premium: boolean;
  pronoun: null;
  showVerificationBadge: boolean;
  creationDate: CreationDate;
  followerCount: number;
  positions: Positions;
  schools: Schools;
  skills: string[];
  languages: any[];
  recommendations: Recommendations;
  certifications: Certifications;
}

export interface Certifications {
  certificationsCount: number;
  certificationHistory: any[];
}

export interface CreationDate {
  month: number;
  year: number;
}

export interface Positions {
  positionsCount: number;
  positionHistory: PositionHistory[];
}

export interface PositionHistory {
  title: string;
  companyName: string;
  description: string;
  startEndDate: StartEndDate;
  companyLogo: string;
  linkedInUrl: string;
  linkedInId: string;
  companyLocation?: string;
  contractType?: string;
}

export interface StartEndDate {
  start: CreationDate;
  end: CreationDate | null;
}

export interface Recommendations {
  recommendationsCount: number;
  recommendationHistory: any[];
}

export interface Schools {
  educationsCount: number;
  educationHistory: EducationHistory[];
}

export interface EducationHistory {
  degreeName: string;
  fieldOfStudy: string;
  linkedInUrl: string;
  schoolLogo: string;
  schoolName: string;
  startEndDate: StartEndDate;
}
