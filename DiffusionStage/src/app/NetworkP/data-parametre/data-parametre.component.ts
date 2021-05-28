import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: string;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 'Page1', name: 'Accueil', weight: 1},
  {position: 'Page2', name: 'Diffusion', weight: 1},
  {position: 'Page2', name: 'Gestion des stocks', weight: 1},
  {position: 'Page2', name: 'Gestion des devis', weight: 1},
  {position: 'Page2', name: '', weight: 0},
  {position: 'Page3', name: '', weight: 0},
  {position: 'Page3', name: '', weight: 0},
  {position: 'Page3', name: '', weight: 0},
  {position: 'Page4', name: '', weight: 0},
  {position: 'Page5', name: '', weight: 0},
  {position: 'Page5', name: '', weight: 0},
  {position: 'Page6', name: '', weight: 0},
  {position: 'Page6', name: '', weight: 0},
  {position: 'Page7', name: '', weight: 0},
  {position: 'Page7', name: '', weight: 0},
  {position: 'Page7', name: '', weight: 0},

];

@Component({
  selector: 'app-data-parametre',
  templateUrl: './data-parametre.component.html',
  styleUrls: ['./data-parametre.component.css']
})
export class DataParametreComponent implements OnInit {


  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
