import { Injectable } from '@angular/core';
import { Demande } from './models/demande.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  demandes: Demande[] = [];
  selectedWord: String;
  words = [
    {value: "demandeurUsername", viewValue: "Demandeur"},
    {value: "beneficiaireUsername", viewValue: "Bénéficiaire"},
    {value: "objet", viewValue: "Objet de la demande"}
  ]

  constructor() { }
  
  Search(motCle,selectedWord, demandes){
    if(motCle != ""){
      
      demandes = demandes.filter(
        responses=>{
          if(selectedWord==="objet"){
            console.log("FROM OBJET")
          return responses.objet.toLocaleLowerCase().match(motCle.toLocaleLowerCase());
          }     else if(selectedWord==="demandeurUsername"){
            console.log("FROM DEMANDEUR")
            return responses.demandeur.username.toLocaleLowerCase().match(motCle.toLocaleLowerCase());
          } else if(this.selectedWord==="beneficiaireUsername"){
            console.log("FROM BENEFICIAIRE")
            return responses.beneficiaire.username.toLocaleLowerCase().match(motCle.toLocaleLowerCase());
          }
        })
      }
  }
}
