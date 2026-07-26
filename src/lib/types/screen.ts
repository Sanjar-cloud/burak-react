import type { Member } from "./member";
import type { Product } from "./product";

/** React app Sate **/
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
}

/** homePage  **/
export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}

/** Products Page  **/
export interface ProductsPageState {
  restaurant: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}



/** Orders Page  **/