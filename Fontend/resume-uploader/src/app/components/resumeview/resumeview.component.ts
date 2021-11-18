import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-resumeview',
  templateUrl: './resumeview.component.html',
  styleUrls: ['./resumeview.component.css']
})
export class ResumeviewComponent implements OnInit {

  resumeData: any;
  submitted = false;
  constructor(private ActivatedRoute: ActivatedRoute, private _sharedServices: SharedService, private router: Router) {
    this.ActivatedRoute.queryParamMap
      .subscribe((params: any) => {
        var decryptedData  = CryptoJS.AES.decrypt(params.get('data'), '123').toString(CryptoJS.enc.Utf8);
        this.resumeData = decryptedData;
        this.resumeData = JSON.parse(this.resumeData);
      });
  }

  ngOnInit(): void {
  }

  updateResume(name: string, mobile: string, email: string) {
    console.log(name, mobile, email)
    let data = { "name": name, "mobile": mobile, "email": email, "id": this.resumeData["id"] };
    this._sharedServices.updateResume(data).subscribe(
      data => this.submitted = true,
      error => console.log(error)
    )
  }

  deleteResume() {
    let data = { "id": this.resumeData["id"], };
    this._sharedServices.deleteResume(data).subscribe(
      data => console.log(data),
      error => console.log(error)
    )
    this.router.navigate(['']);
  }

}
