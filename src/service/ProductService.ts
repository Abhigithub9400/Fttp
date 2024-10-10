export interface Product {
  id: String;
  image: String;
  name: String;
  rating: String;
  reviews: Number;
  stars: Number;
  price: String;
}
export const ProductService = {
  getProductsData(): Product[] {
    return [
      {
        id: '1',
        image: 'https://picsum.photos/id/77/450/300',
        name: 'Hotel Wöscherhof',
        rating: '4.5',
        reviews: 1563,
        stars: 4,
        price: '$30.00'
      },
      {
        id: '2',
        image: 'https://picsum.photos/id/77/450/300',
        name: 'Hotel Mari Pop Boutique',
        rating: '4.5',
        reviews: 1563,
        stars: 4,
        price: '$30.00'
      },
      {
        id: '3',
        image: 'https://picsum.photos/id/77/450/300',
        name: 'Hotel Almholf',
        rating: '4.5',
        reviews: 1563,
        stars: 4,
        price: '$30.00'
      },
      {
        id: '4',
        image: 'https://picsum.photos/id/77/450/300',
        name: 'Hotel ABC',
        rating: '4.5',
        reviews: 1563,
        stars: 4,
        price: '$30.00'
      },
      {
        id: '5',
        image: 'https://picsum.photos/id/77/450/300',
        name: 'Hotel BCD',
        rating: '4.5',
        reviews: 1563,
        stars: 4,
        price: '$30.00'
      }
    ];
  },

  getProductsSmall(): Promise<Product[]> {
    return Promise.resolve(this.getProductsData().slice(0, 10));
  }
};
