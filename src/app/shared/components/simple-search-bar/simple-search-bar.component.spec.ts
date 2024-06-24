import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleSearchBarComponent } from './simple-search-bar.component';

describe('SimpleSearchBarComponent', () => {
    let component: SimpleSearchBarComponent;
    let fixture: ComponentFixture<SimpleSearchBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SimpleSearchBarComponent],
        })
            .compileComponents();

        fixture = TestBed.createComponent(SimpleSearchBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
