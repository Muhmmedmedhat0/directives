import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
})
export class AuthDirective {
  userType = input.required<Permission>({
    alias: 'appAuth',
  });
  private authService = inject(AuthService);
  private elementRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        // User has the required permission, render the element
        this.viewContainer.createEmbeddedView(this.elementRef);
      } else {
        // User does not have the required permission, clear the view
        this.viewContainer.clear();
      }
    });
  }
}
