import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

import { MsalModule, MsalService } from '@azure/msal-angular';
import {
  PublicClientApplication,
  Configuration,
  LogLevel,
  InteractionType
} from '@azure/msal-browser';

// Azure AD B2C Configuration
const msalConfig: Configuration = {
  auth: {
    clientId: 'YOUR-CLIENT-ID',
    authority: 'https://YOUR-TENANT-NAME.b2clogin.com/YOUR-TENANT-ID',
    redirectUri: 'http://localhost:4200/',
    postLogoutRedirectUri: 'http://localhost:4200/',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
        }
      },
    },
  },
};

// MSAL Instance factory function
export function MSALInstanceFactory() {
  return new PublicClientApplication(msalConfig);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MsalModule.forRoot(
      new PublicClientApplication(msalConfig), // ✅ Pass real instance
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['user.read']
        }
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          ['https://graph.microsoft.com/v1.0/me', ['user.read']]
        ])
      }
    )
  ],
  providers: [
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
