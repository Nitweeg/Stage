export class User {
    idUtil!: number;
    nom!: string;
    nomR!: string;
    prenomR!: string;
    mdp!: string;
    groupe!: string;

    constructor(name: string, mdp: string, group: string, nR: string, pR: string){
      this.nom = name;
      this.mdp = mdp;
      this.groupe = group;
      this.nomR = nR;
      this.prenomR = pR;
    }
  }