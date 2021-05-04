import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatMenuTrigger} from '@angular/material/menu';

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
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})


export class HeaderAdminComponent implements OnInit {
  panelOpenState = false;
  @ViewChild(MatMenuTrigger) test!: MatMenuTrigger;

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
  
  openMyMenu() {
    this.test.toggleMenu();
  } 
  closeMyMenu() {
    this.test.closeMenu();
  }


  ngOnInit(): void {
  }

}
