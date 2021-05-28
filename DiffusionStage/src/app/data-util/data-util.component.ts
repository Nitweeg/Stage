import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ApiRestService } from '../service/api-rest.service';
import { User } from '../Model/user.model';

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

  constructor(public restapi: ApiRestService) { }

  ngOnInit(): void {
    this.loadUser();
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

}
