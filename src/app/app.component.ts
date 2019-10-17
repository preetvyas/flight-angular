import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
  origin ='';
  destination ='';
  count = ''
  departureDate =''
  returnDate =''
  registerForm: FormGroup;
  flightData = [{
    "airline": "Airindia 737",
    "imgURL": "https://www.avasflowers.net/img/prod_img/avasflowers-dreaming-of-tuscany-bouquet.jpg",
    "from": "BLR",
    "to": "DEL",
    "date": "2019-10-17",
    "returnDate": "",
    "origin": "banglore",
    "destination": "delhi",
    "price": "2000",
    "departTime": "12:00 PM",
    "arriveTime": "15:50 PM",
    "seats": "5"
  }, {
    "airline": "Airindia 731",
    "imgURL": "https://www.avasflowers.net/img/prod_img/avasflowers-dreaming-of-tuscany-bouquet.jpg",
    "from": "PUN",
    "to": "AHM",
    "date": "2019-10-17",
    "returnDate": "2019-10-18",
    "origin": "pune",
    "destination": "ahmedabad",
    "price": "3000",
    "departTime": "12:00 PM",
    "arriveTime": "15:50 PM",
    "seats": "5"
  }, {
    "airline": "Airindia 732",
    "imgURL": "https://www.avasflowers.net/img/prod_img/avasflowers-dreaming-of-tuscany-bouquet.jpg",
    "from": "PUN",
    "to": "MUM",
    "date": "2019-10-18",
    "returnDate": "",
    "origin": "pune",
    "destination": "mumbai",
    "price": "4000",
    "departTime": "12:00 PM",
    "arriveTime": "15:50 PM",
    "seats": "5"
  }, ]
    submitted = false;
    show =false;
    model: NgbDateStruct;
    date: {year: number, month: number};
    constructor(private formBuilder: FormBuilder ,private calendar: NgbCalendar) { }
    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        origin: ['', Validators.required],
        destination:['',Validators.required],
        departureDt:['',Validators.required],
        returnDt:['',Validators.required],
        passengers:['',Validators.required]
         
      } );
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    else{
      console.log(this.registerForm.value,'test')
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
}
selectToday() {
  this.model = this.calendar.getToday();
}
onSearch(){
  let dataObj =this.registerForm.value
  if(this.show == true){
    this.origin =dataObj.origin
    this.destination =dataObj.destination
    this.count =dataObj.passengers
    
   let currentDate =dataObj.departureDt.year +'-'+dataObj.departureDt.month +'-'+dataObj.departureDt.day
    let reutnDate = dataObj.returnDt.year +'-'+dataObj.returnDt.month +'-'+dataObj.returnDt.day
    if(dataObj.returnDt){
      this.returnDate =dataObj.returnDt.year +'-'+dataObj.returnDt.month +'-'+dataObj.returnDt.day
    }
    if(dataObj.departureDt){
      this.departureDate =dataObj.departureDt.year +'-'+dataObj.departureDt.month +'-'+this.registerForm.value.departureDt.day
    }
    var newArray = this.flightData.filter(function (el) {
      return el.origin == dataObj.origin.toLowerCase() && el.destination == dataObj.destination.toLowerCase()
    });
    this.flightData =newArray
  }
  else{    
    this.origin =dataObj.origin
    this.destination =dataObj.destination
    this.count =dataObj.passengers
    if(dataObj.departureDt){
      this.departureDate =dataObj.departureDt.year +'-'+dataObj.departureDt.month +'-'+this.registerForm.value.departureDt.day
    }
    
    this.returnDate =''
    var newArray = this.flightData.filter(function (el) {
      return el.origin == dataObj.origin.toLowerCase() && el.destination == dataObj.destination.toLowerCase()
      // return el.date == currentDate 
      // || el.origin == this.registerForm.value.origin || el.destination == this.registerForm.value.destination
    });
    this.flightData =newArray
  }
    
  
  
  
}
onReset() {
    this.submitted = false;
    this.registerForm.reset();
}
onWay(data){
  if(data == true){
    this.show =true
  }
  else{
    this.show=false
  }
console.log(data,'test')
}
}
