import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  title = 'API';
  private productsUrl: string = '/api/api/products';
  private categoriesUrl: string = '/api/api/category';

  productsData: any[] = [];
  categoryData: any[] = [];

  // productId: any;


  constructor(private router: Router, private http: HttpClient) {}

  redirectToProduct(productId: any) {
    // Redirect to the product page with the product ID in the route
    this.router.navigate(['/update-product', productId]);
  }

  deleteProduct(productId: any){
    this.http.delete(`api/api/products/${productId}`)
        .subscribe((response) => {
          console.log('Delete request success:', response);
          this.router.navigate(['/']);
        });
  }

  ngOnInit(): void {

    function formatDateToDmyHis(inputDate: String) : String | Date {
          const year = inputDate.substr(0, 4);
          const month = inputDate.substr(5, 2); // Assumes the time format is always HH:MM:SS
          const day = inputDate.substr(8, 2);
          const time = inputDate.substr(11, 5);
        
          const formattedString = `${day}.${month}.${year} ${time}`;

          return formattedString;
    }

    Promise.all([
      fetch(this.productsUrl).then((response) => response.json()),
      fetch(this.categoriesUrl).then((response) => response.json())
    ])
    .then(([productsResponse, categoriesResponse]) => {
      this.productsData = productsResponse.data;
      this.categoryData = categoriesResponse.data;

      this.productsData.forEach((product) => {

        if(product.updated_at !== null){
          
          const formattedDate = formatDateToDmyHis(product.updated_at);
          
          product.updated_at = formattedDate;
          
        }
        const category = this.categoryData.find((category) => category.id === product.category_id);
        if (category) {
          product.category = category.title;
        }
      });

      console.log(this.productsData);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
}
