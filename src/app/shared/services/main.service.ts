import { Creature } from "../models/creature";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class MainService {
    baseUrl: string = "localhost:3000/api"

    constructor(private http: HttpClient) {

    }

    getAllCreatures(): Observable<Creature[]> {
        return this.http.get<Creature[]>(`${this.baseUrl}/creature/all`);
    }
}