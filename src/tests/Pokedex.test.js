import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';
import Pokedex from '../components/Pokedex';
import favoritesById from '../mocks/fovaritesById';

const EIGHT = 8;
const THREE = 3;
const SEVEN = 7;
const type = 'pokemon-type';
const name = 'pokemon-name';
const nextPokemon = 'next-pokemon';

describe('Testa o componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritesById } />,
    );
  });

  it('testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    const headingPage = screen.getByRole(
      'heading', { name: 'Encountered pokémons', level: 2 },
    );

    expect(headingPage).toBeInTheDocument();
  });

  it('testa se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado',
    () => {
      let pokemonName = screen.getByTestId(name);
      let pokemonType = screen.getByTestId(type);

      expect(pokemonName.innerHTML).toBe('Pikachu');
      expect(pokemonType.innerHTML).toBe('Electric');

      const buttonNextPokemon = screen.getByTestId(nextPokemon);
      userEvent.click(buttonNextPokemon);

      pokemonName = screen.getByTestId(name);
      pokemonType = screen.getByTestId(type);

      expect(pokemonName.innerHTML).toBe('Charmander');
      expect(pokemonType.innerHTML).toBe('Fire');

      for (let i = 1; i <= EIGHT; i += 1) userEvent.click(buttonNextPokemon);

      pokemonName = screen.getByTestId(name);
      pokemonType = screen.getByTestId(type);

      expect(pokemonName.innerHTML).toBe('Pikachu');
      expect(pokemonType.innerHTML).toBe('Electric');
      console.log(pokemonName.innerHTML);
    });

  it('testa se é mostrado apenas um Pokémon por vez',
    () => {
      const buttonNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });

      let pokemonName = screen.getAllByTestId(name);
      let pokemonType = screen.getAllByTestId(type);

      expect(pokemonName).toHaveLength(1);
      expect(pokemonType).toHaveLength(1);

      userEvent.click(buttonNextPokemon);

      pokemonName = screen.getAllByTestId(name);
      pokemonType = screen.getAllByTestId(type);

      expect(pokemonName).toHaveLength(1);
      expect(pokemonType).toHaveLength(1);
    });

  it('Testa se a Pokédex tem os botões de filtro sem repetição',
    () => {
      const buttonAll = screen.getAllByRole('button', { name: 'All' });
      const buttonElectric = screen.getAllByRole('button', { name: 'Electric' });
      const buttonFire = screen.getAllByRole('button', { name: 'Fire' });
      const buttonBug = screen.getAllByRole('button', { name: 'Bug' });
      const buttonPoison = screen.getAllByRole('button', { name: 'Poison' });
      const buttonPsychic = screen.getAllByRole('button', { name: 'Psychic' });
      const buttonNormal = screen.getAllByRole('button', { name: 'Normal' });
      const buttonDragon = screen.getAllByRole('button', { name: 'Dragon' });

      expect(buttonAll).toHaveLength(1);
      expect(buttonElectric).toHaveLength(1);
      expect(buttonFire).toHaveLength(1);
      expect(buttonBug).toHaveLength(1);
      expect(buttonPoison).toHaveLength(1);
      expect(buttonPsychic).toHaveLength(1);
      expect(buttonNormal).toHaveLength(1);
      expect(buttonDragon).toHaveLength(1);

      const allButtonFilter = screen.getAllByTestId('pokemon-type-button');
      expect(allButtonFilter).toHaveLength(SEVEN);
    });

  it('ao selecionar um tipo, a Pokédex deve circular somente pelo mesmo tipo', () => {
    const buttonElectric = screen.getByRole('button', { name: 'Electric' });
    const buttonFire = screen.getByRole('button', { name: 'Fire' });
    const buttonBug = screen.getByRole('button', { name: 'Bug' });
    const buttonPoison = screen.getByRole('button', { name: 'Poison' });
    const buttonPsychic = screen.getByRole('button', { name: 'Psychic' });
    const buttonNormal = screen.getByRole('button', { name: 'Normal' });
    const buttonDragon = screen.getByRole('button', { name: 'Dragon' });

    const testTypes = (buttonTypeFilter, expectedType, numberOfClicks) => {
      userEvent.click(buttonTypeFilter);

      let pokemonType = screen.getByTestId(type);
      expect(pokemonType.innerHTML).toBe(expectedType);

      const buttonNextPokemon = screen.getByTestId(nextPokemon);
      for (let i = 1; i <= numberOfClicks; i += 1) {
        userEvent.click(buttonNextPokemon);
        pokemonType = screen.getByTestId(type);
        expect(pokemonType.innerHTML).toBe(expectedType);

        const buttonAll = screen.getByRole('button', { name: 'All' });
        expect(buttonAll.disabled).toBe(false);
      }
    };

    testTypes(buttonElectric, 'Electric', THREE);
    testTypes(buttonFire, 'Fire', THREE);
    testTypes(buttonBug, 'Bug', THREE);
    testTypes(buttonPoison, 'Poison', THREE);
    testTypes(buttonPsychic, 'Psychic', THREE);
    testTypes(buttonNormal, 'Normal', THREE);
    testTypes(buttonDragon, 'Dragon', THREE);
  });

  it('ao selecionar um tipo, a Pokédex deve circular somente pelo mesmo tipo', () => {
    const arrTypes = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew',
      'Rapidash', 'Snorlax', 'Dragonair'];

    const buttonAll = screen.getByRole('button', { name: 'All' });
    const buttonFire = screen.getByRole('button', { name: 'Fire' });
    const buttonNextPokemon = screen.getByTestId(nextPokemon);

    const ckeckFilterAll = () => {
      arrTypes.forEach((pokemonNameItem) => {
        const pokemonName = screen.getByTestId(name);
        expect(pokemonName.innerHTML).toBe(pokemonNameItem);
        userEvent.click(buttonNextPokemon);
      });
    };

    const checkFilterFire = () => {
      for (let i = 1; i <= THREE; i += 1) {
        userEvent.click(buttonNextPokemon);
        const pokemonType = screen.getByTestId(type);
        expect(pokemonType.innerHTML).toBe('Fire');
      }
    };

    expect(buttonAll).toBeInTheDocument();
    ckeckFilterAll();

    userEvent.click(buttonFire);
    checkFilterFire();

    userEvent.click(buttonAll);
    ckeckFilterAll();
  });
});
