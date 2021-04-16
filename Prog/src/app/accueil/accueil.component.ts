import { Component, OnInit } from '@angular/core';
import {accueil} from '../accueil';
import {HEROES} from '../mock-accueil';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  hero : accueil = {
    id : 1,
    name : 'Test1'
  };
  heroes = HEROES;

  constructor() { }

  ngOnInit(): void {
  }

}
