import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillingDetailsPage } from './billing-details.page';

describe('BillingDetailsPage', () => {
  let component: BillingDetailsPage;
  let fixture: ComponentFixture<BillingDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BillingDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
