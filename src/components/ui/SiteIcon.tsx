import { Activity, Building, Database, Factory, Globe, GraduationCap, Lock, Search, Shield } from "lucide-react";
import type { IconName, Service } from "@/types";

const industryIcons = { activity: Activity, building: Building, factory: Factory, globe: Globe, graduation: GraduationCap, shield: Shield };
const serviceIcons = { globe: Globe, search: Search, lock: Lock, database: Database, graduation: GraduationCap, shield: Shield };

export function IndustryIcon({ name, className }: { name: IconName; className?: string }) {
  const Icon = industryIcons[name];
  return <Icon className={className} />;
}

export function ServiceIcon({ name, className }: { name: Service["icon"]; className?: string }) {
  const Icon = serviceIcons[name];
  return <Icon className={className} />;
}
