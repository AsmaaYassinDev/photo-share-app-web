import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Photo {
  id: string;
  userId: string | null;
  title: string;
  caption: string;
  location: string;
  tags: string[];
  uploadDate: string;
  mediaUrl: string;
  comments: Comment[];
  rating: number;
}

export interface Comment {
  username: string;
  text: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class consumerService {

  private apiUrl = 'https://photoapp-contentinteractionservice-fzh6b6e7hbf5eqex.northeurope-01.azurewebsites.net/api/Comment';  // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getPhotosWithCommentsAndRatings(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.apiUrl);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comments`, comment);  // Assuming there's a backend endpoint for posting comments
  }

  rateImage(imageId: string, rating: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/rate/${imageId}`, { rating });
  }

  searchPhotos(query: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.apiUrl}?search=${query}`);
  }
}
