export interface MonthTotal {
  month: string;
  total: number;
}

export interface MonthTotalData {
  data: MonthTotal[];
  count: number;
}


export interface CountryTotal {
  country: string;
  value: number;
}

export interface MonthCountryTotalData {
  data: CountryTotal[];
  count: number;
}

export interface CountryMonthValue {
  month_year: string;
  value: 0;
}

export interface CountryMonthValueData {
  data: CountryMonthValue[];
  count: number;
}

export interface CountryExports {
  country: string;
  values: number[];
}

export interface CountryExportsData {
  data: CountryExports[];
  count: number;
}
