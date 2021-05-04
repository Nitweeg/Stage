import { Component, OnInit, ViewChild } from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatTableDataSource} from '@angular/material/table';

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
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  @ViewChild(MatMenuTrigger) test!: MatMenuTrigger;

  menuOpened() {
    console.log('Menu is open');
  }

  displayedColumns: string[] = ['select', 'position', 'name', 'weight'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  xpandStatus=false;
  
  openMyMenu() {
    this.test.toggleMenu();
  } 
  closeMyMenu() {
    this.test.closeMenu();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
