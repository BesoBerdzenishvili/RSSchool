import { it, vitest, describe, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import CharacterModal from './CharacterModal';

afterEach(() => {
  cleanup();
});

const mockUseGetDataQuery = vitest.fn();

vitest.mock('../../redux/characterApi', () => ({
  useGetDataQuery: (id: number) => mockUseGetDataQuery(id),
}));

const mockData = {
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: {
    name: 'Earth',
  },
  location: {
    name: 'Earth',
  },
  episode: [],
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};
describe('CharacterModal', () => {
  it('renders the modal when data is fetched', async () => {
    mockUseGetDataQuery.mockReturnValueOnce({
      data: mockData,
      isLoading: false,
      error: undefined,
    });

    render(<CharacterModal id={1} setShowModal={() => {}} />);
    const modalContainer = await screen.findByTestId('modal-container');

    expect(modalContainer).toBeTruthy();
    expect(screen.getByAltText(mockData.name)).toBeTruthy();
    expect(screen.queryByText(`Name: ${mockData.name}`)).toBeNull();
    expect(screen.queryByText(`Status: ${mockData.status}`)).toBeNull();
    expect(screen.queryByText(`Species: ${mockData.species}`)).toBeNull();
    expect(screen.queryByText(`Gender: ${mockData.gender}`)).toBeNull();
    expect(screen.queryByText(`Origin: ${mockData.origin.name}`)).toBeNull();
    expect(screen.queryByText(`Location: ${mockData.location.name}`)).toBeNull();
    expect(screen.queryByText(`Episodes: ${mockData.episode.length}`)).toBeNull();
  });

  it('renders the loading spinner while fetching data', async () => {
    mockUseGetDataQuery.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
      error: undefined,
    });

    render(<CharacterModal id={1} setShowModal={() => {}} />);
    const loadingSpinner = await screen.findByTestId('loading-test');

    expect(loadingSpinner).toBeTruthy();
  });

  it('renders an error message when there is an error fetching data', async () => {
    mockUseGetDataQuery.mockReturnValueOnce({
      data: undefined,
      isLoading: false,
      error: { message: 'Error message' },
    });

    render(<CharacterModal id={1} setShowModal={() => {}} />);
    const errorMessage = await screen.findByText('Something went wrong...');

    expect(errorMessage).toBeTruthy();
  });

  it("renders renders nothing when there's no data", async () => {
    mockUseGetDataQuery.mockReturnValueOnce({
      data: null,
      isLoading: false,
      error: null,
    });

    render(<CharacterModal id={1} setShowModal={() => {}} />);
  });

  it('closes the modal when the X button is clicked', async () => {
    const mockSetShowModal = vitest.fn();
    mockUseGetDataQuery.mockReturnValueOnce({
      data: mockData,
      isLoading: false,
      error: undefined,
    });

    render(<CharacterModal id={1} setShowModal={mockSetShowModal} />);
    const deleteButton = await screen.findByTestId('delete-btn-x');

    fireEvent.click(deleteButton);

    expect(mockSetShowModal).toHaveBeenCalledWith(false);
  });
});
