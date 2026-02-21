export type SideBarProps = {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
  onCloseDrawer?: () => void;
  isMobile?: boolean;
};
export interface NavBarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}
export interface ReviewInterface{
  _id:string;
  rating:number;
  review:string;


}
