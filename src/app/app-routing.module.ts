import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SvgmapComponent } from './map/components/svgmap/svgmap.component';

const routes: Routes = [{
  path: '', component: SvgmapComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
