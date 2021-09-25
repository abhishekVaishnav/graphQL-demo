import { Injectable } from '@angular/core';
import { gql } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
    private apollo: Apollo
  ) {

  }

  getContinents(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: gql`
        {
          continents {
            name
            code
          }
        }
      `
    }).valueChanges;
  }

  getLanguages(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: gql`
        {
          languages {
            name
            code
            native
            rtf
          }
        }
      `
    }).valueChanges;
  }

  getCountries(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: gql`
        {
          countries {
            code
            name
            native
            phone
            continent {
              name
            }
            capital
            currency
            languages {
              name
            }
          }
        }
      `
    }).valueChanges;
  }
}
