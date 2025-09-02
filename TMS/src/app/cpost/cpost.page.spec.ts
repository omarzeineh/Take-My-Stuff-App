import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CpostPage } from './cpost.page';

describe('CpostPage', () => {
  let component: CpostPage;
  let fixture: ComponentFixture<CpostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CpostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
