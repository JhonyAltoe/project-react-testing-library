import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';

import NotFound from '../components/NotFound';

describe('testa o componente NotFound', () => {
  it('testa se página contém um heading h2 com o texto "Page requested not found 😭"',
    () => {
      renderWithRouter(<NotFound />);

      const notFoundTextEl = screen.getByRole(
        'heading', { name: /Page requested not found/i, level: 2 },
      );

      expect(notFoundTextEl).toBeInTheDocument();
    });

  it('testa se página mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"',
    () => {
      renderWithRouter(<NotFound />);

      const imgNotFound = screen.getByRole(
        'img', { name: 'Pikachu crying because the page requested was not found' },
      );

      expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});
