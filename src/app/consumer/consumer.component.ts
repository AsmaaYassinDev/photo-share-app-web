import { Component, OnInit } from '@angular/core';
import { consumerService } from '../consumer.service';
import { Photo } from '../consumer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css']
})
export class ConsumerComponent implements OnInit {
  photos: Photo[] = [];
  newComment: string = '';
  searchQuery: string = '';  // Store the search query

  constructor(private consumerService: consumerService, private router: Router) {}

  ngOnInit(): void {
    this.fetchPhotos();
  }

  fetchPhotos(): void {
    // Example: Static rating is set to 4 for all images
    this.consumerService.getPhotosWithCommentsAndRatings().subscribe((data: Photo[]) => {
    this.photos = data.map((photo, index) => {
      // Define a few example static comments
      const staticComments = [
        [
          { username: 'Alice', text: 'Amazing shot!', createdAt: new Date().toISOString() },
          { username: 'Bob', text: 'So vibrant!', createdAt: new Date().toISOString() }
        ],
        [
          { username: 'Charlie', text: 'Love this place!', createdAt: new Date().toISOString() },
          { username: 'Diana', text: 'Where is this?', createdAt: new Date().toISOString() }
        ],
        [
          { username: 'Eve', text: 'Dreamy scene.', createdAt: new Date().toISOString() },
          { username: 'Frank', text: 'Wish I was there!', createdAt: new Date().toISOString() }
        ],
        [
          { username: 'test1', text: 'nice', createdAt: new Date().toISOString() },
          { username: 'consumerUser', text: 'wonderful', createdAt: new Date().toISOString() }
        ],
      ];

      // Fallback to one of the static comment sets if we run out
      const comments = staticComments[index % staticComments.length];

      return {
        ...photo,
        rating: 4,  // Static or default rating
        comments: photo.comments && photo.comments.length > 0 ? photo.comments : comments
      };
    });
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

  // Method to log out and redirect to login page
  logout(): void {
    // Clear any session data here (e.g., token, user info)
    localStorage.removeItem('userToken'); // Example of clearing the token

    // Redirect to the login page
    this.router.navigate(['/login']);
  }

  // Simple rateImage method to update the rating (static data used for this example)
  rateImage(imageId: string, rating: number): void {
    // For static data, you don't need to update the server.
    // This simply changes the rating in the UI.
    const photo = this.photos.find(photo => photo.id === imageId);
    if (photo) {
      photo.rating = rating;  // Update the photo's rating with static value
    }
  }

  // Search photos based on query
  searchPhotos(): void {
  if (this.searchQuery.trim()) {
    // Filter the photos array based on the title, caption, or other fields that you want to search.
    this.photos = this.photos.filter(photo =>
      photo.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      photo.caption.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      photo.location.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  } else {
    // If the search query is empty, show all photos
    this.fetchPhotos(); // This assumes fetchPhotos sets the original list of photos
  }
}
}
