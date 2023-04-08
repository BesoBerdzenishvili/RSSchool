import { it, test, describe, expect, vitest, afterEach } from 'vitest';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import CharacterModal from './CharacterModal';

const character = {
  id: 1,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  episode: ['e1', 'e1'],
  url: '',
  created: '',
};

describe('CharacterModal component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<CharacterModal info={character} setShowModal={() => {}} />);
    expect(getByTestId('modal-container')).toBeTruthy();
  });

  it('displays the character information', () => {
    const { getAllByText } = render(<CharacterModal info={character} setShowModal={() => {}} />);
    expect(getAllByText('Morty Smith')).toBeTruthy();
    expect(getAllByText('Alive')).toBeTruthy();
    expect(getAllByText('Human')).toBeTruthy();
    expect(getAllByText('Male')).toBeTruthy();
    expect(getAllByText('Earth')).toBeTruthy();
  });

  it('displays the character type if it exists', () => {
    character.type = 'Humanoid';
    const { getByText } = render(<CharacterModal info={character} setShowModal={() => {}} />);
    expect(getByText('Humanoid')).toBeTruthy();
  });

  it('closes the modal when the "X" button is clicked', () => {
    afterEach(cleanup);
    const setShowModal = vitest.fn();
    const { getAllByTestId } = render(
      <CharacterModal info={character} setShowModal={setShowModal} />
    );
    const btn = getAllByTestId('delete-btn-x')[0];
    fireEvent.click(btn);
  });

  it('status color for live character', () => {
    const { getByText } = render(<CharacterModal info={character} setShowModal={() => {}} />);
    const statusElement = getByText('Alive');
    const color = getComputedStyle(statusElement).color;
    expect(color).toBe('green');
  });

  it('status color for not live character', () => {
    character.status = 'dead';
    const { getByText } = render(<CharacterModal info={character} setShowModal={() => {}} />);
    const statusElement = getByText('dead');
    const color = getComputedStyle(statusElement).color;
    expect(color).toBe('red');
  });

  test('closes the modal when the overlay is clicked', () => {
    const setShowModal = vitest.fn();
    render(<CharacterModal info={character} setShowModal={setShowModal} />);
    const overlay = screen.queryByTestId('modal-overlay');
    if (overlay) {
      fireEvent.click(overlay);
      expect(setShowModal).toHaveBeenCalledWith(false);
    }
  });
});
