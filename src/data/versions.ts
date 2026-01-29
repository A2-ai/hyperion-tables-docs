export interface Version {
  tag: string;
  label: string;
  default?: boolean;
}

export const VERSIONS: Version[] = [
  {
    tag: "0.1.0",
    label: "v0.1.0",
    default: true,
  },
];

export const CURRENT_VERSION = "dev";
