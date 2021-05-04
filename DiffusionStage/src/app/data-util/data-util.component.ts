import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: string;
  weight: number;
  util: number;
  permi: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 'Fred', name: 'XYZ', weight: 0, util: 0, permi:'t'},
  {position: 'Max', name: 'Helium', weight: 0, util: 0, permi:'t'},
  {position: 'Pierre', name: 'Lithium', weight: 0, util: 0, permi:'t'},
  {position: 'Toto', name: 'Beryllium', weight: 0, util: 0, permi:'t'},
  {position: 'Toto2', name: 'test1', weight: 0, util: 0, permi:'t'},
  {position: 'Toto3', name: 'test2', weight: 0, util: 0, permi:'t'},
  {position: 'Toto4', name: 'test3', weight: 0, util: 0, permi:'t'},
  {position: 'Toto5', name: 'test4', weight: 0, util: 0, permi:'t'},
  {position: 'Toto5', name: 'test5', weight: 0, util: 0, permi:'t'},
  {position: 'Toto6', name: 'Beryllium', weight: 0, util: 0, permi:'t'},
  {position: 'Toto7', name: 'Beryllium', weight: 0, util: 0, permi:'t'},
  {position: 'Toto8', name: 'Beryllium', weight: 0, util: 0, permi:'t'},
  {position: 'Toto9', name: 'Beryllium', weight: 0, util: 0, permi:'t'},
  {position: 'Toto10', name: 'Beryllium', weight: 0, util: 0, permi:'t'},
  {position: 'Toto11', name: 'Beryllium', weight: 0, util: 0, permi:'t'},
  {position: 'Toto12', name: 'Beryllium', weight: 0, util: 0, permi:'t'},

];

@Component({
  selector: 'app-data-util',
  templateUrl: './data-util.component.html',
  styleUrls: ['./data-util.component.css']
})
export class DataUtilComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'permi', 'util'];
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
