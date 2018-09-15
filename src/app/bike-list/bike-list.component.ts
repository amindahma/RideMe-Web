import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.css']
})
export class BikeListComponent implements OnInit {

  response: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    let res = this.http.get("http://159.89.174.241:8095/bikes")
    // let res = this.http.get("http://localhost:8095/bikes")
    res.subscribe((response) => {
      console.log(response)
      this.response = response
    })
  }

}
