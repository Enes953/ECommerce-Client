import { List_Product } from "../list_product";
import { BasePageableModel } from "./pagings/base-pageable-model";

export interface ProductListModel extends BasePageableModel{

    items:List_Product[];
}