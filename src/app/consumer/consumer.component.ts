import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import { ConsumerService } from '../consumer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css']
})
export class ConsumerComponent {

  images: any[] = [];  // Array to hold all images
  comments: any[] = [];
  averageRating: number = 0;
  newComment: string = '';
  newRating: number = 1;  // Default rating
  selectedImageId: string = '';  // Track the selected image ID for comments/ratings

  constructor(private contentService: ConsumerService, private router: Router) { }

  ngOnInit(): void {
    this.getAllImages();  // Fetch all images on component init
  }

  // Fetch all images from the backend
  getAllImages(): void {
    this.contentService.getAllImages().subscribe((images) => {
      this.images = images;
    });
  }

  // Fetch comments for the current image
  getComments(imageId: string): void {
    this.selectedImageId = imageId;  // Set the selected image ID
    this.contentService.getComments(imageId).subscribe((comments) => {
      this.comments = comments;
    });
  }

  // Fetch the average rating for the current image
  getAverageRating(imageId: string): void {
    this.selectedImageId = imageId;  // Set the selected image ID
    this.contentService.getAverageRating(imageId).subscribe((averageRating) => {
      this.averageRating = averageRating;
    });
  }

  // Add a new comment for the selected image
  addComment(): void {
    const comment = {
      userId: 'sample-user-id',  // Assuming you have a way to get the real user ID
      imageId: this.selectedImageId,
      text: this.newComment,
      createdAt: new Date().toISOString(),
      imageTitle: 'Sample Image',  // You may replace this with actual data
      imageCaption: 'Sample Caption',  // You may replace this with actual data
      imageLocation: 'Sample Location',  // You may replace this with actual data
    };

    this.contentService.addComment(comment).subscribe(() => {
      this.getComments(this.selectedImageId);  // Refresh the comments list
      this.newComment = '';  // Clear the comment input
    });
  }

  // Add a new rating for the selected image
  addRating(): void {
    const rating = {
      userId: 'sample-user-id',  // Assuming you have a way to get the real user ID
      imageId: this.selectedImageId,
      ratingValue: this.newRating,
      createdAt: new Date().toISOString(),
      imageTitle: 'Sample Image',  // You may replace this with actual data
      imageCaption: 'Sample Caption',  // You may replace this with actual data
      imageLocation: 'Sample Location',  // You may replace this with actual data
    };

    this.contentService.addRating(rating).subscribe(() => {
      this.getAverageRating(this.selectedImageId);  // Refresh the average rating
    });
  }
}
