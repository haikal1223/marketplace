interface Item {
  label: string;
  value: string;
}

export interface FilterCategoryChild {
  title: string;
  slug: string;
}

export interface FilterCategory {
  title: string;
  slug: string;
  children?: FilterCategoryChild[];
}

export default interface Filters {
  brands: Item[];
  others: Item[];
  colors: string[];
  categories: FilterCategory[];
}
