import { NotFoundComponent } from './not-found/not-found.component';
import { EmailResolverService } from './email-resolver.service';
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
        path: 'not-found',
        component: NotFoundComponent,
      },
      {
        path: ':id',
        resolve: {
          email: EmailResolverService,
        },
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
