export class CreateRecipeDto {
  readonly name: string;
  readonly category_id: number;
  readonly products: string;
  readonly description: string;
  readonly image_link?: string;
}
