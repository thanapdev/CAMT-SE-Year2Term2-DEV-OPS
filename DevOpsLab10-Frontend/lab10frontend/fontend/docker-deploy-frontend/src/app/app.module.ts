import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { TemplateRef } from '@angular/core/src/linker/template_ref';
import { NgIfContext } from '@angular/common/src/directives/ng_if';
import { registerLocaleData } from '@angular/common';
import localeTh from '@angular/common/locales/th';
import { AppRoutingModule } from './app-routing.module';
import { GradeService } from './service/grade.service';


registerLocaleData(localeTh, 'th');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    GradeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const cache = new InMemoryCache();
    apollo.create({
      link: httpLink.create({ uri: environment.graphqlUri }),
      cache: new InMemoryCache({
        addTypename: false
      })
    });
  }
}
