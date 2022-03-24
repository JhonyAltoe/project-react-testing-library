import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import match from '../mocks/match';
import pokemons from '../data';
import favoritesById from '../mocks/fovaritesById';

const pikachuLocation = 'Pikachu location';
const pokemonFavoritado = 'Pokémon favoritado?';

describe('Testa o componente Pokemon Details', () => {
  it('a página deve conter um texto "Pikachu Details"', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favoritesById }
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const pikadhuDetailsTXT = screen.getByRole(
      'heading', { name: 'Pikachu Details', level: 2 },
    );
    expect(pikadhuDetailsTXT).toBeInTheDocument();
  });

  it(`testa se Não deve existir o link de navegação para os detalhes do Pokémon
  selecionado`, () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favoritesById }
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const detailLink = screen.queryByRole('link', { name: 'More details' });
    expect(detailLink).toBeFalsy();
  });

  it('A seção de detalhes deve conter um heading "h2" com o texto "Summary"', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favoritesById }
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const title = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(title).toBeInTheDocument();
  });

  it(`testa se a seção de detalhes tem um parágrafo com o resumo do Pokémon
  específico sendo visualizado`, () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favoritesById }
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const resumePokemon = screen.getByText(
      /This intelligent Pokémon roasts hard berries with electricity to make them/i,
    );
    expect(resumePokemon).toBeInTheDocument();
    expect(resumePokemon.tagName).toBe('P');
  });

  it('testa se existe um heading h2 com o texto Game Locations of Pikachu', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favoritesById }
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const title = screen.getByRole(
      'heading', { name: 'Game Locations of Pikachu', level: 2 },
    );
    expect(title).toBeInTheDocument();
  });

  it('testa se existe um heading h2 com o texto Game Locations of Pikachu', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favoritesById }
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const imgsLocation = screen.getAllByRole(
      'img', { name: pikachuLocation },
    );
    const txtLocation1 = screen.getByText('Kanto Viridian Forest');
    const txtLocation2 = screen.getByText('Kanto Power Plant');

    expect(imgsLocation).toHaveLength(2);
    expect(imgsLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgsLocation[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imgsLocation[0]).toHaveAttribute('alt', pikachuLocation);
    expect(imgsLocation[1]).toHaveAttribute('alt', pikachuLocation);
    expect(txtLocation1).toBeInTheDocument();
    expect(txtLocation2).toBeInTheDocument();
  });

  it('testa se existe um checkbox que permite favoritar o Pokémon', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favoritesById }
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const checkbox = screen.getByRole(
      'checkbox', { name: pokemonFavoritado },
    );

    expect(checkbox).toBeInTheDocument();
  });

  it('testa se o label do checkbox contem o texto "Pokémon favoritado?"',
    () => {
      renderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ favoritesById }
          match={ match }
          pokemons={ pokemons }
          onUpdateFavoritePokemons={ () => {} }
        />,
      );

      const labelCheckbox = screen.getByLabelText(pokemonFavoritado);
      expect(labelCheckbox.type).toBe('checkbox');
    });
});
