import { CountryExportsData } from './../../models/MonthTotal.model';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryMonthValueData, MonthCountryTotalData, MonthTotalData } from 'src/models/MonthTotal.model';
import { Observable } from 'rxjs';
import { StringData } from 'src/models/Country.model';

@Injectable({
  providedIn: 'root'
})
export class ChartsClientService {

  constructor(private http: HttpClient,  @Inject('BASE_URL') private baseUrl: string) { }

  getCountries(): Observable<StringData> {
    return this.http.get<StringData>(this.baseUrl + 'exports/countries');

  }

  getDates(): Observable<StringData> {
    return this.http.get<StringData>(this.baseUrl + 'exports/dates');

  }
  getMonthsTotals(): Observable<MonthTotalData> {
    return this.http.get<MonthTotalData>(this.baseUrl + 'exports/permonthtotals');
  }

  getMonthYearData(monthYear: string): Observable<MonthCountryTotalData> {
    return this.http.get<MonthCountryTotalData>(this.baseUrl + 'exports/bymonthyear/' + monthYear)
  }

  getCountryData(countryname: string): Observable<CountryMonthValueData> {
    return this.http.get<CountryMonthValueData>(this.baseUrl + 'exports/bycountry/' + countryname)
  }

  getAllCountryExportsData(): Observable<CountryExportsData> {
    return this.http.get<CountryExportsData>(this.baseUrl + 'exports/countriestotals')
  }
}
