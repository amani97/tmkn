export interface Course {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  firstLevel: string;
  secondLevel: string;
  thirdLevel: string;
  teacher: string;
  class: string;
  whatsappGroupLink: string;
  price: number;
  priceAfterDiscount: number;
  active: boolean;
  accepted: boolean;
  showHomePage: boolean;
  showAtStoreNotes: boolean;
  availableForSale: boolean;
}
