import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MappPage } from './mapp.page';

describe('MappPage', () => {
  let component: MappPage;
  let fixture: ComponentFixture<MappPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MappPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
