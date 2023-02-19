import { Component, ElementRef, OnInit } from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
// import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import html2canvas from 'html2canvas';
import { Clipboard } from '@angular/cdk/clipboard';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-info-gather',
  templateUrl: './info-gather.component.html',
  styleUrls: ['./info-gather.component.css']
})
export class InfoGatherComponent implements OnInit {

  themes = [
    { img: "assets/images/themes/theme-1.png", isSelected: true, primary: "#548491", button: "#e91e63" },
    { img: "assets/images/themes/theme-2.png", isSelected: false, primary: "#0288D1", button: "#64B5F6" },
    { img: "assets/images/themes/theme-3.png", isSelected: false, primary: "#D32F2F", button: "#EF9A9A" },
    { img: "assets/images/themes/theme-4.png", isSelected: false, primary: "#4CAF50", button: "#81C784" },
    { img: "assets/images/themes/theme-5.png", isSelected: false, primary: "#795548", button: "#FF8A65" },
    { img: "assets/images/themes/theme-6.png", isSelected: false, primary: "#42A48C", button: "#E9B764" },
    { img: "assets/images/themes/theme-7.png", isSelected: false, primary: "#F564AC", button: "#36C17D" },
    { img: "assets/images/themes/theme-8.png", isSelected: false, primary: "#FF8A65", button: "#4B5D71" },
    { img: "assets/images/themes/theme-9.png", isSelected: false, primary: "#7A1EA1", button: "#1DE9B6" },
    { img: "assets/images/themes/theme-10.png", isSelected: false, primary: "#3F51B5", button: "#FF4081" },
  ]

  socialMedia = [
    {icon : "fa-solid fa-globe", name : "Website", hints : "URL", isValid : true, placeholder:"www.mywebsite.com", iconColor : "#616568",  value : "" },
    {icon : "fa-brands fa-facebook", name : "Facebook", hints : "URL", isValid : true, placeholder:"www.facebook.com/page", iconColor : "#3B5998",  value : "" },
    {icon : "fa-brands fa-twitter", name : "Twitter", hints : "@", isValid : true, placeholder:"Username", iconColor : "#1DA1F2",  value : "" },
    {icon : "fa-brands fa-instagram", name : "Instagram", hints : "@", isValid : true, placeholder:"Username", iconColor : "#E1306C",  value : "" },
    {icon : "fa-brands fa-whatsapp", name : "Whatsapp", hints : "Phone ", isValid : true, placeholder:"+123123123", iconColor : "#25D366",  value : "" },
    {icon : "fa-brands fa-tiktok", name : "Tiktok", hints : "URL", isValid : true, placeholder:"www.tiktok.com/@username", iconColor : "#000000",  value : "" },
    {icon : "fa-brands fa-square-snapchat", name : "Snapchat", hints : "ID", isValid : true, placeholder:"Username", iconColor : "#FFFC00",  value : "" },
    {icon : "fa-brands fa-youtube", name : "YouTube", hints : "URL", isValid : true, placeholder:"www.youtube.com/user/mychannel", iconColor : "#CD201F",  value : "" },
    {icon : "fa-brands fa-telegram", name : "Telegram", hints : "URL", isValid : true, placeholder:"t.me/username", iconColor : "#28A8E9",  value : "" },
    {icon : "fa-brands fa-facebook-messenger", name : "Messenger", hints : "URL", isValid : true, placeholder:"m.me/username", iconColor : "#B93BDF",  value : "" },
    {icon : "fa-brands fa-yelp", name : "Yelp", hints : "URL", isValid : true, placeholder:"www.yelp.com/biz/...", iconColor : "#F43939",  value : "" },
    {icon : "fa-brands fa-google", name : "Google Review:", hints : "URL", isValid : true, placeholder:"https://g.page/shortname/review", iconColor : "#EA4335",  value : "" },
    {icon : "fa-brands fa-pinterest", name : "Pinterest", hints : "URL", isValid : true, placeholder:"www.pinterest.com/username", iconColor : "#BD081C",  value : "" },
    {icon : "fa-brands fa-linkedin", name : "LinkedIn", hints : "URL", isValid : true, placeholder:"www.linkedin.com/company/name", iconColor : "#0077B5",  value : "" },
    {icon : "fa-brands fa-xing", name : "Xing", hints : "URL", isValid : true, placeholder:"www.xing.com/company/name", iconColor : "#026466",  value : "" },
    {icon : "fa-brands fa-flickr", name : "Flickr", hints : "URL", isValid : true, placeholder:"www.flickr.com/photos/flickr", iconColor : "#FF0084",  value : "" },
    {icon : "fa-brands fa-vimeo", name : "Vimeo", hints : "URL", isValid : true, placeholder:"www.vimeo.com/channels/mychannel", iconColor : "#1AB7EA",  value : "" },
    {icon : "fa-brands fa-dribbble", name : "Dribbble", hints : "URL", isValid : true, placeholder:"www.dribbble.com/company", iconColor : "#EA4C89",  value : "" },
    {icon : "fa-brands fa-line", name : "Line", hints : "ID", isValid : true, placeholder:"User ID", iconColor : "#00C300",  value : "" },
    {icon : "fa-brands fa-reddit", name : "Reddit", hints : "URL", isValid : true, placeholder:"www.reddit.com/username", iconColor : "#FF4500",  value : "" },
    {icon : "fa-brands fa-square-tumblr", name : "Tumblr", hints : "URL", isValid : true, placeholder:"https://username.tumblr.com/", iconColor : "#35465C",  value : "" },
    {icon : "fa-brands fa-github", name : "Github", hints : "URL", isValid : true, placeholder:"www.github.com/username", iconColor : "#191717",  value : "" },
    {icon : "fa-brands fa-skype", name : "Skype", hints : "SkypeID", isValid : true, placeholder:"SkypeID", iconColor : "#00AFF0",  value : "" },
    {icon : "fa-brands fa-spotify", name : "Spotify", hints : "URL", isValid : true, placeholder:"https://open.spotify.com/user/...", iconColor : "#1ED760",  value : "" },
    {icon : "fa-brands fa-soundcloud", name : "SoundCloud", hints : "URL", isValid : true, placeholder:"https://soundcloud.com/username", iconColor : "#F83F0E",  value : "" },
    {icon : "fa-brands fa-vk", name : "VKontakte", hints : "URL", isValid : true, placeholder:"www.vk.com/name", iconColor : "#45668E",  value : "" },
    {icon : "fa-brands fa-square-behance", name : "Behance", hints : "URL", isValid : true, placeholder:"https://be.net/yourusername", iconColor : "#0057FF",  value : "" },

    {icon : "assets/images/icons/icon-tripadvisior.png", name : "Tripadvisor", hints : "URL", isValid : true, placeholder:"www.tripadvisor.com/name", iconColor : "",  value : "" },
    {icon : "assets/images/icons/icon-doordash.png", name : "DoorDash", hints : "URL", isValid : true, placeholder:"www.doordash.com/store/...", iconColor : "",  value : "" },
    {icon : "assets/images/icons/icon-grubhub.png", name : "Grubhub", hints : "URL", isValid : true, placeholder:"www.grubhub.com/food/...", iconColor : "",  value : "" },
    {icon : "assets/images/icons/icon-opentable.png", name : "OpenTable", hints : "URL", isValid : true, placeholder:"www.opentable.com/r/....", iconColor : "",  value : "" },
    {icon : "assets/images/icons/icon-postmates.png", name : "Postmates", hints : "URL", isValid : true, placeholder:"www.ubereats.com/brand/...", iconColor : "",  value : "" },
    {icon : "assets/images/icons/icon-ubereats.png", name : "Uber Eats", hints : "URL", isValid : true, placeholder:"www.doordash.com/store/...", iconColor : "",  value : "" },
    {icon : "assets/images/icons/icon-applemusin.png", name : "Apple Music", hints : "URL", isValid : true, placeholder:"https://music.apple.com/artist/...", iconColor : "",  value : "" }
    
  ]


  selectedSM : any[] = []
  hasError = false
  userInfo = {   
    uuid :"",
    primaryColor: "",
    buttonColor: "",
    gradient : "",
    useGradient : false,
    image: "https://qrcgcustomers.s3-eu-west-1.amazonaws.com/account2/11_20.jpg",
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
    logoImage :"",
    selectedSM : []
  }
  
  imageChangedEvent: any = '';
  imageChangedEventLogo : any = ""
  croppedImage: any = '';
  imageModal = false
  mode = 'p'
  previewLogo = false

  emptyImage = "data:image/png;base64,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"

  logoModal = false
  qrModal = false
  qrCodeText = "Scan Me"
  qrCodeValue = '';
  qrFrameColor = "#FFF"
  qrLogo : any
  iscopyed = false
  
  loading = false
  accokownledged = false

  constructor(private  elementRef: ElementRef, private clipboard: Clipboard, private api: ApiService) { }

  ngOnInit(): void {
    this.userInfo.primaryColor = this.themes[0].primary
    this.userInfo.buttonColor = this.themes[0].button
    this.generateQRID()
  }


  saveVcard(){

    let userInfo = JSON.parse(JSON.stringify(this.userInfo))
    userInfo.socialMedia = this.userInfo.selectedSM
    // if(!this.croppedImage){
    //   userInfo.image = this.emptyImage
    // }

    this.loading = true
    this.api.saveVcardData(userInfo)
    .subscribe(data => {
      this.loading = false
      this.accokownledged = data["acknowledged"]
    });
  }
  fileChangeEventLogo(event: any): void {
    this.logoModal = true
    this.imageChangedEventLogo = event;
  }

  imageCroppedLogo(event: ImageCroppedEvent) {
    this.userInfo.logoImage = event.base64;
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
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.userInfo.image = event.base64;
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  next(){
    this.validDateData()
    if(!this.hasError){
      this.qrModal = true
    }
  }


  interChangeColor() {
    let tempBtn = this.userInfo.buttonColor
    let tempPrim = this.userInfo.primaryColor
    this.userInfo.primaryColor = tempBtn
    this.userInfo.buttonColor = tempPrim
  }

  pushSM(ele : any){
    this.userInfo.selectedSM.push(ele)
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

 generateQRID(){
  let firstPart : any = (Math.random() * 46656) | 0;
  let secondPart :any = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  
  this.userInfo.uuid = firstPart + secondPart;
  this.qrCodeValue = environment.domain + "/qr/"+ firstPart + secondPart;
 }

 copyText(textToCopy: string) {
  if(textToCopy){
    this.clipboard.copy(textToCopy);
    this.iscopyed = true
  }
}

validDateData(){
  this.hasError = false
  if(!this.userInfo.firstName && !this.userInfo.lastName && !this.userInfo.company){
    this.hasError = true
  }
}

removeSM(i){
  this.userInfo.selectedSM.splice(i, 1);
}

}


