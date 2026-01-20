import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import About from './About';
import { translations } from '../context/translations';

// Mock the hook directly
vi.mock('../context/LanguageContext', () => ({
    useLanguage: () => ({
        t: translations.es
    })
}));

describe('About Component', () => {
    it('renders both profile photos', () => {
        render(<About />);

        const newPhoto = screen.getByAltText('Kevin Valdez');
        const originalPhoto = screen.getByAltText('Kevin Valdez Legacy');

        expect(newPhoto).toBeInTheDocument();
        expect(originalPhoto).toBeInTheDocument();
    });

    it('toggles photos on click', () => {
        render(<About />);

        const newPhoto = screen.getByAltText('Kevin Valdez');
        const originalPhoto = screen.getByAltText('Kevin Valdez Legacy');

        // Traverse up to the wrapper div that has the z-index classes
        // img -> div (border) -> div (relative) -> div (absolute wrapper)
        const newPhotoWrapper = newPhoto.parentElement?.parentElement?.parentElement;
        const originalPhotoWrapper = originalPhoto.parentElement?.parentElement?.parentElement;

        expect(newPhotoWrapper?.className).toContain('z-20');
        expect(originalPhotoWrapper?.className).toContain('z-10');

        // The deck container is the parent of these wrappers
        const deckContainer = newPhotoWrapper?.parentElement;
        expect(deckContainer).toBeInTheDocument();

        fireEvent.click(deckContainer!);

        // Verify state toggle
        expect(newPhotoWrapper?.className).toContain('z-10');
        expect(originalPhotoWrapper?.className).toContain('z-20');
    });
});
