import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ReorderableObjectComponent } from './reorderable-object/reorderable-object.component';
import { ReorderingContainerComponent } from './reordering-container/reordering-container.component';
import { ReorderableObjectService } from './reorderable-object.service';

@NgModule({
  declarations: [
    AppComponent,
    ReorderableObjectComponent,
    ReorderingContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ReorderableObjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
