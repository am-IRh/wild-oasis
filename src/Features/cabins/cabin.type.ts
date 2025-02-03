import type { CabinCreateWithImage, CabinType } from "../../service/apiCabins";

interface PropsType {
  cabinToEdit?: CabinType;
  onCloseModal?: any;
}

interface MutationType {
  newCabinData: CabinCreateWithImage;
  id?: number;
}

export type { MutationType, PropsType };
