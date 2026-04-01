export interface Version {
  tag: string;
  label: string;
  default?: boolean;
}

export const VERSIONS: Version[] = [
  {
    tag: "0.4.0",
    label: "v0.4.0",
    default: true,
  },
  {
    tag: "0.3.0",
    label: "v0.3.0",
  },
  {
    tag: "0.2.1",
    label: "v0.2.1",
  },
  {
    tag: "0.2.0",
    label: "v0.2.0",
  },
  {
    tag: "0.1.0",
    label: "v0.1.0",
  },
];

export const CURRENT_VERSION = "dev";
