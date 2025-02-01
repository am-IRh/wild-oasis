import type { CabinCreateWithImage, CabinType } from "../../service/apiCabins";

interface PropsType {
  cabinToEdit?: CabinType;
  onShowForm: any;
}

interface MutationType {
  newCabinData: CabinCreateWithImage;
  id?: number;
}

export type { MutationType, PropsType };
