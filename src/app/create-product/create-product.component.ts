import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {

  title: string | undefined;
  description: string | undefined;
  article: string | undefined;
  brand: string | undefined;

  constructor(private http: HttpClient, private router: Router) {}

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
    const postUrl = 'http://localhost:8000/api/products';

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