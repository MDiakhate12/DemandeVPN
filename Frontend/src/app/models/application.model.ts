import { Deserializable } from './deserializable.model';

export class Application implements Deserializable {
    id: number;
    nom: string;
    adresse_ip: string;
    
    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
