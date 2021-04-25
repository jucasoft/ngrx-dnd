import {SpellStoreState} from '@root-store/spell-store';
import {SlideMenuStoreState} from '@root-store/slide-menu-store';

export interface State {
spell:SpellStoreState.State;
  slide_menu: SlideMenuStoreState.State;
}
