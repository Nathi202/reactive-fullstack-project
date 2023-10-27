import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../model/address';

const BASE_PATH = '/api/v1/addresses';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(private http: HttpClient) { }

  getFullAddresses(): Observable<Address[]> {
    return this.http
      .get<Address[]>(BASE_PATH);
  }
}
