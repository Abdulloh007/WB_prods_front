import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.scss']
})
export class UpdateProductsComponent {
  
  title: string | undefined;
  description: string | undefined;
  article: string | undefined;
  brand: string | undefined;
  
  
  productUrl = 'http://localhost:8000/api/products';
  productData: any[] = [];
  productId: string | null;

  // private categoriesUrl: string = '/api/api/category';
  private categoriesUrl: string = 'http://localhost:8000/api/category';
  categoryData: any[] = [];

  private subcategoriesUrl: string = 'http://localhost:8000/api/subcategory';
  subcategoryData: any[] = [];
  
  constructor(private activeRoute: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.productId = null;
  }

  ngOnInit(): void {


    this.activeRoute.paramMap.subscribe(params => {
      this.productId = params.get('productId');
      this.productUrl += `/${this.productId}`
    });

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


  // Method to send the POST request
  sendPostRequest() {

    let subcategory = document.getElementById('category')?.getAttribute('data-id');    
    let category = document.getElementById('category')?.getAttribute('data-type');    

    let tags = this.tags.join(',');

    // Define the data you want to send in the request body
    const postData = {
      title: this.title,
      article: this.article,
      description: this.description,
      brand: this.brand,
      tags: tags,
      image: null,
      category_id: category,
      subcategory_id: subcategory,
      TNVED: null,
      color: null,
      extra_fileds: null,
      bardoc: null,
      sizes: null,
      docs: null,    
    };

    // Define the URL for the POST request
    // const postUrl = '/api/api/products';
    const postUrl = `http://localhost:8000/api/products/${this.productId}`;

    // Define the headers for the request (optional)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Make the POST request
    this.http.post(postUrl, postData, { headers }).subscribe(
      (response) => {
        console.log('POST request success:', response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log('POST request error: ' + error.error);
      }
    );
  }
}