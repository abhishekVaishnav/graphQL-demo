import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {
  isLoading = true;
  dataSource = [];
  displayedColumns = ['name', 'code', 'native', 'rtf'];

  constructor(
    private appService: AppService,
  ) { }

  getData() {
    this.appService.getLanguages().subscribe(
      ({ data, loading }) => {
        this.isLoading = loading;
        this.dataSource = data.languages;
      }
    )
  }

  ngOnInit(): void {
    this.getData();
  }

}
