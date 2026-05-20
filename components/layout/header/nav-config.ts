import { useTranslation } from "react-i18next";

export const useNavConfig = () => {
	const { t } = useTranslation();

	return [
		{
			id: 1,
			label: t("navigation.problem"),
			link: "#problem",
		},
		{
			id: 2,
			label: t("navigation.services"),
			link: "#services",
		},
		{
			id: 3,
			label: t("navigation.process"),
			link: "#process",
		},
		{
			id: 4,
			label: t("navigation.pricing"),
			link: "#pricing",
		},
		{
			id: 5,
			label: t("navigation.contact"),
			link: "#contact",
		},
	];
};
