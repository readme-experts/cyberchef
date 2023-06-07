export interface RecipeDTO {
  readonly name: string;
  readonly categoryId: number;
  readonly products?: string;
  readonly description?: string;
  readonly imageLink?: string;
}
