import { PopuputilComponent } from './../popuputil/popuputil.component';
import { Component, OnInit,Input, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatMenuTrigger} from '@angular/material/menu';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

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

  @ViewChild(MatMenuTrigger) test!: MatMenuTrigger;

  menuOpened() {
    console.log('Menu is open');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openMyMenu() {
    this.test.toggleMenu();
  } 
  closeMyMenu() {
    this.test.closeMenu();
  }
  xpandStatus=false;

  openDialogUser() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(PopuputilComponent);
  }

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

}
