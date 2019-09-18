import { Deserializable } from "./deserializable.model";
import { User } from "./user.model";
import { Protocole } from "./protocole.model";
import { Application } from "./application.model";


export class Demande {

    id: number;
    objet: string;
    description: string;
    validation_hierarchique: boolean;
    validation_securite: boolean;
    validation_admin: boolean;
    date: Date;
    date_expiration: Date;
    status_demande: string;
    beneficiaire: User;
    demandeur: User;
    validateur_hierarchique: User;
    validateur_securite: User;
    protocoles: Protocole[];
    applications: Application[];


    // deserialize(input: any): this {
    //     Object.assign(this, input);

    //     this.demandeur = new User().deserialize(input.demandeur);
    //     this.beneficiaire = new User().deserialize(input.beneficiaire);
    //     this.validateur_hierarchique = new User().deserialize(input.validateur_hierarchique);
    //     this.validateur_securite = new User().deserialize(input.validateur_securite);

    //     this.protocoles = input.protocoles.map(protocole => {
    //         return new protocole().deserialize(protocole)
    //     });
        
    //     this.applications = input.applications.map(application => {
    //         return new application().deserialize(application)
    //     });

    //     return this;
    // }
}   
