import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeComponent } from './components/resume/resume.component';
import { ResumeviewComponent } from './components/resumeview/resumeview.component';

const routes: Routes = [{ path: '', component: ResumeComponent },
                        { path: 'resume', component: ResumeComponent },
                        { path: 'resumeview', component: ResumeviewComponent },
                        {path: '**', component: ResumeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
