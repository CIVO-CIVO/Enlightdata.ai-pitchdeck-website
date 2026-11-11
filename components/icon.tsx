import {
  ArrowRight, Ban, BadgeCheck, Bot, Box, Building2, Camera, ClipboardList, Cog, Construction, Droplets, Eye, EyeOff,
  FileCheck, Fuel, Glasses, Globe, Hand, Handshake, HardHat, ListChecks, Lock, Mail, Mic, Percent, RefreshCw, Repeat,
  ScanEye, Search, ShieldCheck, Ship, Signature, TrainFront, TrendingUp, UserCheck, Video, Wrench, Zap,
  type LucideProps,
} from "lucide-react";

/** String-keyed icon registry so content files can name icons safely. */
export const icons = {
  arrow: ArrowRight, ban: Ban, badge: BadgeCheck, bot: Bot, box: Box, building: Building2, camera: Camera,
  clipboard: ClipboardList, cog: Cog, "list-checks": ListChecks, mic: Mic,
  construction: Construction, droplets: Droplets, eye: Eye, "eye-off": EyeOff, "file-check": FileCheck, fuel: Fuel,
  glasses: Glasses, globe: Globe, hand: Hand, handshake: Handshake, "hard-hat": HardHat, lock: Lock, mail: Mail,
  percent: Percent, refresh: RefreshCw, repeat: Repeat, "scan-eye": ScanEye, search: Search, "shield-check": ShieldCheck,
  ship: Ship, signature: Signature, train: TrainFront, trend: TrendingUp, "user-check": UserCheck, video: Video,
  wrench: Wrench, zap: Zap,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, strokeWidth = 1.5, ...rest }: { name: IconName } & LucideProps) {
  const C = icons[name] ?? Box;
  return <C aria-hidden strokeWidth={strokeWidth} {...rest} />;
}
