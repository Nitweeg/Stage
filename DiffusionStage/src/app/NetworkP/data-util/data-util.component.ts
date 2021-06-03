import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { User } from '../Model/user.model';
import { ApiRestService } from '../service/api-rest.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopuputilComponent } from './../popuputil/popuputil.component';

@Component({
  selector: 'app-data-util',
  templateUrl: './data-util.component.html',
  styleUrls: ['./data-util.component.css']
})
export class DataUtilComponent implements OnInit {

  users: User [] = [];
  usersData : any = [];

  displayedColumns: string[] = ['nom', 'groupe','delete'];
  dataSource = new MatTableDataSource<User>(this.users);
  selection = new SelectionModel<User>(true, []);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public restapi: ApiRestService,private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUser();
  }

  openDialogUser() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.matDialog.open(PopuputilComponent,{data : {
      listusers: this.users
    }});
    dialogRef.afterClosed().subscribe(result => {
      this.users = result.listusers;
      this.dataSource.data = result.listusers;
    });
  }

  loadUser() {
    return this.restapi.getUser().subscribe((data: {}) => {
      this.usersData = data;
      this.dataSource.data = this.usersData;
      console.log(this.users);
      for (let u of this.usersData){
        this.users.push(u);
      }
    });
  }

  supUser(element:User){
    return this.restapi.suppUser(element.idUtil).subscribe((data: {}) => {
      this.usersData.pop(element);
      this.dataSource.data = this.usersData;
    }
    );
  }

}
