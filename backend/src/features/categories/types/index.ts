export interface CreateCategoryInput {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  isActive?: boolean;
}

export interface UpdateCategoryInput {
  name?: string;
  slug?: string;
  description?: string;
  image?: string;
  isActive?: boolean;
}
