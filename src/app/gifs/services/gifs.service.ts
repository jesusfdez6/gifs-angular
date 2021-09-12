import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  

    private apikey:string = "WFWd16TrRDuVaKdJ3rT230lVZw3Q1WT0";
    private url:string ="https://api.giphy.com/v1/gifs";
    private  _historial : string[]=[];
    private _imagenes :Gif[]=[];

    get historial(){
      return [...this._historial]
    }

    get resultados(){
      return [...this._imagenes];
    }

    constructor(private http:HttpClient){

      this._historial= JSON.parse(localStorage.getItem("busqueda")!) || [];

      this._imagenes= JSON.parse(localStorage.getItem("resultados")!) || [];


    }

    buscarGifs(query:string){

      query = query.trim().toLocaleLowerCase();

      if(!this._historial.includes(query)){
       
        this._historial.unshift(query);
        this._historial = this._historial.splice(0,10);

        localStorage.setItem("busqueda",JSON.stringify(this._historial));

      }
      const params = new HttpParams()
      .set("api_key",this.apikey)
      .set("q",query)
      .set("limit",'10')

      this.http.get<SearchGifsResponse>(`${this.url}/search`,{params})
      .pipe(
        map((resp)=>resp.data)
      )
      .subscribe((resp)=>{
        this._imagenes = resp;  
        localStorage.setItem("resultados",JSON.stringify(this._imagenes));

      },
      err=>console.log(err)
      )
      

    }





    


}


//https://developers.giphy.com/
