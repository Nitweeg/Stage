import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'test1', weight: 0},
  {position: 2, name: 'blabla', weight: 0},
  {position: 3, name: 'blabla', weight: 0},
  {position: 4, name: 'blabla', weight: 0},
  {position: 5, name: 'blabla', weight: 0},
  {position: 6, name: 'blablz', weight: 0},
  {position: 7, name: 'blabla', weight: 0},
  {position: 8, name: 'blabla', weight: 0},
  {position: 9, name: 'blabla', weight: 0},
  {position: 10, name: 'blabla', weight: 0},
  {position: 11, name: 'blabla', weight: 0},
  {position: 12, name: 'blabla', weight: 0},
  {position: 13, name: 'blabla', weight: 0},
  {position: 14, name: 'blabla', weight: 0},
  {position: 15, name: 'blablam', weight: 0},
  {position: 16, name: 'blablam', weight: 0},

];


@Component({
  selector: 'app-data-scans',
  templateUrl: './data-scans.component.html',
  styleUrls: ['./data-scans.component.css']
})
export class DataScansComponent implements OnInit {

  displayedColumns: string[] = [ 'position', 'name', 'weight', 'delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
