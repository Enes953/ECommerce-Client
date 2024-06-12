import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from 'src/app/contracts/base_url';
import { List_Product } from 'src/app/contracts/list_product';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
 constructor(private productService:ProductService,private activaedRoute:ActivatedRoute,private fileService:FileService){ }

 products:List_Product[]
 currentPageNo:number
 count:number
 pages:number
 pageList:number[]=[];
 baseUrl:BaseUrl;
 async ngOnInit() {
  this.baseUrl = await this.fileService.getBaseStorageUrl();
  this.activaedRoute.params.subscribe(async params => {
    this.currentPageNo = parseInt(params["pageNo"] ?? 1);

    const data = await this.productService.list(this.currentPageNo - 1, 12,
      () => {},
      errorMessage => {}
    );
    this.products = data.items;

    this.products = this.products.map<List_Product>(p => {
      const listProduct: List_Product = {
        id: p.id,
        createdDate: p.createdDate,
        imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase)?.filePath : "",
        name: p.name,
        price: p.price,
        stock: p.stock,
        updateDate: p.updateDate,
        productImageFiles: p.productImageFiles
      };
      return listProduct;
    });
    this.count = data.count;
    this.pages = data.pages;
    this.pageList = [];

    if (this.currentPageNo - 3 <= 0) {
      for (let i = 1; i <= 7; i++) {
        this.pageList.push(i);
      }
    } else if (this.currentPageNo + 3 >= this.pages) {
      for (let i = this.pages - 6; i <= this.pages; i++) {
        this.pageList.push(i);
      }
    } else {
      for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++) {
        this.pageList.push(i);
      }
    }
  });
}
}