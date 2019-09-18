import { Deserializable } from "./deserializable.model";
import { User } from './user.model';

export class Profil {
    
    entreprise: string;
    telephone: number;
    departement: string;
    superieur: User;

    // deserialize(input: any): this {
    //     Object.assign(this, input);
    //     return this;
    // }

}
