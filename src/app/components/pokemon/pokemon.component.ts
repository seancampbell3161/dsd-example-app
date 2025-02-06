import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LocationEncounter, Pokemon } from '../../models/poke-api';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  imports: [ReactiveFormsModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent {
  pokemonService = inject(PokemonService);

  pokemon: Pokemon | null = null;
  locationEncounters: LocationEncounter | null = null;
  pokemonSearch = new FormControl('');

  constructor() {}

  search() {
    if (this.pokemonSearch === null) { return; }

    this.pokemonService.searchPokemon(this.pokemonSearch.value!).subscribe({
      next: (res) => this.handlePokemonResponse(res),
      error: (e) => console.error(e),
    });
  }

  private handlePokemonResponse(res: Pokemon | null) {
    if (res) {
      this.pokemon = res;
      this.pokemonService.getLocationEncounters(res.id).subscribe({
        next: (res) => this.handleEncountersResponse(res),
        error: (e) => console.error(e)
      })
    }
  }

  private handleEncountersResponse(res: LocationEncounter | null) {
    if (res) {
      this.locationEncounters = res;
    }
  }
}
