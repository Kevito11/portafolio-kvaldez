import { render, screen } from '@testing-library/react';
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
    it('renders profile photo', () => {
        render(<About />);

        const photo = screen.getByAltText('Kevin Valdez');
        expect(photo).toBeInTheDocument();
    });
});
