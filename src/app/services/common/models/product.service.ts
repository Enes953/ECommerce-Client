import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Product } from "src/app/contracts/product";
import { HttpClientService } from "../http-client.service";
import { firstValueFrom, Observable } from 'rxjs';
import { ProductListModel } from 'src/app/contracts/models/product-list-model';
import { List_Product_Image } from 'src/app/contracts/list_product_image';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClientService: HttpClientService, private httpClient:HttpClient) { }

  create(product: Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products"
    }, product).subscribe({
      next: result => {
        successCallBack();
      },
      error: (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string; value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      },
    });
  }

  async list(page: number = 0, pageSize: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<ProductListModel> {
    const promiseData: Promise<ProductListModel> = firstValueFrom(this.httpClientService.get<ProductListModel>({
      controller: `products`,
      queryString: `page=${page}&pageSize=${pageSize}`
    }))

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))
    return await promiseData;
  }

  async delete(id:string){
   const deleteObservable:Observable<any> =this.httpClientService.delete<any>({
      controller: "products"
    },id)
    await firstValueFrom(deleteObservable)
  }

  async readImages(id: string, successCallBack?: () => void): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> = this.httpClientService.get<List_Product_Image[]>({
      action: "GetProductImages",
      controller: "Products"
      
    }, id);
    const images: List_Product_Image[] = await firstValueFrom(getObservable);
    successCallBack();
    return images;
  }

  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable = this.httpClientService.delete({
      action: "deleteproductimage",
      controller: "products",
      queryString: `imageId=${imageId}`
    }, id)
    await firstValueFrom(deleteObservable);
    successCallBack();
  }
  async changeShowcaseImage(imageId: string, productId: string, successCallBack?: () => void): Promise<void> {
    const changeShowcaseImageObservable = this.httpClientService.get({
      controller: "products",
      action: "ChangeShowcaseImage",
      queryString: `imageId=${imageId}&productId=${productId}`
    });
    await firstValueFrom(changeShowcaseImageObservable);
    successCallBack();
  }
}
