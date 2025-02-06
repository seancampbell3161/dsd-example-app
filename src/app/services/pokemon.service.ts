import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationEncounter, Pokemon } from '../models/poke-api';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  searchPokemon(name: string): Observable<Pokemon | null> {
    return this.http.get<Pokemon | null>(`${this.apiUrl}pokemon/${name}`);
  }

  getLocationEncounters(id: number): Observable<LocationEncounter | null> {
    return this.http.get<LocationEncounter | null>(`${this.apiUrl}pokemon/${id}/encounters`);
  }
}
