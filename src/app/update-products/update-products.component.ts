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
  
  
  private productUrl:string = `http://localhost:8000/api/products`;
  productData: any[] = [];
  productId: string | null;

  
  constructor(private activeRoute: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.productId = null;
  }
 
  ngOnInit() {

    function formatDateToDmyHis(inputDate: String) : String | Date {
      const year = inputDate.substr(0, 4);
      const month = inputDate.substr(5, 2); // Assumes the time format is always HH:MM:SS
      const day = inputDate.substr(8, 2);
      const time = inputDate.substr(11, 5);
    
      const formattedString = `${day}.${month}.${year} ${time}`;

      return formattedString;
    }
    

    this.activeRoute.paramMap.subscribe(params => {
      this.productId = params.get('productId');
      this.productUrl += `/${this.productId}`
    });


    // fetch(this.productUrl).then((response) => response.json())
    // .then(([productsResponse, categoriesResponse]) => {
    //   this.productData = categoriesResponse.data;

    //   this.productData.forEach((product) => {

    //     if(product.updated_at !== null){
          
    //       const formattedDate = formatDateToDmyHis(product.updated_at);
          
    //       product.updated_at = formattedDate;
          
    //     }
    //     const category = this.productData.find((category) => category.id === product.category_id);
    //     if (category) {
    //       product.category = category.title;
    //     }
    //   });

    //   console.log(this.productData);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
  }

  // Method to send the POST request
  sendPostRequest() {

    console.log(this.description)
    // Define the data you want to send in the request body
    const postData = {
      title: this.title,
      article: this.article,
      description: this.description,
      brand: this.brand,
      image: null,
      category_id: 1,
      subcategory_id: 1,
      TNVED: null,
      color: null,
      extra_fileds: null,
      bardoc: null,
      sizes: null,
      docs: null,    
    };

    // Define the URL for the POST request
    

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
        console.error('POST request error:', error);
      }
    );
  }
}
