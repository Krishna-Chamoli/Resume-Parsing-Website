import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import {HttpEventType} from '@angular/common/http'
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  constructor(private _sharedService:SharedService, private _router: Router) { }
  
  resumeFile:any;
  resumeData:any;
  loader = false;
  ngOnInit(): void {
  }
  
  fileChanged(event:any){
    this.resumeFile = event.target.files[0];
    (<HTMLInputElement>document.getElementById("submitbtn")).disabled = false;
  }
  
  uploadResume(){
    this.loader = true;

    let file = this.resumeFile;
    if(file===undefined){
      return;
    }
    else{
      let fdata:FormData = new FormData();
      fdata.append("file", file);
      this._sharedService.uploadResume(fdata).subscribe(
        (data:any)=>{
              this.loader = false;
              this.resumeData = data;
              var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.resumeData), '123').toString();
              this._router.navigate(['/resumeview'], { queryParams: { data: ciphertext}});
      },error=>console.log(error)
      )
    }
  }
}
