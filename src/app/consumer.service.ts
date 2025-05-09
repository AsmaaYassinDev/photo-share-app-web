import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Comment {
  username: string;
  text: string;
  createdAt: string;
}

export interface Photo {
  id: string;
  title: string;
  caption: string;
  location: string;
  mediaUrl: string;
  tags: string[];
  uploadDate: string;
  comments: Comment[];
  rating: number;
}
@Injectable({
  providedIn: 'root'
})
export class consumerService {
  private apiUrl = 'https://your-api-url.com';  // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Fetch all photos with comments and ratings
  getPhotosWithCommentsAndRatings(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.apiUrl}/photos`);
  }

  // Search photos based on query
  searchPhotos(query: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.apiUrl}/photos/search?query=${query}`);
  }

  // Add a new comment to an image
  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comments`, comment);
  }

  // Rate an image
  rateImage(imageId: string, rating: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/photos/${imageId}/rate`, { rating });
  }

}