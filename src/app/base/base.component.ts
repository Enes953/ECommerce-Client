import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

 export class BaseComponent {

  constructor(private spinner:NgxSpinnerService){ }

  showSpinner(spinnerNameType:SpinnerType){
    this.spinner.show(spinnerNameType);

    setTimeout(()=>this.hideSpinner(spinnerNameType),1000);
  }
  hideSpinner(spinnerNameType:SpinnerType){
    this.spinner.hide(spinnerNameType);
  }
}

export enum SpinnerType{
  Cog="s1",
  BallScalerippleMultiple="s2",
  TriangleskewSpin="s3",
  Ballscalemultiple="s4"
}