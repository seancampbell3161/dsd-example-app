import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { LocationEncounter, Pokemon } from '../models/poke-api';
import { EMPTY, Observable, Subject, catchError, map, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/';

  private pokemonState = signal<Pokemon | null>(null);
  private locationEncountersState = signal<LocationEncounter | null>(null);

  pokemon = computed(() => this.pokemonState());
  encounters = computed(() => this.locationEncountersState());

  fetchData$ = new Subject<string>();

  constructor(private http: HttpClient) {
    this.fetchData$.pipe(
      takeUntilDestroyed(),
      switchMap((name) => this.searchPokemon(name).pipe(
        switchMap((pokemonResponse) => this.getLocationEncounters(pokemonResponse?.id ?? 0).pipe(
          map(locationsResponse => ({
            pokemonResponse: pokemonResponse,
            locations: locationsResponse
          }))
        ))
      )),
      catchError(() => EMPTY),
    ).subscribe(res => {
      this.pokemonState.set(res.pokemonResponse);
      this.locationEncountersState.set(res.locations);
    });
  }

  searchPokemon(name: string): Observable<Pokemon | null> {
    return this.http.get<Pokemon | null>(`${this.apiUrl}pokemon/${name}`);
  }

  getLocationEncounters(id: number) {
    return this.http.get<LocationEncounter | null>(`${this.apiUrl}pokemon/${id}/encounters`);
  }
}
