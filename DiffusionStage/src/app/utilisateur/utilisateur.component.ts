import { Component, OnInit,Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { DataTableComponent } from '../data-table/data-table.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Test', weight: 0},
  {position: 2, name: 'Helium', weight: 0},
  {position: 3, name: 'Lithium', weight: 0},
  {position: 4, name: 'Beryllium', weight: 0},
];


@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {

  displayedColumns: string[] = ['select', 'position', 'name', 'weight'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  menuOpened() {
    console.log('Menu is open');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  xpandStatus=false;

  constructor() { }

  ngOnInit(): void {
  }

}
