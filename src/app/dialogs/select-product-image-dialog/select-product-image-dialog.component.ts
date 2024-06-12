import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { DialogService } from 'src/app/services/common/dialog.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { BaseDialog } from '../base/base-dialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $:any

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.css']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent>implements OnInit {

  constructor(dialogRef:MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:SelectProductImageState | string,
    private productService:ProductService,
    private spinnerService:NgxSpinnerService,
    private dialogService:DialogService){ 
    super(dialogRef)
  }
  
 @Output() options : Partial<FileUploadOptions>={
  accept:".png , .jpg , .jpeg , .gif",
  action:"upload",
  controller:"products",
  explanation : "Ürünleri seçin veya sürükleyin",
  isAdminPage:true,
  queryString:`id=${this.data}`
 };
 images:List_Product_Image[];

async ngOnInit(){
  this.spinnerService.show(SpinnerType.Cog);
    this.images = await this.productService.readImages(this.data as string, () => this.spinnerService.hide(SpinnerType.Cog));
    debugger
  }
  
 async deleteImage(imageId:string, event: any){

  this.dialogService.openDialog({
    componentType:DeleteDialogComponent,
    data:DeleteState.Yes,
    afterClosed: async()=>{
      this.spinnerService.show(SpinnerType.Cog)
   await this.productService.deleteImage(this.data as string,imageId,()=>{
    this.spinnerService.hide(SpinnerType.Cog)
    var card = $(event.srcElement).parent().parent().parent();
     card.fadeOut(500)
      });
     }
   })
  }
  showCase(imageId: string) {
    this.spinnerService.show(SpinnerType.Cog);

    this.productService.changeShowcaseImage(imageId, this.data as string, () => {
      this.spinnerService.hide(SpinnerType.Cog);
    });
  }
}

export enum SelectProductImageState{
  Close
}