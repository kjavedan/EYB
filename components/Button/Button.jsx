import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export default function Button({
  text = "start_now",
  className,
  disabled,
  ...others
}) {
  const { t } = useTranslation();
  
  const message = t('contact.whatsapp.message', {
    defaultValue: "Hi Khaled! I'm interested in starting a project with you. Can you share more details?"
  });

  const phoneNumber = "971502597949";
  const encodedMessage = encodeURIComponent(message);

  const handleClick = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <motion.button
      whileHover={{ scale: !disabled && 1.1 }}
      onClick={handleClick}
      className={`btn__primary mx-auto mt-8 ${className} disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#4A5568] `}
      disabled={disabled}
      {...others}
    >
      {t(`buttons.${text}`)}
    </motion.button>
  );
}
