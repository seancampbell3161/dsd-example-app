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

  pokemonSearch = new FormControl('');

  pokemon = this.pokemonService.pokemon;
  locationEncounters = this.pokemonService.encounters;

  constructor() {}
}
