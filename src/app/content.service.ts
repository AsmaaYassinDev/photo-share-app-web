import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContentItem {
  id: string;
  userId: string;
  title: string;
  caption: string;
  location: string;
  tags: string[];
  uploadDate: string;
  mediaUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = 'https://localhost:44348/api/Content';

  constructor(private http: HttpClient) {}

  uploadContent(formData: FormData): Observable<ContentItem> {
    return this.http.post<ContentItem>(`${this.apiUrl}/upload`, formData);
  }

  getPhotosByUser(userId: string): Observable<ContentItem[]> {
    return this.http.get<ContentItem[]>(`${this.apiUrl}/user/${userId}`);
  }
}