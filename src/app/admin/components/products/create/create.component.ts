import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(private productService:ProductService,spinner:NgxSpinnerService,private alertify:AlertifyService) { 
    super(spinner)
  }

  ngOnInit(): void { 
  }

  @Output() createdProduct :EventEmitter<Product> = new EventEmitter();
  // @Output() fileUploadOptions:Partial<FileUploadOptions>={
  //   action:"upload",
  //   controller:"products",
  //   explanation:"Resimleri sürükleyin veya seçin",
  //   isAdminPage:true,
  //   accept:".png, .jpg, .jpeg, .json"
  // };

  create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){
    this.showSpinner(SpinnerType.Cog)
    const product:Product = new Product();
    product.name=name.value;
    product.stock=stock.value;
    product.price=parseInt(price.value);

    this.productService.create(product,()=>{
      this.hideSpinner(SpinnerType.Cog);
      this.alertify.message("Ürün Başarıyla Eklendi",{
        messageType:MessageType.Success,
        position:Position.TopRight,
        dismissOthers:true
      });
      this.createdProduct.emit(product)
    },errorMessage => {
      this.alertify.message(errorMessage,
        {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
    });
  }
}
