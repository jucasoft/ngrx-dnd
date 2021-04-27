import {SpellBoardStoreState} from '@root-store/spell-board-store';
import {SpellStoreState} from '@root-store/spell-store';
import {SlideMenuStoreState} from '@root-store/slide-menu-store';

export interface State {
spell_board:SpellBoardStoreState.State;
spell:SpellStoreState.State;
  slide_menu: SlideMenuStoreState.State;
}
