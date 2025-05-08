import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { CreatorComponent } from './creator/creator.component';
import { ConsumerComponent } from './consumer/consumer.component'; // Import the UserService

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreatorComponent,
    ConsumerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [UserService],  // Provide the UserService
  bootstrap: [AppComponent],
})
export class AppModule {}
