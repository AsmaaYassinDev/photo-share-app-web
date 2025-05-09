import { Component, OnInit } from '@angular/core';
import { ContentItem, ContentService } from '../content.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'; // Import the Router
@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  photos: ContentItem[] = [];
  userId: string = 'acb4af91-361d-4571-bac4-efd265917527';

  constructor(
    private fb: FormBuilder,
    private contentService: ContentService,
    private router: Router
  ) {
    this.uploadForm = this.fb.group({
      title: [''],
      caption: [''],
      location: [''],
      tags: ['']
    });
  }

  ngOnInit(): void {
  
    if (this.userId) {
      this.loadUserPhotos();
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (!this.selectedFile || !this.userId) return;

    const formData = new FormData();
    formData.append('userId', 'acb4af91-361d-4571-bac4-efd265917527');  // Static userId for now
    formData.append('Title', this.uploadForm.get('title')?.value);
    formData.append('Caption', this.uploadForm.get('caption')?.value);
    formData.append('Location', this.uploadForm.get('location')?.value);
    formData.append('Tags', this.uploadForm.get('tags')?.value);
    if (this.selectedFile) {
      formData.append('MediaFile', this.selectedFile, this.selectedFile.name);
    }

    // Call the content service to upload the media
    this.contentService.uploadContent(formData).subscribe(
      response => {
        console.log('Upload successful:', response);
        this.loadUserPhotos(); // Refresh the list of photos
        this.uploadForm.reset();  // Reset the form after upload
      },
      error => {
        console.error('Error uploading content:', error);
      }
    );
  }
// Method to log out and redirect to login page
  logout(): void {
    // Clear any session data here (e.g., token, user info)
    localStorage.removeItem('userToken'); // Example of clearing the token

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
  loadUserPhotos(): void {
    this.contentService.getPhotosByUser(this.userId).subscribe({
      next: (data) => this.photos = data,
      error: (err) => console.error('Failed to load user photos:', err)
    });
  }
}