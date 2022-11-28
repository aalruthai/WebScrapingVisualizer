import { MonthTotalData } from 'src/models/MonthTotal.model';
import { ChartsClientService } from './../services/charts-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-linechartcomp',
  templateUrl: './linechartcomp.component.html',
  styleUrls: ['./linechartcomp.component.css']
})
export class LinechartcompComponent implements OnInit {
  countries: string[] = [];
  dates: string[] = [];
  // bar chart
  graph1 = {
    data: [
      { x: [''], y: [0], type: 'bar'},
    ],
    layout: {title: 'Exports Total By Month'}
  };

  graph2 = {
    data: [
      { x: [''], y: [0], type: 'bar'},
    ],
    layout: {title: ''}
  };
  graph3 = {
    data: [
      { x: [''], y: [0], type: 'lines', name: ''},
    ],
    layout: {title: 'Exports for'}
  };

  graph4 = {
    data: [
      { x: [''], y: [0], mode: 'lines', name: ''},
    ],
    layout: {title: 'Exports for all countries'}
  };
  constructor(private chartClient: ChartsClientService) { }

  ngOnInit(): void {
    this.chartClient.getCountries().subscribe(r => {this.countries = r.data;
      if (this.countries.length > 0) {
        this.updateCountryMonthData(this.countries[0]);
      }
    });
    this.chartClient.getDates().subscribe(r => {
      this.dates = r.data;
      if (this.dates.length > 0) {
        this.updateByMonthYear(this.dates[0]);
      }
      this.graph4.data.splice(0);
      this.chartClient.getAllCountryExportsData().subscribe(r2 => {
        r2.data.forEach(f => {
          var data = {
            x: r.data,
            y: f.values,
            mode: 'lines',
            name: f.country
          }
          this.graph4.data.push(data);
        });
      });
    });
    this.chartClient.getMonthsTotals().subscribe(r => {

      this.graph1.data[0].x = r.data.map(f => f.month);
      this.graph1.data[0].y = r.data.map(f => f.total);
      }
      );


  }

  onChange(month: any) {
    console.log(month.target.value);
    this.updateByMonthYear(month.target.value);
  }

  updateByMonthYear(monthYear: string) {
    this.chartClient.getMonthYearData(monthYear).subscribe(r => {
      this.graph2.data[0].x = r.data.map(f => f.country);
      this.graph2.data[0].y = r.data.map(f => f.value);
      this.graph2.layout.title = "Countries Exports for " + monthYear;
    });

  }

  onCountryChange($event: any) {
    this.updateCountryMonthData($event.target.value);
  }

  updateCountryMonthData(country: string) {
    this.chartClient.getCountryData(country).subscribe(r => {
      this.graph3.data[0].x = r.data.map(f => f.month_year);
      this.graph3.data[0].y = r.data.map(f => f.value);
      this.graph3.data[0].name = country;
      this.graph3.layout.title = "Exports for " + country;

    });
  }

}
