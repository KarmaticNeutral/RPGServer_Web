import { Creature } from "../models/creature";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class MainService {
    baseUrl: string = "http://localhost:3000/api"

    constructor(private http: HttpClient) {

    }

    getAllCreatures(): Observable<Creature[]> {
        return this.http.get<Creature[]>(`${this.baseUrl}/creature/all`);
    }

    upsertCreature(creature: Creature): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/creature`, creature)
    }

    deleteCreature(creature_id): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/creature/${creature_id}`);
    }

    getRaces(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/race`)
    }

    getBackgrounds(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/background`)
    }

    getCreatureTypes(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/creaturetype`)
    }

    getCreatureSizes(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/creature_size`)
    }
}