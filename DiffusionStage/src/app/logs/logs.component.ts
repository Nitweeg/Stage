import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
}

export interface PopDate {
  debut: Date;
  fin: Date;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Test', weight: 0},
  {position: 2, name: 'Helium', weight: 0},
  {position: 3, name: 'Lithium', weight: 0},
  {position: 4, name: 'Beryllium', weight: 0},
];

export class popupdate {
  constructor(@Inject (MAT_DIALOG_DATA) public data: PopDate) {}
}



@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  constructor() {}

  public date!: MatDialog

  @ViewChild(MatMenuTrigger) test!: MatMenuTrigger;

  openDate() {
    this.date.open(popupdate, {
      data: {
        debut: '2018-06-12',
        fin: '2019-07-14'
      }
    });
  }



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

  ngOnInit(): void {
  }


}
