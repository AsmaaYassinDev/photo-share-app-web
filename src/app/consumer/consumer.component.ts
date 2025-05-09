import { Component, OnInit } from '@angular/core';

import { consumerService } from '../consumer.service';
import{Photo} from '../consumer.service'

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css']
})
export class ConsumerComponent  implements OnInit {
 photos: Photo[] = []; // Explicitly define type as Photo[]
 newComment: string = '';
  stars: boolean[] = [false, false, false, false, false]; // Representing stars 1-5
searchQuery: string = '';  // Store the search query

  constructor(private consumerService: consumerService) {}

  ngOnInit(): void {
    this.fetchPhotos();
  }

  fetchPhotos(): void {
    this.consumerService.getPhotosWithCommentsAndRatings().subscribe((data: Photo[]) => { // Specify the type here
      this.photos = data.map(photo => ({
        ...photo,
        comments: photo.comments || [],
        rating: photo.rating || 0 // Add rating to photo object
      }));
    });
  }

  addComment(imageId: string): void {
    if (this.newComment.trim()) {
      const comment = {
        imageId: imageId,
        text: this.newComment.trim(),
        username: 'Consumer User',
        createdAt: new Date().toISOString()
      };

      this.consumerService.addComment(comment).subscribe((response) => {
        const photo = this.photos.find(photo => photo.id === imageId);
        if (photo) {
          photo.comments.push(response);
          this.newComment = ''; // Clear input after posting
        }
      });
    }
  }

  rateImage(imageId: string, rating: number): void {
    this.consumerService.rateImage(imageId, rating).subscribe((response) => {
      const photo = this.photos.find(photo => photo.id === imageId);
      if (photo) {
        photo.rating = rating; // Update the photo's rating
      }
    });
  }
   // Search photos based on query
  searchPhotos(): void {
    if (this.searchQuery.trim()) {
      this.consumerService.searchPhotos(this.searchQuery).subscribe((data: Photo[]) => {
        this.photos = data;
      });
    } else {
      this.fetchPhotos(); // Fetch all photos if the search query is empty
    }
  }
}