import { useTranslation } from "react-i18next"

export const useNavConfig = () => {
  const { t } = useTranslation()

  return [
    {
      id: 1,
      label: t("navigation.services"),
      link: "#services",
    },
    {
      id: 2,
      label: t("navigation.pricing"),
      link: "#pricing",
    },
    {
      id: 3,
      label: t("navigation.about"),
      link: "#about",
    },
    {
      id: 4,
      label: t("navigation.faqs"),
      link: "#faqs",
    },
    {
      id: 5,
      label: t("navigation.contact"),
      link: "#contact",
    },
  ]
}
