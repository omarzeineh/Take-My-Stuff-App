import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReqPage } from './req.page';

describe('ReqPage', () => {
  let component: ReqPage;
  let fixture: ComponentFixture<ReqPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
