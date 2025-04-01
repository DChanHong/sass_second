export interface BaziInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  gender: 'male' | 'female';
}

export interface BaziResult {
  yearPillar: {
    heavenlyStem: string;
    earthlyBranch: string;
  };
  monthPillar: {
    heavenlyStem: string;
    earthlyBranch: string;
  };
  dayPillar: {
    heavenlyStem: string;
    earthlyBranch: string;
  };
  hourPillar: {
    heavenlyStem: string;
    earthlyBranch: string;
  };
  lifeStar: string;
  bodyStar: string;
  hiddenStars: string[];
  tenGods: {
    [key: string]: string;
  };
  elements: {
    [key: string]: number;
  };
  analysis: string;
} 