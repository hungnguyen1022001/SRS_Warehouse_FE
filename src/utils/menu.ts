import { PAGE, CONTRACT, HUMAN, TASK } from './constant';

export const MENU = [
   {
      title: 'Dashboard',
      path: '/',
      key: 'dashboard',
      icon: PAGE,
      active: false,
   },
   {
      title: 'Danh sách đơn hàng',
      path: '/order',
      key: 'order',
      icon: PAGE,
      active: false,
   },
];

export const getFilteredMenu = () => {
   const filterMenu = (menu: any[]) => {
      return menu.map(item => ({
         ...item,
         active: false,
         child: item.child ? filterMenu(item.child) : undefined,
      }));
   };

   return filterMenu(MENU);
};
