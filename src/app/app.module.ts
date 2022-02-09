import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogReleaseDialog, MonitorComponent } from './components/monitor/monitor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { MatDialogModule } from '@angular/material/dialog'; 
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';  

const config: SocketIoConfig = { url: 'http://localhost:3333', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    MonitorComponent,
    DialogReleaseDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    CdkAccordionModule,
    MatDialogModule,
    MatListModule,
    MatDividerModule
    
  ],
  providers: [],
  bootstrap: [AppComponent, ]
})
export class AppModule { }
