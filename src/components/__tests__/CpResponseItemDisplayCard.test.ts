import { render, fireEvent, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { ProductService } from '@/service/ProductService';
import CpResponseItemDisplayCard from '@/components/CpResponseItemDisplayCard.vue';

describe('ProductService', () => {
  it('Should return an array of products with correct data structure', () => {
    const products = ProductService.getProductsData();
    expect(products).toBeInstanceOf(Array);
    expect(products).toHaveLength(5);
    expect(products[0]).toHaveProperty('id', '1');
    expect(products[0]).toHaveProperty('name', 'Hotel Wöscherhof');
    expect(products[0]).toHaveProperty('rating', '4.5');
    expect(products[0]).toHaveProperty('reviews', 1563);
    expect(products[0]).toHaveProperty('stars', 4),
      expect(products[0]).toHaveProperty('price', '$30.00');
  });
});
describe('CpResponseItemDisplayCard', () => {
  beforeEach(async () => {
    render(CpResponseItemDisplayCard);
  });
  it('should disable previous button on the first page', async () => {
    const prevButton = screen.getByText(/previous/i);
    expect(prevButton).toBeDisabled();
  });

  it('should call the next method when next button is clicked', async () => {
    const nextButton = screen.getByText(/next/i);
    await fireEvent.click(nextButton);
    expect(nextButton).not.toBeDisabled();
  });
});
