import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  queryParam = input<string>('ref', { alias: 'appSafeLink' });

  private hostElement = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm(
      'You are about to leave this page. Do you want to continue?'
    );
    if (wantsToLeave) {
      const address = this.hostElement.nativeElement.href;
      this.hostElement.nativeElement.href =
        address + `?ref=${this.queryParam()}`; // Append a query parameter to indicate safe navigation
      return true; // Allow navigation
    } else {
      // Logic to prevent navigation can be added here
      event.preventDefault();
      return false; // Prevent navigation
    }
  }
}
