export type ModalName = "about" | "solutions" | "industries" | "boost";

export type IconName =
  | "activity"
  | "building"
  | "factory"
  | "globe"
  | "graduation"
  | "shield";

export interface NavigationItem {
  href: string;
  label: string;
}

export interface Feature {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: "network" | "shield" | "forensics";
}

export interface Service {
  id: string;
  code: string;
  title: string;
  description: string;
  tags: string[];
  icon: "globe" | "search" | "lock" | "database" | "graduation" | "shield";
}

export interface Industry {
  id: string;
  name: string;
  title: string;
  description: [string, string];
  icon: IconName;
}

export interface Expert {
  name: string;
  role: string;
  biography: string;
  image: string;
  code: string;
  imagePosition: "left" | "right";
  stats: Array<{ value: string; label: string }>;
}
