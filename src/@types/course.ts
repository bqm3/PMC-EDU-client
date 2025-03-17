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


export type IDT_Hocvien = {
  ID_Hocvien: string;
  ID_Khoahoc: string;
  ID_Lophoc: string;
  ID_Connguoi: string;
  Mahv: string;
  ID_Hinhthucthi: string;
  ID_Baithi: string;
  Hoanthanhhoc: string;
  Diemso: string;
  Dat: string;
  Nguoidanhgia: string;
  Noidungdanhgia: string;
  isDelete: string;
  dm_khoahoc: IKhoahoc;
  dt_lophoc: ILophoc;
  dt_baithi: IBaiThi;
}
export interface ILoaidangky {
  ID_Loaidangky: string;
  Loaidangky: string;
  Nguoitao: string;
  Nguoixoa: string;
}

export interface IHinhthucdt {
  IHinhthucdt: string;
  Hinhthucdt: string;
}

export interface ILoainhom {
  ID_Loainhom: string;
  Loainhom: string;
}

export type DT_Diemdanh = {
  ID_Diemdanh: string;
  ID_Connguoi: string;
  ID_Lichhoc: string;
  ID_Khoahoc: string;
  Maconnguoi: string;
  MaKh: string;
  Giora: string;
  Giovao: string;
  iXacnhan: string;
  Nguoixn: string;
  dt_hosons: any;
  dt_lichhoc: any;
  dm_khoahoc: any;
}

export type ILinhvuc = {
  ID_Linhvuc: string;
  Linhvuc: string;
  isDelete: string;
}

export type IVideoOnline = {
  ID_Video: string;
  ID_Khoahoc: string;
  ID_Tiethoc: string;
  Tenvideo: string;
  Noidungtt: string;
  urlVideo: string;
  Hinhanh: string;
  iOnline: string;
  Magv: string;
  Nguoitao: string;
  Nguoixoa: string;
  isDelete: string;
  dm_tiethoc: ITiethoc;
}

export type ITiethoc = {
  ID_Tiethoc: string;
  Tiethoc: string;
  isDelete: string;
  videos: IVideoOnline[]
}

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
  course: ILophoc | null;
  dm_khoahoc: IKhoahoc[];
  user_courses: IHocvien[];
  class_courses: ILophoc[];
  detai_class_courses: IKhoahoc | null;
  dt_diemdanh: DT_Diemdanh[]
  await_courses: IDangKy[]
};

export type IKhoahoc = {
  ID_Khoahoc: string;
  ID_Linhvuc: string;
  Tenkhoahoc: string;
  SlugTenkhoahoc: string;
  Gioithieuchung: string;
  Sotiethoc: string;
  Tongthoigian: string;
  Hinhanh: string;
  SoHocVien: string;
  isDelete: string;
  dm_linhvuc: ILinhvuc;
  dt_videoonlines: IVideoOnline[];
  dt_nhchs: INHCH[] | any[];
  dt_lophocs: ILophoc[];
  dangky_list: IDangKy[] | any[]
};

export type IBaiThi = {
ID_Baithi: string;
ID_Khoahoc: string;
ID_Hinhthucthi: string;
iCheckthi: string;
Tenbaikt: string;
Gioithieubkt: string;
Ngaythi: string;
Ngayketthuc: string;
Thoigianthi: string;
Socauhoi: string;
Diemchuan: string;
Tongdiem: string;
Nguoitao: string;
Nguoixoa: string;
dm_khoahoc: IKhoahoc;
dm_hinhthucthi: IHinhthucthi;
dt_baithi_hv: IBaiThiHV;
dt_baithi_cauhois: IBaithiCauhoi[];
dt_baithi_phans: IBaithiPhan[];
}

export type IBaiThiHV = {
  ID_Baithi:string;
  ID_Baithi_HV:string;
  ID_Hocvien: string;
  MaHV: string;
  Ngaythi: string;
  Thoigianbd: string;
  Thoigiancham: string;
  Thoigiannb: string;
  Tongdiem: string;
  isMark: string;
}

export type IBaithiPhan = {
ID_Baithi_Phan: string;
Mabaithi_Phan: string;
ID_Baithi: string;
Tenphan: string;
iNgaunhien: string;
Nguoitao: string;
Nguoixoa: string;
isDelete: string;
}

export type IBaithiCauhoi = {
ID_BaithiCH: string;
ID_Baithi: string;
ID_Baithi_Phan: string;
ID_NHCH: string;
iNgannhienda: string;
Nguoitao: string;
Nguoixoa: string;
isDelete: string;
dt_cauhois: INHCH[]
}


export type INHCH = {
ID_NHCH: string;
MaNHCH: string;
ID_Khoahoc: string;
ID_LoaiCH: string;
ID_Dokho: string;
NoidungCH: string;
Diemtru: string;
Thutu: string;
Diemtoida: string;
Ghichu: string | null;
Nguoitao: string;
Nguoixoa: string | null;
createdAt: string; 
isUpdate: string;
updatedAt: string; 
isDelete: string; 
dm_loaich: ILoaicauhoi;
dm_khoahoc: IKhoahoc;
nhchda_list: INHCHDA[]
};
export interface ILoaicauhoi{
  ID_LoaiCH: string;
  Maloaich: string;
  Tenloaich: string;
  Nguoitao: string;
  Nguoixoa: string;
  isDelete: string;
};

export type INHCHDA = {
ID_NHCHDA: string;
MaNHCHDA: string;
Noidungda: string;
Phanhoi: string;
Ghichu: string;
}
export type IHinhthucthi = {
  ID_Hinhthucthi: string;
  Hinhthucthi: string;
  Nguoitao: string;
  isDelete: string;
};

export type ILophoc = {
ID_Lophoc: string;
ID_Loainhom: string;
ID_Loaidangky: string;
iShow: string;
ID_Khoahoc: string;
Soluongdangky: string;
Malop: string;
Tenlop: string;
Noiycdt: string;
ID_Hinhthucdt: string;
Cacgtlq: string | null;
Nguoitd: string;
ID_Giangvien: string;
iTinhtrang: string;
Ngaybt: string | null; // YYYY-MM-DD
Ngaykt: string | null; // YYYY-MM-DD
Ghichu: string | null;
isDelete: string;
dm_khoahoc: IKhoahoc;
dm_giangvien: IGiangvien;
dm_loainhom: ILoainhom;
dm_loaidangky: ILoaidangky;
dm_hinhthucdt: IHinhthucdt;
dt_lichhocs: ILichhoc[]
dt_hocviens: IHocvien[];
};
export type IGiangvien = {
  ID_Giangvien: string;
  Magv: string;
  iNoibo: string;
  HoDem: string;
  Ten: string;
  GioiTinh: string;
  Ngaysinh: string;
  Dienthoai: string;
  CCCD: string;
  Diachi: string;
  NoiCT: string;
  LoaiGiangVien: string;
  GhiChu: string;
  NguoiTao: string;
  NguoiXoa: string;
  isDelete: string;
}
export type IDangKy = {
ID_Dangky: string;
ID_Connguoi: string;
Maconnguoi: string;
ID_Loaidangky: string;
ID_Lophoc: string;
ID_Khoahoc: string;
iTinhtrang: string;
Ngaydangky: string;
Lydo: string;
isDelete: string;
dt_lophoc: ILophoc;
dt_hosons: IHosoHV;
dm_khoahoc: IKhoahoc;
dm_loaidangky: ILoaidangky;
}

export interface ILichhoc {
ID_Lichhoc?: string;
ID_Lophoc?: string;
ID_Tiethoc?: string;
Ngay?: string;
Giobatdau?: string; 
Gioketthuc?: string;
Noidung?: string;
Tieude?: string;
Time?: string;
Noihoc?: string;
Ghichu?: string;
urlVideo?: string;
isDelete?: string;
createdAt?: Date;
updatedAt?: Date;
dm_tiethoc: ITiethoc;
}

export type IHocvien = {
ID_Hocvien: string;
ID_Khoahoc: string;
ID_Lophoc: string;
ID_Hinhthucthi: string;
ID_Baithi: string;
ID_Connguoi: string;
Mahv: string;
Hoanthanhhoc: string;
Diemso: string;
Dat: string;
Nguoidanhgia: string;
Noidungdanhgia: string;
isDelete:  string;
dt_hosons: IHosoHV;
dm_loaidangky: ILoaidangky;
dt_baithi?: IBaiThi;
dm_hinhthucthi: IHinhthucthi;
dt_lophoc ?: ILophoc
dm_khoahoc ?: IKhoahoc;
}

export type IDiemdanh = {
ID_Diemdanh: string;
ID_Connguoi: string;
ID_Lichhoc: string;
ID_Khoahoc: string;
Maconnguoi: string;
Ngaysinh: string;
MaKh: string;
Ngaydd: string;
Giora: string;
Giovao: string;
iXacnhan: string;
Nguoixn: string;

}

export interface IVBCCCN extends IBaseEntity {
ID_VBCCCN: string;
ID_Khoahoc: string;
NhomtenVBCC: string;
Mavb: string;
Tenvb: string;
Noicap: string;
Hedt: string;
Donviql: string;
Thoihan: string;
Ghichu: string;
dm_khoahoc?: IKhoahoc;
}

export interface IBaseEntity {
  isDelete: string;
  Nguoitao?: string;
  Nguoixoa?: string;
}

export type IHosoHV = {
  ID_Connguoi: string;
  iNhanvien: number;
  Maconnguoi: string;
  Macv: string | null;
  Mabp: string | null;
  Hodem: string;
  Ten: string;
  iGioitinh: number;
  iQuoctich: string | null;
  Ngaysinh: string | null;
  ExpiredAt: string | null;
  OTP: string | null;
  Diachilienhe: string;
  Avatar: string;
  CCCD: string;
  NgaycapCCCD: string;
  Hochieu: string;
  NgaycapHochieu: string;
  Email: string;
  Sodienthoai: string;
  iDangkyttkh: number;
  iDangkythi: number;
  DcTamtru: string;
  DcThuongtru: string;
  Tendangnhap: string;
  Matkhau: string;
  ManhomUser: string | null;
  Ghichu: string | null;
  iTinhtrang: number;
  deviceToken: string | null;
  deviceName: string | null;
  isDelete: number;
  createdAt: string;
  updatedAt: string;
  dm_bophan: any;
};