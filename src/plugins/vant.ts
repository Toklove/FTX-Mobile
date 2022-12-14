/**
 *  @author TalkTao
 * @description  按需引入Vant
 */
import {
  Button,
  Cell,
  CellGroup,
  Col,
  Divider,
  DropdownItem,
  DropdownMenu,
  Field,
  Form,
  Icon,
  Image,
  Lazyload,
  List,
  Loading,
  NavBar,
  NoticeBar,
  Notify,
  Picker,
  Popup,
  Row,
  Search,
  Sticky,
  Swipe,
  SwipeItem,
  Tab,
  Tabbar,
  TabbarItem,
  Tabs,
  Toast
} from "vant";

const pluginsVant = [
  Button,
  Tabbar,
  TabbarItem,
  Sticky,
  NavBar,
  Icon,
  Search,
  DropdownMenu,
  DropdownItem,
  Image,
  Lazyload,
  Tabs,
  Tab,
  Toast,
  Field,
  Cell,
  CellGroup,
  Form,
  List,
  Swipe,
  SwipeItem,
  NoticeBar,
  Row,
  Col,
  Loading,
  Picker,
  Popup,
  Notify, Divider
];
export const vantPlugins = {
  install: function(vm) {
    pluginsVant.forEach((item: any) => {
      vm.component(item.name, item);
    });
  }
};
