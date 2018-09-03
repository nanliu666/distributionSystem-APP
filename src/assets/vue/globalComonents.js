/**
 * vue公共组件js
 * @authors Your Name (you@example.org)
 * @date    2018-02-07 11:03:08
 * @version $Id$
 */
import Vue from 'vue';
// 引入vux组件
import {
  Actionsheet,
  Badge,
  Blur,
  ButtonTab, ButtonTabItem,
  Calendar,
  Card,
  CellBox,
  CellFormPreview,
  Cell,
  CheckIcon,
  Checker,CheckerItem,
  Checklist,
  Clocker,
  ColorPicker,
  Countdown,
  Countup,
  DatetimeRange,
  DatetimeView,
  Datetime,
  Divider,
  Drawer,
  Flexbox,
  Flow,
  FormPreview,
  Grid, GridItem,
  Group,
  Icon,
  InlineCalendar,
  InlineLoading,
  InlineXNumber,
  LoadMore,
  Marquee, MarqueeItem,
  Masker,
  Msg,
  Panel,
  Picker,
  Popover,
  PopupHeader,
  PopupPicker,
  PopupRadio,
  Popup,
  Previewer,
  Qrcode,
  Radio,
  Range,
  Rater,
  Scroller,
  Search,
  Selector,
  Spinner,
  Step,
  Sticky,
  Swipeout, SwipeoutItem, SwipeoutButton,
  Swiper,
  Tab, TabItem,
  Tabbar, TabbarItem,
  Timeline, TimelineItem,
  ViewBox,
  WechatEmotion,
  XAddress,
  XButton,
  XCircle,
  XDialog,
  XHeader,
  XImg,
  XInput,
  XNumber,
  XProgress,
  XSwitch,
  XTable,
  XTextarea,
} from 'vux';

Vue.component('Actionsheet',Actionsheet);
Vue.component('Badge',Badge);
Vue.component('Blur',Blur);
Vue.component('ButtonTab',ButtonTab);
Vue.component('ButtonTabItem',ButtonTabItem);
Vue.component('Calendar',Calendar);
Vue.component('Card',Card);
Vue.component('CellBox',CellBox);
Vue.component('CellFormPreview',CellFormPreview);
Vue.component('Cell',Cell);
Vue.component('CheckIcon',CheckIcon);
Vue.component('Checker',Checker);
Vue.component('CheckerItem',CheckerItem);
Vue.component('Checklist',Checklist);
Vue.component('Clocker',Clocker);
Vue.component('ColorPicker',ColorPicker);
Vue.component('Countdown',Countdown);
Vue.component('Countup',Countup);
Vue.component('DatetimeRange',DatetimeRange);
Vue.component('DatetimeView',DatetimeView);
Vue.component('Datetime',Datetime);
Vue.component('Divider',Divider);
Vue.component('Drawer',Drawer);
Vue.component('Flexbox',Flexbox);
Vue.component('Flow',Flow);
Vue.component('FormPreview',FormPreview);
Vue.component('Grid',Grid);
Vue.component('GridItem',GridItem);
Vue.component('Group',Group);
Vue.component('Icon',Icon);
Vue.component('InlineCalendar',InlineCalendar);
Vue.component('InlineLoading',InlineLoading);
Vue.component('InlineXNumber',InlineXNumber);
Vue.component('LoadMore',LoadMore);
Vue.component('Marquee',Marquee);
Vue.component('MarqueeItem',MarqueeItem);
Vue.component('Masker',Masker);
Vue.component('Msg',Msg);
Vue.component('Panel',Panel);
Vue.component('Picker',Picker);
Vue.component('Popover',Popover);
Vue.component('PopupHeader',PopupHeader);
Vue.component('PopupPicker',PopupPicker);
Vue.component('PopupRadio',PopupRadio);
Vue.component('Popup',Popup);
Vue.component('Previewer',Previewer);
Vue.component('Qrcode',Qrcode);
Vue.component('Radio',Radio);
Vue.component('Range',Range);
Vue.component('Rater',Rater);
Vue.component('Scroller',Scroller);
Vue.component('Search',Search);
Vue.component('Selector',Selector);
Vue.component('Spinner',Spinner);
Vue.component('Step',Step);
Vue.component('Sticky',Sticky);
Vue.component('Swipeout',Swipeout);
Vue.component('SwipeoutItem',SwipeoutItem);
Vue.component('SwipeoutButton',SwipeoutButton);
Vue.component('Swiper',Swiper);
Vue.component('Tab',Tab);
Vue.component('TabItem',TabItem);
Vue.component('Tabbar',Tabbar);
Vue.component('TabbarItem',TabbarItem);
Vue.component('Timeline',Timeline);
Vue.component('TimelineItem',TimelineItem);
Vue.component('ViewBox',ViewBox);
Vue.component('WechatEmotion',WechatEmotion);
Vue.component('XAddress',XAddress);
Vue.component('XButton',XButton);
Vue.component('XCircle',XCircle);
Vue.component('XDialog',XDialog);
Vue.component('XHeader',XHeader);
Vue.component('XImg',XImg);
Vue.component('XInput',XInput);
Vue.component('XNumber',XNumber);
Vue.component('XProgress',XProgress);
Vue.component('XSwitch',XSwitch);
Vue.component('XTable',XTable);
Vue.component('XTextarea',XTextarea);

// js调用
import  { AlertPlugin,ConfirmPlugin,LoadingPlugin,ToastPlugin,DatetimePlugin} from 'vux'
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(DatetimePlugin);
// 引入自定义全局组件
import roll from '@/components/common/roll.vue'
import mainBox from '@/components/common/mainBox.vue'
import bottomBtn from '@/components/common/bottomBtn.vue'
import noData from '@/components/common/noData.vue'
import pagination from '@/components/common/pagination.vue'
import dialog from '@/components/common/dialog.vue'
import tabs from '@/components/common/tabs.vue'
import number from '@/components/common/number.vue'
import commonFile from '@/components/common/commonFile.vue'
import cellBox from '@/components/common/cellBox.vue'
import cell from '@/components/common/cell.vue'
import select from '@/components/common/select.vue'
import search from '@/components/common/search.vue'
import remark from '@/components/common/remark.vue'
import chooseArea from '@/components/common/chooseArea.vue'
import gInput from '@/components/common/gInput.vue'


Vue.component('g-roll', roll);
Vue.component('g-mainBox', mainBox);
Vue.component('g-bottomBtn', bottomBtn);
Vue.component('g-noData', noData);
Vue.component('g-pagination', pagination);
Vue.component('g-dialog', dialog);
Vue.component('g-tabs', tabs);
Vue.component('g-number', number);
Vue.component('g-commonFile', commonFile);
Vue.component('g-cellBox', cellBox);
Vue.component('g-cell', cell);
Vue.component('g-select', select);
Vue.component('g-search', search);
Vue.component('g-remark', remark);
Vue.component('g-chooseArea', chooseArea);
Vue.component('g-input', gInput);



