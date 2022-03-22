import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

describe('testa o component About', () => {
  it('testa se a página contem um h2 com texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const aboutPokedexEl = screen.getByRole(
      'heading', { name: 'About Pokédex', level: 2 },
    );
    expect(aboutPokedexEl).toBeInTheDocument();
  });

  it('testa se existem dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const textOneEl = screen.getByText(
      /This application simulates a Pokédex, a digital encyclopedia containing all/i,
    );
    const textTwoEl = screen.getByText(
      /One can filter Pokémons by type, and see more details for each one of them/i,
    );
    const imgEl = screen.getByRole('img', { name: 'Pokédex' });

    expect(textOneEl).toBeInTheDocument();
    expect(textTwoEl).toBeInTheDocument();
    expect(imgEl.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(imgEl).toBeInTheDocument();
  });
});
