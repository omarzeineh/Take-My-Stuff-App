import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotiPage } from './noti.page';

describe('NotiPage', () => {
  let component: NotiPage;
  let fixture: ComponentFixture<NotiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
