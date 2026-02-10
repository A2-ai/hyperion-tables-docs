export interface Version {
  tag: string;
  label: string;
  default?: boolean;
}

export const VERSIONS: Version[] = [
  {
    tag: "0.2.0",
    label: "v0.2.0",
    default: true,
  },
  {
    tag: "0.1.0",
    label: "v0.1.0",
  },
];

export const CURRENT_VERSION = "dev";
