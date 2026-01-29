export interface SideBarProps{
  isCollapsed:boolean;
  setIsCollapsed:React.Dispatch<React.SetStateAction<boolean>>;

}
export interface NavBarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}
