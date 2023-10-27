import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../model/address';
import { AddressesService } from '../services/addresses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addresses$: Observable<Address[]> | undefined;

  constructor(private addressesService: AddressesService) { }

  ngOnInit() {
    this.loadAllFullAddresses();
  }

  private loadAllFullAddresses() {
    this.addresses$ = this.addressesService.getFullAddresses();
  }
}
