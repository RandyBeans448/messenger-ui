import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type IconType = 
    'add' | 'add_friends' | 'arrow_left' | 'arrow_right' | 'beta' | 'cancel' | 'category' | 'check' | 
    'check_circle' | 'close' | 'close_full' | 'copy' | 'credits' | 'delete' | 'design' | 'download' | 
    'downloadTechDrawing' | 'dropdown' | 'group' | 'help' | 'home' | 'info' | 'notification' | 'open_full' | 
    'paperWithMagnifyingGlass' | 'privateDb' | 'pro' | 'save' | 'saved' | 'savedDesigns' | 'search' | 
    'send' | 'share' | 'sign_out' | 'translate' | 'team_files' | 'tender' | 'toggle_menu' | 'upload' | 'warning'

@Component({
    selector: 'app-icon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
    @Input()
    public icon: IconType = 'check';

    @Input()
    public filled: boolean = false;

    @Input()
    public circleFill: boolean = false

    @Input()
    public orange: boolean = false

    @Input()
    public red: boolean = false

    @Input()
    public size: string = '1.5rem';

    public iconString: string = 'emoticon';

    private iconMap: { [key in IconType]: string } = {
        add: 'add',
        add_friends: 'group_add',
        arrow_left: 'arrow_forward',
        arrow_right: 'arrow_back',
        beta: 'compost',
        cancel: 'cancel',
        category: 'handyman',
        check: 'check',
        check_circle: 'check_circle',
        close: 'close',
        close_full: 'close_fullscreen',
        copy: 'content_copy',
        credits: 'database',
        delete: 'delete',
        design: 'deployed_code',
        download: 'download',
        downloadTechDrawing: 'architecture',
        dropdown: 'arrow_drop_down_circle',
        group: 'group',
        help: 'help',
        home: 'home',
        info: 'info',
        notification: 'notifications_active',
        open_full: 'open_in_full',
        paperWithMagnifyingGlass: 'quick_reference_all',
        privateDb: 'database',
        pro: 'diamond',
        save: 'bookmark_add',
        saved: 'bookmark_added',
        savedDesigns: 'description',
        search: 'search',
        send: 'send',
        share: 'ios_share',
        sign_out: 'logout',
        translate: 'translate',
        team_files: 'book_5',
        tender: 'gavel',
        toggle_menu: 'menu_open',
        upload: 'upload',
        warning: 'error',
    };
    

    ngOnInit() {
        this.iconString = this.getIcon(this.icon);
    }

    public getIcon(icon: IconType): string {
        const iconString: string = this.iconMap[icon];

        if (!iconString) {
            return 'emoticon';
        }

        return iconString;
    }
}
