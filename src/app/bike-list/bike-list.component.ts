import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbDate, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.css']
})
export class BikeListComponent implements OnInit {

  response: any;
  dateSelected: any;
  itemSelected: any;
  model;
  constructor(private http: HttpClient, private calendar: NgbCalendar, private modalService: NgbModal) { }

  ngOnInit() {
    this.model = this.calendar.getToday();
    let day = new Date();
    this.dateSelected = day.getMonth()+1+"/"+day.getDate()+"/"+day.getFullYear()
    console.log(this.dateSelected)
    const formData = new FormData();
    formData.append('date', this.dateSelected)
    let res = this.http.post("http://159.89.174.241:8095/daily", formData)
    res.subscribe((response) => {
      console.log(response)
      this.response = response
    })
    // let res = this.http.get("http://159.89.174.241:8095/all_bookings")
    // res.subscribe((response) => {
    //   console.log(response)
    //   this.response = response
    // })
  }

  onDateSelection(dates: NgbDate) {
    this.dateSelected = dates.month+"/"+dates.day+"/"+dates.year
    console.log(this.dateSelected)
    const formData = new FormData();
    formData.append('date', this.dateSelected)
    let res = this.http.post("http://159.89.174.241:8095/daily", formData)
    res.subscribe((response) => {
      console.log(response)
      this.response = response
    })
  }

  setRiding(){
    let status = this.itemSelected.riding
    console.log(status)
    if(status == "Start"){
      status = "End"
    }else{
      status = "Start"
    }
    const formData = new FormData();
    formData.append('status', status)
    formData.append('date', this.itemSelected.date)
    formData.append('id', this.itemSelected.id)
    let res = this.http.post("http://159.89.174.241:8095/update_riding", formData)
    res.subscribe((response) => {
      console.log(response)
      if(response == "200"){
        const formData = new FormData();
        formData.append('date', this.dateSelected)
        let res = this.http.post("http://159.89.174.241:8095/daily", formData)
        res.subscribe((response) => {
          console.log(response)
          this.response = response
        })
      }
    })
  }

  openVerticallyCentered(content, item) {
    this.itemSelected = item;
    this.modalService.open(content, { centered: true });
  }

}
