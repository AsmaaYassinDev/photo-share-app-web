import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment'; // Assuming you have an environment file to store base API URL

interface Comment {
  id: string;
  userId: string;
  imageId: string;
  text: string;
  createdAt: string;
  imageTitle: string;
  imageCaption: string;
  imageLocation: string;
}

interface Rating {
  id: string;
  userId: string;
  imageId: string;
  ratingValue: number;
  createdAt: string;
  imageTitle: string;
  imageCaption: string;
  imageLocation: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

private apiUrl = 'http://localhost:5000/api/image';  // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Fetch all images from the backend API
  getAllImages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Fetch comments for a specific image
  getComments(imageId: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:5000/api/comment/${imageId}`);
  }

  // Fetch the average rating for a specific image
  getAverageRating(imageId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/rating/${imageId}/average`);
  }

  // Add a new comment
  addComment(comment: any): Observable<any> {
    return this.http.post<any>('http://localhost:5000/api/comment', comment);
  }

  // Add a new rating
  addRating(rating: any): Observable<any> {
    return this.http.post<any>('http://localhost:5000/api/rating', rating);
  }
}
