import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  isLoading = true;
  dataSource = [];
  displayedColumns = ['name', 'code', 'native', 'phone', 'continent', 'capital', 'currency', 'languages'];

  constructor(
    private appService: AppService
  ) { }

  languages(country: any) {
    return (country.languages || []).map((language: any) => language.name).join(', ');
  }

  getData() {
    this.appService.getCountries().subscribe(
      ({ data, loading }) => {
        this.isLoading = loading;
        this.dataSource = data.countries;
      }
    )
  }

  ngOnInit(): void {
    this.getData();
  }

}
