import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import axios from 'axios';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {

  title: string | undefined; // required
  description: string | undefined;
  article: string | undefined; // required
  brand: string | undefined;
  imageLink: string | undefined;
  priceforbarcode: number | undefined;

  isExpended: boolean = true;
  barcode: any = false; 

  scroll() {

    this.isExpended = !this.isExpended;
  
  }
  private categoriesUrl: string = '/api/api/category';
  // private categoriesUrl: string = 'http://localhost:8000/api/category';
  categoryData: any[] = [];
  
  private subcategoriesUrl: string = '/api/api/subcategory';
  // private subcategoriesUrl: string = 'http://localhost:8000/api/subcategory';
  subcategoryData: any[] = [];
  
  
  selectedFile: File | undefined;

  onFileSelected(event: any): void {
    
    this.selectedFile = event.target.files[0];
    
    const fileNameElement = document.getElementById('filename');

    if (fileNameElement && this.selectedFile) {
      fileNameElement.innerHTML = this.selectedFile.name;
      // console.log(this.selectedFile.url);
    }
    
    console.log(this.selectedFile);

  }
  
  


  ngOnInit(): void {

    Promise.all([
      fetch(this.categoriesUrl).then((response) => response.json()),
      fetch(this.subcategoriesUrl).then((response) => response.json())
    ])
    .then(([categoriesResponse, subcategoriesResponse]) => {
      this.categoryData = categoriesResponse.data;
      this.subcategoryData = subcategoriesResponse.data;

      console.log(this.categoryData);
      console.log(this.subcategoryData);

      // this.subcategoriesUrl = `/api/api/subcategory/${this.categoryData.}`;

    })    
    .catch((error) => {
      console.error('Error:', error);
    });

  }


  showMegaMenu: boolean = false;
  showSubMenu: string | null = null;

  toggleSubMenu(submenu: string) {
    if (this.showSubMenu === submenu) {
      this.showSubMenu = submenu; // Open the clicked submenu
      this.showSubMenu = null; // Close the submenu if it's already open
      let subm = document.getElementById('submenu');
      subm?.querySelectorAll('li').forEach((element, index)=>{
          if(element.className == submenu){
            element.style.display = "block";
          }else{
            element.style.display = "none";
          }
        })
    } else {
      this.showSubMenu = submenu; // Open the clicked submenu
      let subm = document.getElementById('submenu');
      subm?.querySelectorAll('li').forEach((element, index)=>{
          if(element.className == submenu){
            element.style.display = "block";
          }else{
            element.style.display = "none";
          }
        })
      }
  }

  handleHoverClick(event: MouseEvent): void {
    // Trigger a click event when the mouse hovers over the element
    const element = event.target as HTMLElement;
    element.click();
  }

  toggleMegaMenu() {
    this.showMegaMenu = !this.showMegaMenu;
  }

  SetUpCategories(event: MouseEvent) {
    const element = event.target as HTMLElement;
    const categoryElement = document.getElementById('category');
  
    if (categoryElement) {
      let data_id = element?.getAttribute('id');
      let data_type = element?.getAttribute('type');
      
      if (data_id && data_type) {
        categoryElement.setAttribute('data-id', data_id);
        categoryElement.setAttribute('data-type', data_type);
        categoryElement.innerHTML = element.innerHTML;
      }
    }
  }
  
  removefromlist(idx: any) {
    if (idx >= 0 && idx < this.tags.length) {
      this.tags.splice(idx, 1);
    }
  }

  removefromColorlist(idx: any) {
    if (idx >= 0 && idx < this.tags.length) {
      this.tags.splice(idx, 1);
    }
  }
  
  
  tags: any[] = [];

  onEnterKey(inputElement: HTMLInputElement){
    let taglist = document.getElementById('TagList');
    let tagsInput = document.getElementById('tagsInput');
    if (tagsInput && taglist) {
      if(inputElement.value.length > 0){
        this.tags.push(inputElement.value);
        inputElement.value = "";
        tagsInput.style.padding = `0 0 0 ${ taglist.style.width }`;
      }
    }
    
    // console.log(inputElement.value);
  }

  colors: any[] = [];

  onEnterKeyColors(inputColorElement: HTMLInputElement){
    let ColorList = document.getElementById('ColorList');
    let colorInput = document.getElementById('colorInput');
    if (colorInput && ColorList) {
      if(inputColorElement.value.length > 0){
        this.colors.push(inputColorElement.value);
        inputColorElement.value = "";
        colorInput.style.padding = `0 0 0 ${ ColorList.style.width }`;
      }
    }
    
    // console.log(inputElement.value);
  }
  
  constructor(private http: HttpClient, private router: Router) {}
  

  generateBarcode() {
    // const apiUrl = 'http://localhost:8000/api/barcode-generate'; // Replace with the actual API URL
    const apiUrl = '/api/api/barcode-generate'; // Replace with the actual API URL

    axios.get(apiUrl)
    .then((response) => {

      const barcodeElement = document.getElementById('barcode');
      if (barcodeElement) {
        barcodeElement.innerHTML = response.data.barcode;
        this.barcode = response.data.barcode;
      }

    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error('GET request error:', error);
    });



  }

  sendPostRequest() {
    
    let validationerror = "";
    let subcategory = document.getElementById('category')?.getAttribute('data-id');
    let category = document.getElementById('category')?.getAttribute('data-type');
    let isnullany = 0;

    if(this.title==undefined || this.title == null || this.title==""){
      validationerror += "Наименование продукта не добавлено. Заполните поле! \n";
      isnullany += 1;
    }
  
  
    if(this.article==undefined || this.article == null || this.title==""){
      validationerror += "Артикул продавца не добавлено. Заполните поле ! \n";
      isnullany += 1;
    }

    if(subcategory==undefined || subcategory == null){
      validationerror += "Категория продукта не добавлена. Выберите категорию ! \n";
      isnullany += 1;
    } 

    console.log(this.title + " " + this.article + " " + subcategory);

    if(isnullany!=0){
      alert(validationerror);
    }else{
    
    const bardoc = [{ barcode: this.barcode, priceforbarcode: this.priceforbarcode }]

    let tags = this.tags.join(',');
    let colors = this.colors.join(',');
    let image: any;
    if (this.imageLink == undefined || this.imageLink == null) {
      image = this.selectedFile;
    } else {
      image = this.imageLink;
    }
    
    // Define the data you want to send in the request body
    const postData = {
      title: this.title,
      article: this.article,
      description: this.description,
      brand: this.brand,
      tags: tags,
      image: image,
      category_id: category,
      subcategory_id: subcategory,
      TNVED: null,
      color: colors,
      extra_fileds: null,
      bardoc: JSON.stringify(bardoc),
      sizes: null,
      docs: null,
      file: this.selectedFile,
    };
    
    // Define the URL for the POST request
    const postUrl = '/api/api/products';
    // const postUrl = 'http://localhost:8000/api/products';
    
    // Make the POST request using Axios
    axios.post(postUrl, postData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
      .then((response) => {
        console.log('POST request success:', response);
        this.router.navigate(['/']);
        this.selectedFile = undefined;
      })
      .catch((error) => {
        console.log('POST request error:', error);
      });
    
    }
  }
}