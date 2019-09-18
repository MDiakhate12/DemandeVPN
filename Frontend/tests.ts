<button mat-button>Button</button>
<button mat-raised-button>Raised</button>
<button mat-flat-button>Flat</button>
<button mat-stroked-button>Stroked</button>

<button mat-icon-button>Icon</button>
<button mat-fab>Fab</button>
<button mat-mini-fab>Fab</button>

<div>
  <button color="primary" mat-raised-button>Primary</button>
  <button color="accent" mat-raised-button>Accent</button>
  <button color="warn" mat-flat-button>Warn</button>
</div>

<mat-button-toggle >Toggle</mat-button-toggle>

<mat-menu #appMenu="matMenu">
  <button mat-menu-item [matMenuTriggerFor]="appSubMenu1">Choice 1</button>
  <button mat-menu-item>Choice 2</button>
  <button mat-menu-item>Choice 3</button>
  <button mat-menu-item>Choice 4</button>
</mat-menu>

<mat-menu #appSubMenu1="matMenu">
  <button mat-menu-item>Choice 5</button>
  <button mat-menu-item>Choice 6</button>
</mat-menu>
<button mat-raised-button [matMenuTriggerFor]="appMenu">Menu</button>

<mat-spinner></mat-spinner>

<mat-progress-spinner value="{{progress}}"></mat-progress-spinner>
