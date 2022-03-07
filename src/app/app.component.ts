import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { map } from "rxjs/operators";
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  card: any;
 NPIDataUrl: string;
restaurantes:any;
bares: any;
private baseUrl = environment;

constructor(public http:HttpClient){
  this.NPIDataUrl = "";
}
  
  ngOnInit(): void {
  this.getAllRestaurantes();
  this.getAllBares();
  }
  getAllRestaurantes(){
    this.getData("https://localhost:44337/weatherforecast/getOsais?categoria=2")
    .subscribe((res: any) => {
        this.restaurantes = res;
        this.card=res[0];
        console.log(this.restaurantes);
    });
  }

  getAllBares(){
    this.getData("https://localhost:44337/weatherforecast/getOsais?categoria=3")
    .subscribe((res: any) => {
        this.bares = res;
        console.log(this.bares);
    });
  }
  getData(url: string): Observable<any> {
        return this.http.get(url).pipe(
            map((response: any) => {
                if (response) {
                    if (response.hasError && response.errorCode == 401) {
                         return false;
                    }
                    return response;
                } else {
                    return [];
                }
            })
        );
    }
    setView(e :any){
      this.card=e;
  console.log(e);
}


}
