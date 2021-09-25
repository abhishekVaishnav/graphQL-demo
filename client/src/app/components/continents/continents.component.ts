import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

// const ELEMENT_DATA = [
//   {code: 1, name: 'Hydrogen'},
//   {code: 2, name: 'Helium'},
//   {code: 3, name: 'Lithium'},
//   {code: 4, name: 'Beryllium'},
//   {code: 5, name: 'Boron'},
//   {code: 6, name: 'Carbon'},
//   {code: 7, name: 'Nitrogen'},
//   {code: 8, name: 'Oxygen'},
//   {code: 9, name: 'Fluorine'},
//   {code: 10, name: 'Neon'},
// ];

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.css']
})
export class ContinentsComponent implements OnInit {

  displayedColumns: string[] = ['code', 'name'];
  dataSource = [];
  isLoading = true;

  constructor(
    private appService: AppService,
  ) { }

  getData() {
    this.appService.getContinents().subscribe(
      ({ data, loading }) => {
        this.isLoading = loading;
        this.dataSource = data.continents;
      }
    )
  }

  ngOnInit(): void {
    this.getData();
  }

}
