import * as LucideIcons from "lucide-react"

// Map string icon names to lucide-react components
export const iconMap: Record<string, React.ComponentType<any>> = {
  users: LucideIcons.Users,
  user: LucideIcons.User,
  home: LucideIcons.Home,
  settings: LucideIcons.Settings,
  menu: LucideIcons.Menu,
  search: LucideIcons.Search,
  bell: LucideIcons.Bell,
  heart: LucideIcons.Heart,
  star: LucideIcons.Star,
  trash: LucideIcons.Trash,
  edit: LucideIcons.Edit,
  plus: LucideIcons.Plus,
  minus: LucideIcons.Minus,
  check: LucideIcons.Check,
  dasboard: LucideIcons.LayoutDashboard,
  x: LucideIcons.X,
  arrow: LucideIcons.ArrowRight,
  chevron: LucideIcons.ChevronRight,
  // Add more icons as needed
}

// Function to get icon component by name
export function getIconComponent(iconName: string) {
  return iconMap[iconName.toLowerCase()] || null
}
