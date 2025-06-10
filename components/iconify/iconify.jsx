import { Icon } from "@iconify/react";

// ----------------------------------------------------------------------

const Iconify = ({ icon, ...other }) => (
  <Icon className="w-10 h-10" icon={icon} {...other} />
);

export default Iconify;
