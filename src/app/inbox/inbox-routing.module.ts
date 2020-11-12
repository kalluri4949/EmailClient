import { EmailShowComponent } from './email-show/email-show.component';
import { InboxHomeComponent } from './inbox-home/inbox-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaceholderComponent } from './placeholder/placeholder.component';

const routes: Routes = [
  {
    path: '',
    component: InboxHomeComponent,
    children: [
      {
        path: '',
        component: PlaceholderComponent,
      },
      {
        path: ':id',
        component: EmailShowComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}
