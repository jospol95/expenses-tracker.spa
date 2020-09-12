import {NgModule} from '@angular/core';
import {AutocompletePipeStartsWith} from './auto-complete-pipe';

@NgModule({
  declarations: [AutocompletePipeStartsWith],
  exports: [AutocompletePipeStartsWith]
})
export class CustomPipesModule {}
