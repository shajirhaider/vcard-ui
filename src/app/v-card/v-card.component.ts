import { Component, Input, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
import { VCard } from "ngx-vcard";
import { Clipboard } from '@angular/cdk/clipboard';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-v-card',
  templateUrl: './v-card.component.html',
  styleUrls: ['./v-card.component.css'],
})
export class VCardComponent implements OnInit, OnChanges  {
  @Input() userInfo = {
    primaryColor: "",
    buttonColor: "",
    gradient : "",
    useGradient : false,
    firstName : "",
    lastName:"",
    mobile:"",
    phone:"",
    fax:"",
    email:"",
    company:"",
    job:"",
    address:"",
    website:"",
    summary : "",
    enableShare : false,
    selectedSM : [],
    logoImage : "",
    image: "https://qrcgcustomers.s3-eu-west-1.amazonaws.com/account2/11_20.jpg",
  }

  shareModal = false
  saveModal = false
  shareEmail = false
  qrCode = ""
  iscopyed = false
  @Input() isPreview = false
  @Input() previewLogo = false
  loading = false

  vCard: VCard = {
    name: {
      firstNames: "John",
      lastNames: "Doe",
    },
  }
  

  constructor(private clipboard: Clipboard, private route: ActivatedRoute, private api: ApiService) {
    
   }

  ngOnInit(): void {
    
    // this.loading = true


    this.vCard.name.firstNames = this.userInfo.firstName
    this.vCard.name.lastNames = this.userInfo.lastName
    this.vCard.url= this.userInfo.website
    this.vCard.workFax = [this.userInfo.fax]
    this.vCard.email= [this.userInfo.email]
    this.vCard.organization = this.userInfo.company
    this.vCard.title = this.userInfo.job
    this.vCard.telephone = [{value: this.userInfo.mobile, param: {type : "cell"} }, {value: this.userInfo.phone, param: {type :'voice' } }]
    // this.vCard.photo = [this.userInfo.image]

    if(!this.isPreview){
      
      this.previewLogo = true
      this.getUserInfo()
    }

  }
    
  ngOnChanges(changes: SimpleChanges): void{

  }

  showLogo(){
    if(this.userInfo.logoImage){
      setTimeout(() => {
        this.previewLogo = false
      }, 2000);
    }else{
      this.previewLogo = false

    }
  }

  gotoLocation(){
    window.open("http://maps.google.com/?q="+this.userInfo.address)
  }


  navigateShare(itemName, value){
    if(itemName === 'Whatsapp' && value === 'qrlink'){
      window.open('whatsapp://send/?text='+this.qrCode)
      return
    }else if (itemName === 'Facebook' && value === 'qrlink'){
      window.open('https://www.facebook.com/sharer/sharer.php?u='+this.qrCode)
      return
    }else if (itemName === 'Twitter' && value === 'qrlink'){
      window.open('https://twitter.com/intent/tweet?url='+this.qrCode + "&text=" + 'Sharing this')
      return
    }else if (itemName === 'mail' && value === 'qrlink'){
      window.open('mailto:?body='+this.qrCode)
      return
    }


    if(itemName === 'Whatsapp' && value !== 'qrlink'){
      window.open('https://wa.me/'+value)
    }else if(itemName === 'Twitter' && value !== 'qrlink'){
      window.open('https://www.twitter.com/'+value)
    }else if(itemName === 'Instagram' && value !== 'qrlink'){
      window.open('https://www.instagram.com/'+value)
    }else if(itemName === 'Snapchat' && value !== 'qrlink'){
      window.open('https://www.snapchat.com/add/'+value)
    }else if(itemName === 'Skype' && value !== 'qrlink'){
      window.open('skype:'+value+'?chat')
    }else if(itemName === 'Twitter' && value !== 'qrlink'){
      window.open('https://www.twitter.com/'+value)
    }else if(itemName === 'Line' && value !== 'qrlink'){
      window.open('https://line.me/R/ti/p/~'+value)
    }else{
      window.open('https://'+value)
    }
}

  

  getUserInfo(){
    this.loading = true
    let id = this.route.snapshot.paramMap.get('code')
    this.api.getvcardData(id)
    .subscribe(data => {
      let res : any = data
      if(res.length > 0){
        this.userInfo = data[0]
        this.qrCode =  environment.domain + "/qr/"+  this.userInfo["uuid"]
        this.vCard.name.firstNames = this.userInfo.firstName
        this.vCard.name.lastNames = this.userInfo.lastName
        this.vCard.url= this.userInfo.website
        this.vCard.workFax = [this.userInfo.fax]
        this.vCard.email= [this.userInfo.email]
        this.vCard.organization = this.userInfo.company
        this.vCard.title = this.userInfo.job
        this.vCard.telephone = [{value: this.userInfo.mobile, param: {type : "cell"} }, {value: this.userInfo.phone, param: {type :'voice' } }]
        // this.vCard.photo = [{value:this.userInfo.image, param:{type: 'video'}}]
       this.showLogo()
        this.loading = false
      }else{
        this.previewLogo = false
      }
      // else{
      //   this.loading = false
      //   this.userInfo.logoImage = this.userInfo.image
      //   this.showLogo()
      // }
    });

  }

  copyText(textToCopy: string) {
    if(textToCopy){
      this.clipboard.copy(textToCopy);
      this.iscopyed = true
    }
  }

}
