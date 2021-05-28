export class User {
    nom!: string;
    mdp!: string;
    groupe!: string;

    constructor(name: string, mdp: string, group: string){
      this.nom = name;
      this.mdp = mdp;
      this.groupe = group;}
  }