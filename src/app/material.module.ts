import { NgModule } from '@angular/core';
import {
 MatProgressBarModule, MatProgressSpinnerModule, MatButtonModule,
 MatIconModule, MatTabsModule, MatFormFieldModule, MatInputModule,
 MatCardModule, MatCheckboxModule, MatSelectModule, MatSidenavModule, MatToolbarModule,
 MatMenuModule, MatSnackBarModule, MatTooltipModule, MatStepperModule, MatDialogModule,
 MatTableModule, MatSortModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule,
 MatPaginatorModule, 
 MatExpansionModule, 
 MatGridListModule,
 MatRadioModule, 
 MatSliderModule,
 
}
 from '@angular/material';
const MaterialModules = [
 MatProgressBarModule,
 MatProgressSpinnerModule,
 MatButtonModule,
 MatTabsModule,
 MatIconModule,
 MatFormFieldModule,
 MatInputModule,
 MatCardModule,
 MatCheckboxModule,
 MatSelectModule,
 MatSidenavModule,
 MatToolbarModule,
 MatMenuModule,
 MatSnackBarModule,
 MatTooltipModule,
 MatStepperModule,
 MatTableModule,
 MatSortModule,
 MatDialogModule,
 MatSelectModule,
 MatDatepickerModule,
 MatNativeDateModule,
 MatAutocompleteModule,
 MatPaginatorModule,
 MatExpansionModule, 
 MatGridListModule,
 MatRadioModule, 
 MatSliderModule,
]
@NgModule({
 declarations: [],
 imports: [
   MaterialModules
 ],
 exports: [
   MaterialModules
 ]
})
export class MaterialModule { }