import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';

import App from '../App';

describe('testa o compondente App', () => {
  it('Testa se o topo da aplicação contém os links Home, About e Favorite Pokémons',
    () => {
      renderWithRouter(<App />);

      const linkHome = screen.getByRole('link', { name: 'Home' });
      expect(linkHome).toBeInTheDocument();
      const linkAbout = screen.getByRole('link', { name: 'About' });
      expect(linkAbout).toBeInTheDocument();
      const linkFavoritePokemons = screen
        .getByRole('link', { name: 'Favorite Pokémons' });
      expect(linkFavoritePokemons).toBeInTheDocument();
    });

  it('testa se ao clicar no link Home é redirecionado para a URL "/"', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const linkHome = screen.getByRole('link', { name: 'Home' });

    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  it('testa se ao clicar no link About é redirecionado para a URL "/about"', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const linkAbout = screen.getByRole('link', { name: 'About' });

    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  it('ao clicar no link Favorite Pokémons é redirecionado para a URL "/favorites"',
    () => {
      const { history } = renderWithRouter(<App />);

      expect(history.location.pathname).toBe('/');

      const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });

      userEvent.click(linkFavorite);
      expect(history.location.pathname).toBe('/favorites');
    });

  it('ao ir para uma página que não existe deve ir para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    history.push('/unknown link');

    const notFoundEl = screen.getByRole(
      'heading', { name: /page requested not found/i, level: 2 },
    );
    expect(notFoundEl).toBeInTheDocument();
  });
});

