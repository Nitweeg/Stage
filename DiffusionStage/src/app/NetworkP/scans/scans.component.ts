import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { ApiRestService } from '../service/api-rest.service';

export interface PeriodicElement {
  position: string;
  name: number;
  date: string;
}

@Component({
  selector: 'app-scans',
  templateUrl: './scans.component.html',
  styleUrls: ['./scans.component.css']
})

export class ScansComponent implements OnInit {

  @ViewChild(MatMenuTrigger) test!: MatMenuTrigger;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  menuOpened() {
    console.log('Menu is open');
  }

  xpandStatus=false;
  
  openMyMenu() {
    this.test.toggleMenu();
  } 
  closeMyMenu() {
    this.test.closeMenu();
  }


  nompdf:any = "";
  nomPDF='';
  listpdf:any = [];
  ELEMENT_DATA: PeriodicElement[]=[];
  displayedColumns: string[] = ['select', 'position', 'name','date','delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  ShowMe = true;

  ToogleTag(){
    this.ShowMe=!this.ShowMe;
  }


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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private restapi: ApiRestService){}

  ngOnInit(): void { this.loadnompdf();
  }

  loadnompdf(){
    return this.restapi.getnompdfRetour().subscribe((data:{})=>{
      this.listpdf = data;
      let i=0;
      for (let pos in this.listpdf[0]){
        if (i==0){
          this.loadPDF(this.listpdf[0][pos]["nom"])
          i++
        }
        console.log(this.listpdf[0]);
        this.ELEMENT_DATA.push({name:this.listpdf[0][pos]["nom"],date:this.listpdf[0][pos]["date"],position:pos})
      }
      this.dataSource.data= this.ELEMENT_DATA;
    });
  }

  loadPDF(namepdf:string){
    this.nompdf = "http://193.251.23.107:5500/ftp/Retours/" + namepdf;
    console.log(this.nompdf)
  }
}
