import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';

import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('testa o componente FavoritePokemons', () => {
  it('testa se é exibida na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavoriteEl = screen.getByText('No favorite pokemon found');

    expect(noFavoriteEl).toBeInTheDocument();
  });

  it('testa se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    let moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');

    let checkboxPokemonFovoritado = screen.getByRole(
      'checkbox', { name: 'Pokémon favoritado?' },
    );
    userEvent.click(checkboxPokemonFovoritado);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);

    const buttonNextPokemon = screen.getByTestId('next-pokemon');
    userEvent.click(buttonNextPokemon);

    moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetailsLink);

    checkboxPokemonFovoritado = screen.getByRole(
      'checkbox', { name: 'Pokémon favoritado?' },
    );
    userEvent.click(checkboxPokemonFovoritado);

    const linkFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavoritePokemons);

    const allFavCards = screen.getAllByTestId('pokemon-name');
    expect(allFavCards).toHaveLength(2);

    expect(allFavCards[0].innerHTML).toBe('Pikachu');
    expect(allFavCards[1].innerHTML).toBe('Charmander');
  });
});
