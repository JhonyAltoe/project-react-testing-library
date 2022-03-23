import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Pokemon from '../components/Pokemon';
import Pokemons from '../data';

const pikachuInfos = Pokemons[0];

describe('Testa o component Pokemons', () => {
  it('testa se o nome do Pokémon está correto', () => {
    renderWithRouter(
      <Pokemon pokemon={ pikachuInfos } isFavorite />,
    );

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');
  });

  it('testa se o tipo é Electric', () => {
    renderWithRouter(
      <Pokemon pokemon={ pikachuInfos } isFavorite />,
    );

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');
  });

  it('testa o formato do Weight -> Average weight: <value> <measurementUnit>', () => {
    renderWithRouter(
      <Pokemon pokemon={ pikachuInfos } isFavorite />,
    );

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
  });

  it('testa se a imagem do Pokémon tem o "src" e o "alt" com formato e valor corretos',
    () => {
      renderWithRouter(
        <Pokemon pokemon={ pikachuInfos } isFavorite />,
      );

      const pokemonIMG = screen.getByRole('img', { name: 'Pikachu sprite' });
      expect(pokemonIMG).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(pokemonIMG).toHaveAttribute('alt', 'Pikachu sprite');
    });

  it(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação
  "/pokemons/25" para exibir detalhes deste Pokémon`, () => {
    renderWithRouter(
      <Pokemon pokemon={ pikachuInfos } isFavorite />,
    );

    const detatilsLink = screen.getByRole('link', { name: 'More details' });
    expect(detatilsLink).toHaveProperty('href', 'http://localhost/pokemons/25');
  });

  it(`testa se ao clicar em "More details" é redirecionado para
   "/pokemons/25"`, () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pikachuInfos } isFavorite />,
    );

    const detatilsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detatilsLink);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('testa se existe um ícone de estrela nos Pokémons favoritados1', () => {
    renderWithRouter(
      <Pokemon pokemon={ pikachuInfos } isFavorite />,
    );

    const starIcon = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(starIcon).toHaveProperty('src', 'http://localhost/star-icon.svg');
    expect(starIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
