// ----------------------------------------------------------------------

export type IProductReview = {
  id: string;
  name: string;
  avatarUrl: string;
  comment: string;
  rating: number;
  isPurchased: boolean;
  helpful: number;
  postedAt: Date | string | number;
};

export type IDM_Khoahoc = {
  ID_Khoahoc: string;
  Nhomlv: string;
  Tenkhoahoc: string;
  Gioithieuchung: string;
  Sotiethoc: number;
  Tongthoigian: string;
  Hinhanh: string;
  isDelete: string;
};

export type ICourseTableFilterValue = string | null | [] | string[];

export type ICourseFilter = {
  name: string ;
  gender: string[];
  category: string;
  colors: string[];
  priceRange: number[];
  rating: string;
  sortBy: string;
};

export type ICourseState = {
  isLoading: boolean;
  error: Error | string | null;
  dm_khoahoc: IDM_Khoahoc[];
};
