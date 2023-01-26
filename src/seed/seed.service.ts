import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  
  constructor(
    private readonly http: AxiosAdapter,
    private readonly pokemonService: PokemonService) {
    
  }

  async executeSeed() {

    
    try {
      const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
      const newData = data.results.map(( item, index) => {
        return { name: item.name, no: ++index };
      })
      await this.pokemonService.insertSeed( newData )
  
      return 'Database populated';
    } catch (error) {
      console.log( error)
      throw error
    }

  }
}
