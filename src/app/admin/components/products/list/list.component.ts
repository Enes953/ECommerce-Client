import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductListModel } from 'src/app/contracts/models/product-list-model';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private productService:ProductService,
    spinner:NgxSpinnerService,
    private alertifyService:AlertifyService,
    private dialogService:DialogService) { 
    super(spinner)
  }

  
  displayedColumns: string[] = ['name', 'price', 'stock', 'createdDate','updatedDate','photos','edit','delete'];
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

   async getProducts(){
     this.showSpinner(SpinnerType.Cog);
     console.log(this.paginator?.pageIndex)
    const allProducts : ProductListModel = await this.productService.list(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5 ,()=>this.hideSpinner
    (SpinnerType.Cog),errorMessage => this.alertifyService.message(errorMessage,{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.TopRight
      }))
      this.dataSource=new MatTableDataSource<List_Product>(allProducts.items);
       this.paginator.length=allProducts.count;
      // this.dataSource.paginator=this.paginator
      
    }

    // delete(id){
    //   alert(id)
    // }
    addProductImages(id:string){
      this.dialogService.openDialog({
        componentType:SelectProductImageDialogComponent,
        data:id,
        options:{
          width:"1400px"
        }
      })
    }
   async pageChanged(){
      await this.getProducts();
    }

   async ngOnInit(){
     await this.getProducts();
   }
}

 