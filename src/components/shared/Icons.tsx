import React from "react";
import { Icon, IconElement, IconProps } from "@ui-kitten/components";

export const UserIcon = (props: IconProps): IconElement => (
  <Icon {...props} name={"people-outline"} />
);

export const LockIcon = (props: IconProps): IconElement => (
  <Icon {...props} name={"lock-outline"} />
);

export const EyeIcon = (props: IconProps): IconElement => (
  <Icon {...props} name={"eye-outline"} />
);

export const EyeOffIcon = (props: IconProps): IconElement => (
  <Icon {...props} name={"eye-off"} />
);

export const HomeIcon = (props: IconProps) => (
  <Icon {...props} name="home-outline" />
);

export const ConfigIcon = (props: IconProps) => (
  <Icon {...props} name="settings-outline" />
);

export const SearchIcon = (props: IconProps): IconElement => (
  <Icon {...props} name={"search"} />
);

export const ProductosIcon = (props: IconProps): IconElement => (
  <Icon {...props} name={"grid-outline"} />
);

export const TrashsIcon = (props: IconProps): IconElement => (
  <Icon {...props} name={"trash-outline"} />
);

export const SendIcon = (props: IconProps): IconElement => (
  <Icon {...props} name={"checkmark-circle-outline"} />
);
