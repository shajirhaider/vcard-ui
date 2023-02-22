import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { Clipboard } from '@angular/cdk/clipboard';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  cardList = []
  qrCodeValue = ""
  qrLogo : any
  logoModal = false
  qrModal = false
  qrCodeText = "Scan Me"
  qrFrameColor = "#FFF"
  iscopyed = false
  imageChangedEvent: any = '';
  imageChangedEventLogo : any = ""
  croppedImage: any = '';
  imageModal = false
  deleteModal = false
  deleteId = ""
  deleteMsg = ""
  progress = false
  appName = environment.appName
  userName = ""

  constructor(private clipboard: Clipboard, private api: ApiService) { }

  ngOnInit(): void {
    this.userName = this.api.getUserName()
    this.getVcardList()
  }

  logout(){
    this.api.logout()
  }

  dateParse(date){
    let parsedDate = ""
    if(date){
      let d = new Date(date)
      let monthArr = ['Jan', 'Feb', 'Mar', "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      parsedDate = d.getDate() + " " + monthArr[d.getMonth()] + ", " + d.getFullYear()
    }
    return parsedDate
  }

  getVcardList(){
    this.progress = true
    this.api.getVcardList()
    .subscribe(data => {
      let list : any = data
      for(let i of list){
        i.createdOn = this.dateParse(i.createdOn )
        i.qrCodeValue = environment.domain + "/qr/"+ i.qrCodeValue
      }
      this.cardList = list
      this.progress = false
    });
  }

  deleteCard(){
    this.api.deleteCard(this.deleteId)
    .subscribe(data => {
      if(data["success"]){
        this.deleteMsg = data["msg"]
        this.getVcardList()
      }else{
        this.deleteMsg = "Can not delete now. Please try again later."
      }
    });
  }
  
  fileChangeEventLogo(event: any): void {
    this.logoModal = true
    this.imageChangedEventLogo = event;
  }
  fileChangeEvent(event: any): void {
    this.imageModal = true
    this.imageChangedEvent = event;
  }
  fileChangeEventQr(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.qrLogo = reader.result
    };

  }

  qrFrameFn(){
    const aclass :any = document.querySelectorAll('.aclass');
    const qrcodeTxt :any = document.querySelectorAll('.qrcodeTxt');
    if(this.qrFrameColor){
      aclass.forEach(box => {
        box.style.border = '10px solid'+this.qrFrameColor;
        box.style.borderRadius = '10px';
      });
      qrcodeTxt.forEach(box => {
        box.style.background = this.qrFrameColor;
      });
    }else{      
      aclass.forEach(box => {
      box.style.border = 'none';
      box.style.borderRadius = '0px';
    });
    qrcodeTxt.forEach(box => {
      box.style.background = '#FFF';
    });

    }
  }

  copyText(textToCopy: string) {
    if(textToCopy){
      this.clipboard.copy(textToCopy);
      this.iscopyed = true
    }
  }
  public downloadQRCode() {

    const captureElement: any = document.getElementsByClassName('qrCode-panel')[0]
    html2canvas(captureElement)
        .then(canvas => {
            canvas.style.display = 'none'
            document.body.appendChild(canvas)
            return canvas
        })
        .then(canvas => {
            const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
            const a = document.createElement('a')
            a.setAttribute('download', 'my-image.png')
            a.setAttribute('href', image)
            a.click()
            canvas.remove()
        })
    
 }
}
