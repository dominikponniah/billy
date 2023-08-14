import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAdditionalDataPage } from './add-additional-data.page';

describe('AddAdditionalDataPage', () => {
  let component: AddAdditionalDataPage;
  let fixture: ComponentFixture<AddAdditionalDataPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddAdditionalDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
