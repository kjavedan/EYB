import Footer from "@/components/layout/footer";
import Concerns from "@/components/sections/concerns";
import FAQs from "@/components/sections/faqs";
import Hero from "@/components/sections/hero";
import ProblemJourney from "@/components/sections/problem-journey";
import Service from "@/components/sections/service";
import WorkProcess from "@/components/sections/work-process";
import {
	FAQStructuredData,
	ServiceStructuredData,
} from "@/components/seo/structured-data";

export default function HomePage() {
	return (
		<>
			<ServiceStructuredData />
			<FAQStructuredData />

			<div className="container mx-auto">
				<main className="home-page px-4 max-w-screen-xl pt-16 mx-auto">
					<Hero />
					<ProblemJourney />
					<Concerns />
					<Service />
					<WorkProcess />
					<FAQs />
				</main>
				<Footer />
			</div>
		</>
	);
}
